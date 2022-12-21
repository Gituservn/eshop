import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../../firebase/Config";
import {toast} from "react-toastify";
import Spinner from '../../../assets/spinner.jpg';
import styles from './ProductDetails.module.scss'
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import 'react-accessible-accordion/dist/fancy-example.css';


const ProductDetails = () => {
    const {id} = useParams()
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(1);
    useEffect(() => {
        getProduct()
    }, [])

    //https://firebase.google.com/docs/firestore/query-data/get-data
    const getProduct = async () => {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const obj = {
                id: id,
                ...docSnap.data()
            }

            setProduct(obj)
        } else {
            toast.error('Товар не знайдено')
        }
    }

    console.log(product)

    return (
        <section>
            <div className={`container ${styles.product}`}>
                <h2>Про товар</h2>
                <div><Link to='#/products'>Назад до товарів</Link></div>
                {product === null ? (<img src={Spinner} alt="завантаження"/>) : (
                    <>
                        <div className={styles.details}>
                            <div className={styles.img}>
                                <img src={product.imageURL} alt={product.name}/>
                            </div>
                            <div className={styles.content}>
                                <h3>{product.name}</h3>
                                <p className={styles.price}>{`₴${product.price}`}</p>

                                <p>
                                    <b>SKU:</b>{product.id}
                                </p>
                                <p>
                                    <b>Виробник:</b>{product.brand}
                                </p>
                                <form style={{display:'flex'}}>
                                    {product.pillowSize40 ?
                                        <>
                                            <label htmlFor="">40/70</label>
                                            <input type="radio"/>
                                        </> : null}
                                    {product.pillowSize50 ?
                                        <>
                                            <label htmlFor="">50/70</label>
                                            <input type="radio"/>
                                        </> : null}

                                    {product.pillowSize70 ?
                                        <>
                                            <label htmlFor="">70/70</label>
                                            <input type="radio"/>
                                        </>
                                        : null}
                                    {product.pillowSize40plus ?
                                        <>
                                            <label htmlFor="">50/70 +(борт)5см</label>
                                            <input type="radio"/>
                                        </> : null}

                                    {product.pillowSize50plus ?
                                        <>
                                            <label htmlFor="">40/60 +(борт)5см</label>
                                            <input type="radio"/>
                                        </> : null}
                                </form>

                                <div className={styles.count}>
                                    <button onClick={() => setCount(count - 1)} className="--btn">-</button>
                                    <p>
                                        <b>
                                            {count}
                                        </b>
                                    </p>
                                    <button onClick={() => setCount(count + 1)} className="--btn">+</button>
                                </div>

                                <Accordion allowZeroExpanded>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton style={{fontSize: '20px'}}>
                                                Детальніше
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <p> {product.desc}</p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                </Accordion>

                            </div>
                        </div>
                    </>
                )}
            </div>

        </section>
    );
}

export default ProductDetails;