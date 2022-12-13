import React, {useEffect, useState} from 'react';
import styles from './ViewProducts.module.scss'
import {toast} from "react-toastify";
import { doc, deleteDoc} from "firebase/firestore";
import { ref, deleteObject} from "firebase/storage";
import {db, storage} from "../../../firebase/Config";
import {Link, } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa";
import Notiflix from "notiflix";
import {useDispatch, useSelector} from "react-redux";
import {selectProducts, STORE_PRODUCTS} from "../../../redux/slice/productSlice";
import useFetch from "../../../customHook/useFetch";



const ViewProducts = () => {
    const{data,isLoading} = useFetch("products")
    const products = useSelector(selectProducts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
                       STORE_PRODUCTS({
                            products: data
                        })
                    )
    }, [dispatch,data]);


    //Функція загрузки даних з firebase
    // const getProducts = () => {
    //     setIsLoading(true)
    //
    //     try {
    //         const productsRef = collection(db, "products");
    //         const q = query(productsRef, orderBy("category", "desc"));
    //         onSnapshot(q, (snapshot) => {
    //
    //             const allProducts = snapshot.docs.map((doc) => ({
    //                 id: doc.id,
    //                 ...doc.data()
    //             }))
    //             setProducts(allProducts)
    //             setIsLoading(false)
    //             dispatch(
    //                 STORE_PRODUCTS({
    //                     products: allProducts
    //                 })
    //             )
    //         });
    //
    //     } catch (error) {
    //         setIsLoading(false)
    //         toast.error(error.message)
    //     }
    // }

    //Діалогова вікно підтвердження видалення товару
    const confirmDelete = (id, imageURL) => {
        Notiflix.Confirm.show(
            'Видалення товару',
            'Ви справді бажаєте видалити товар?',
            'Так, видалити.',
            'Ні',
            function okCb() {
                deleteProduct(id, imageURL)
                alert('Товар видаленно');
            },
            function cancelCb() {
                alert('Ок, нехай буде');
            },
            {
                width: '320px',
                borderRadius: '2px',
                titleColor: 'orangered',
                okButtonBackground: 'orangered',
                cssAnimationStyle: "zoom"
                // etc...
            },
        );
    }

    //функція видалення товару
    const deleteProduct = async (id, imageURL) => {
        try {
            await deleteDoc(doc(db, "products", id));

            const storageRef = ref(storage, imageURL);
            await deleteObject(storageRef);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>

        <div className={styles.table}>
            {products.length === 0 ? (
                <p>Товар не знайдено</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Зображення</th>
                        <th>Назва</th>
                        <th>бренд</th>
                        <th>категорія</th>
                        <th>Розміри</th>
                        <th>Розміри подушок</th>
                        <th>Ціна</th>
                        <th>Керування</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => {
                        const {
                            id,
                            name,
                            price,
                            imageURL,
                            category,
                            brand,
                            one,
                            two,
                            euro,
                            pillowSize40,
                            pillowSize50,
                            pillowSize70,
                            pillowSize50plus,
                            pillowSize40plus,
                        } = product;
                        return (

                            <tr key={id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <img src={imageURL} alt={name} style={{width: '100px'}}/>
                                </td>
                                <td>
                                    {name}
                                </td>
                                <td>{brand}</td>
                                <td>{category}</td>
                                <td>{euro ? <div>евро</div> : null}
                                    {two ? <div>двоспальне</div> : null}
                                    {one ?
                                    <div>півтораспальний</div> : null}
                                </td>
                                <td>{pillowSize40 ? <div>40/60</div> : null}{pillowSize50 ?
                                    <div>50/70</div> : null}{pillowSize70 ? <div>70/70</div> : null}{pillowSize40plus ?
                                    <div>40/60+(борт 5 см)</div> : null}{pillowSize50plus ?
                                    <div>50/70+(борт 5 см)</div> : null} </td>
                                <td>{price} грн</td>
                                <td className={styles.icons}>
                                    <Link to={`/admin/add-product/${id}`}>
                                        <FaEdit color='green' size={20}/>
                                    </Link>
                                    <Link to='/admin/all-product'>
                                        &nbsp;
                                        <FaTrash color='red' size={20} className={styles.icons}
                                                 onClick={() => confirmDelete(id, imageURL)}/>
                                    </Link>
                                </td>

                            </tr>


                        )
                    })}
        </tbody>
        </table>
    )
}
</div>
</>
)
    ;
};

export default ViewProducts;