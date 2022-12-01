import React from 'react';
import {useState,} from "react";
import {storage,} from "../../../firebase/Config";
import {uploadBytesResumable, ref, getDownloadURL} from 'firebase/storage'

import styles from './AddProduct.module.scss';
import Card from "../../card/Card";
import {toast} from "react-toastify";


const categories = [
    {id: 1, name: 'Постільна білизна'},
    {id: 2, name: 'Подушки'},
    {id: 3, name: 'Ковдри'},
    {id: 4, name: 'Наматрацники'}
];
const brands = [
    {id: 1, name: "Комфорт-текстиль"},
    {id: 2, name: "Idea"},
    {id: 3, name: 'Billerbeck'}
];

const material = [
    {id: 1, name: "Сатин однотонний премім"},
    {id: 2, name: "Сатин однотонний люкс"},
    {id: 3, name: 'Страйп сатин преміум'},
    {id: 4, name: 'Страйп сатин люкс'},
    {id: 5, name: 'Страйп сатин еліт'},
];


const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        imageURL: '',
        price: 0,
        category: '',
        brand: '',
        size: [
            {id: 1, name: 'Євро',},
            {id: 2, name: 'Півтораспальний',},
            {id: 3, name: 'Двоспальний',},
        ],
        material: '',
        pillow: [
            {id: 1, name: '50/70',},
            {id: 2, name: '70/70',},
            {id: 3, name: '40/60',},
        ],
        desc: '',

    });


    const [uploadProgress, setUploadProgress] = useState(0);


    const handleInputChange = (e) => {
        const {name, value} = e.target
        setProduct({...product, [name]: value})
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        console.log(file)

        const storageRef = ref(storage, `willow/${Date.now()}${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);


        uploadTask.on('state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress)
            },
            (error) => {
                toast.error(error.message)
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProduct({...product, imageURL: downloadURL})
                    toast.success('Зображення успышно завантажено.')
                });
            }
        );
    };


    const addProduct = (e) => {
        e.preventDefault()
        console.log(product)
    }
    return (
        <div className={styles.product}>
            <h1>Добавити новий товар</h1>
            <Card cardClass={styles.card}>
                <form onSubmit={addProduct}>
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
                        {uploadProgress === 0 ? null : (
                            <div className={styles.progress}>
                                <div className={styles["progress-bar"]}
                                     style={{width: `${uploadProgress}%`}}>
                                    {uploadProgress < 100 ? `Завантаження ${uploadProgress}%` : `Завантаження завершено ${uploadProgress}%`}
                                </div>
                            </div>
                        )}


                        <input
                            type="file"
                            placeholder="Зображення товару"
                            accept="image/*"
                            name="image"
                            onChange={(e) => handleImageChange(e)}
                        />
                        {product.imageURL === '' ? null : (
                            <input type="text"
                                // required
                                   name="imageURL"
                                   disabled
                                   value={product.imageURL}
                            />)
                        }

                    </Card>
                    <label>Ціна продукту</label>
                    <input
                        type="number"
                        placeholder="Ціна продукту"
                        name="price"
                        required
                        value={product.price}
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
                            return (
                                <option
                                    key={cat.id}
                                    value={cat.name}
                                >
                                    {cat.name}
                                </option>
                            );
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
                            return (
                                <option
                                    key={brand.id}
                                    value={brand.name}
                                >
                                    {brand.name}
                                </option>
                            );
                        })}

                    </select>


                    <label>Матеріл</label>
                    <select
                        required
                        name="material"
                        value={product.material}
                        onChange={(e => handleInputChange(e))}>
                        <option
                            value=""
                            disabled>
                            --Виберіть матеріал--
                        </option>
                        {material.map((materials) => {
                            return (
                                <option
                                    key={materials.id}
                                    value={materials.name}
                                >
                                    {materials.name}
                                </option>
                            );
                        })}

                    </select>
                    <textarea
                        name="desc"
                        id=""
                        cols="30" rows="10"
                        value={product.desc}
                    onChange={(e=>handleInputChange(e))}></textarea>

                    <button className='--btn --btn-primary'>
                        зберегти
                    </button>

                </form>

            </Card>
        </div>
    );
};

export default AddProduct;