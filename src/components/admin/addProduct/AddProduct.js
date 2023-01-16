import React from 'react';
import {categories, brands, material, initialState} from "./consts";
import {useState,} from "react";
import {storage, db} from "../../../firebase/Config";
import {uploadBytesResumable, ref, getDownloadURL, deleteObject} from 'firebase/storage'
import {collection, addDoc, Timestamp, doc, setDoc,} from "firebase/firestore";
import styles from './AddProduct.module.scss';
import Card from "../../card/Card";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectProducts} from "../../../redux/slice/productSlice";
import Loader from "../../loader/Loader";

const AddProduct = () => {
    const {id} = useParams()
    const products = useSelector(selectProducts)
    const productEdit = products.find((item) => item.id === id)


    const [product, setProduct] = useState(() => {
        const newState = detectForm(
            id, {...initialState}, productEdit
        )
        return newState
    });

    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    //детектор форми для додавання або редагування продуксту
    function detectForm(id, addProduct, editProduct) {
        if (id === "ADD") {
            return addProduct
        }
        return editProduct
    }


    const handleInputChange = (e) => {
        const {name, value} = e.target
        if (e.target.checked) {
            // в селектах в лог виводить else блок - not checked, можна просто удалити лог і все гуд!
            setProduct({...product, [name]: value})
        } else {
            setProduct(product)
        }
        setProduct({...product, [name]: value})
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const storageRef = ref(storage, `willow/${Date.now()}${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {

            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress)
        }, (error) => {
            toast.error(error.message)
        }, () => {

            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setProduct({...product, imageURL: downloadURL})
                toast.success('Зображення успышно завантажено.')
            });
        });
    };


    const addProduct = (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const docRef = addDoc(collection(db, "products"), {
                name: product.name,
                imageURL: product.imageURL,
                priceOne: Number(product.priceOne),
                priceTwo: Number(product.priceTwo),
                priceEuro: Number(product.priceEuro),
                category: product.category,
                brand: product.brand,
                one: Boolean(product.sizeOne),
                two: Boolean(product.sizeTwo),
                euro: Boolean(product.sizeEuro),
                pillowSize40: Boolean(product.pillowSize40),
                pillowSize50: Boolean(product.pillowSize50),
                pillowSize70: Boolean(product.pillowSize70),
                pillowSize50plus: Boolean(product.pillowSize50plus),
                pillowSize40plus: Boolean(product.sizeTwo),
                material: product.material,
                desc: product.desc,
                createdAt: Timestamp.now().toDate()
            });
            setIsLoading(false)
            setProduct({...initialState})
            setUploadProgress(0)
            toast.success('Товар додано успішно')
            navigate('/admin/all-product')
        } catch (error) {
            toast.error(error.message)
            setIsLoading(false)
        }
    }

    // редагування товару
    const editProduct = (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (product.imageURL !== productEdit.imageURL) {
            const storageRef = ref(storage, productEdit.imageURL);
            deleteObject(storageRef);
        }

        try {
            setDoc(doc(db, "products", id), {
                name: product.name,
                imageURL: product.imageURL,
                priceOne: Number(product.priceOne),
                priceTwo: Number(product.priceTwo),
                priceEuro: Number(product.priceEuro),
                category: product.category,
                brand: product.brand,
                one: Boolean(product.sizeOne),
                two: Boolean(product.sizeTwo),
                euro: Boolean(product.sizeEuro),
                pillowSize40: Boolean(product.pillowSize40),
                pillowSize50: Boolean(product.pillowSize50),
                pillowSize70: Boolean(product.pillowSize70),
                pillowSize50plus: Boolean(product.pillowSize50plus),
                pillowSize40plus: Boolean(product.sizeTwo),
                material: product.material,
                desc: product.desc,
                createdAt: Timestamp.now().toDate()
            });
            setIsLoading(false)
            navigate('/admin/all-product')
            toast.success('Товар успішно змінено')
        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }
    }

    const linens = (product.category === 'Постільна білизна')
    const blankets = (product.category==='Ковдри')
    const topper = (product.category==='Наматрацники')
    const pillows = (product.category==='Подушки')

    return (<>
            {isLoading && <Loader/>}
            <div className={styles.product}>
                <h1>{detectForm(id, "Добавити новий товар", "Редагування товару")}</h1>
                <Card cardClass={styles.card}>
                    <form onSubmit={detectForm(id, addProduct, editProduct)}>
                        <label>Назва продукту</label>
                        <input
                            type="text"
                            placeholder="назва продукту"
                            name="name"
                            required
                            defaultValue={product.name}
                            onChange={(e) => handleInputChange(e)}
                        />

                        <label>Зображення продукту</label>
                        <Card cardClass={styles.group}>
                            {uploadProgress === 0 ? null : (<div className={styles.progress}>
                                <div className={styles["progress-bar"]}
                                     style={{width: `${Math.floor(uploadProgress)}%`}}>
                                    {uploadProgress < 100 ? `Завантаження ${Math.floor(uploadProgress)}%` : `Завантаження завершено ${Math.floor(uploadProgress)}%`}
                                </div>
                            </div>)}


                            <input
                                type="file"
                                placeholder="Зображення товару"
                                accept="image/*"
                                name="image"
                                onChange={(e) => handleImageChange(e)}
                            />
                            {product.imageURL === '' ? null : (<input
                                type="text"
                                // required
                                name="imageURL"
                                disabled
                                value={product.imageURL}
                            />)}

                        </Card>
                        <label>Ціна півтораспального комплекту</label>
                        <input
                            type="number"
                            placeholder="Ціна півтораспального комплекту"
                            name="priceOne"
                            required
                            value={product.priceOne}
                            onChange={(e) => handleInputChange(e)}
                        />
                        <label>Ціна двоспального комплекту</label>
                        <input
                            type="number"
                            placeholder="Ціна двоспального комплекту"
                            name="priceTwo"
                            required
                            value={product.priceTwo}
                            onChange={(e) => handleInputChange(e)}
                        />
                        <label>Ціна євро комплекту</label>
                        <input
                            type="number"
                            placeholder="Ціна євро комплекту"
                            name="priceEuro"
                            required
                            value={product.priceEuro}
                            onChange={(e) => handleInputChange(e)}
                        />

                        <label>Категорія</label>
                        <select
                            required
                            name="category"
                            value={product.category}
                            onChange={(e => handleInputChange(e))}>
                            <option
                                value=""
                                disabled>
                                --Виберіть категорію продукту--
                            </option>
                            {categories.map((cat) => {
                                return (<option
                                    key={cat.id}
                                    value={cat.name}
                                >
                                    {cat.name}
                                </option>);
                            })}
                        </select>

                        <label>Бренд</label>
                        <select
                            required
                            name="brand"
                            value={product.brand}
                            onChange={(e => handleInputChange(e))}>
                            <option
                                value=""
                                disabled>
                                --Виберіть бренд--
                            </option>
                            {brands.map((brand) => {
                                return (<option
                                    key={brand.id}
                                    value={brand.name}
                                >
                                    {brand.name}
                                </option>);
                            })}

                        </select>
                        {linens ? <>
                            <label>Матеріл</label>
                            <select
                                // required
                                name="material"
                                value={product.material}
                                onChange={(e => handleInputChange(e))}>
                                <option
                                    value=""
                                    disabled>
                                    --Виберіть матеріал--
                                </option>
                                {material.map((materials) => {
                                    return (<option
                                        key={materials.id}
                                        value={materials.name}
                                    >
                                        {materials.name}
                                    </option>);
                                })}
                            </select>
                        </> :null }



                        {linens || topper || blankets ? <div className={styles.select}>
                            <h2>Розміри</h2>

                            <label>Півтораспальний</label>
                            <input
                                type={'checkbox'}
                                name="sizeOne"
                                value={product.sizeOne}
                                onChange={(e => handleInputChange(e))}
                            />


                            <label>Двоспальний</label>
                            <input
                                type={"checkbox"}
                                name="sizeTwo"
                                value={product.sizeTwo}
                                onChange={(e => handleInputChange(e))}
                            />

                            <label>Євро</label>
                            <input
                                type={'checkbox'}
                                name="sizeEuro"
                                value={product.sizeEuro}
                                onChange={(e => handleInputChange(e))}/>
                        </div> :null }
                        {linens || pillows ? <div className={styles.select}>
                            <h2>Розміри подушок</h2>

                            <label>40/60</label>
                            <input
                                type={'checkbox'}
                                name="pillowSize40"
                                value={product.pillowSize40}
                                onChange={(e => handleInputChange(e))}/>


                            <label>50/70</label>
                            <input
                                // required
                                type={'checkbox'}
                                name="pillowSize50"
                                value={product.pillowSize50}
                                onChange={(e => handleInputChange(e))}/>


                            <label>70/70</label>
                            <input
                                type={'checkbox'}
                                // required
                                name="pillowSize70"
                                value={product.pillowSize70}
                                onChange={(e => handleInputChange(e))}/>


                            <label>40/60+5см(борт)</label>
                            <input
                                type={'checkbox'}
                                // required
                                name="pillowSize40plus"
                                value={product.pillowSize40plus}
                                onChange={(e => handleInputChange(e))}/>


                            <label>50/70+5см(борт)</label>
                            <input
                                // required
                                type={'checkbox'}
                                name="pillowSize50plus"
                                value={product.pillowSize50plus}
                                onChange={(e => handleInputChange(e))}/>
                        </div> : null }



                        <textarea
                            name="desc"
                            id=""
                            cols="30" rows="10"
                            value={product.desc}
                            onChange={(e => handleInputChange(e))}></textarea>

                        <button className='--btn --btn-primary'>
                            {detectForm(id, 'Зберегти', 'Змінити')}
                        </button>

                    </form>

                </Card>
            </div>
        </>

    );
};

export default AddProduct;