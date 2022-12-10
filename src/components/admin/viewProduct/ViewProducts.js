import React, {useEffect, useState} from 'react';
import styles from './ViewProducts.module.scss'
import {toast} from "react-toastify";
import {collection, query, onSnapshot, orderBy,} from "firebase/firestore";
import {db} from "../../../firebase/Config";
import {Link} from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa";

const ViewProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        setIsLoading(true)

        try {
            const productsRef = collection(db, "products");

            const q = query(productsRef, orderBy("category", "desc"));

            onSnapshot(q, (snapshot) => {
                // console.log(snapshot.docs)

                const allProducts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                console.log(allProducts)
                setProducts(allProducts)
                setIsLoading(false)

            });

        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }
    }

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
                            <th>Ціна</th>
                            <th>Керування</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product, index) => {
                            const {id, name, price, imageURL, category, brand} = product;
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
                                    <td>{price} грн</td>
                                    <td>
                                        <Link to='/admin/all-product'>
                                            <FaEdit color='green' size={20}/>
                                        </Link>
                                        <Link to='/admin/all-product'>
                                            &nbsp;
                                            <FaTrash color='red' size={20} className={styles.icons}/>
                                        </Link>
                                    </td>

                                </tr>


                            )
                        })}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default ViewProducts;