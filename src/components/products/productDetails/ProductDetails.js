import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../../firebase/Config";
import {toast} from "react-toastify";
import Spinner from '../../../assets/spinner.jpg';
import styles from './ProductDetails.module.scss'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import 'react-accessible-accordion/dist/fancy-example.css';
import {ADD_TO_CART} from "../../../redux/slice/cartSlice";
import {useDispatch} from "react-redux";


const ProductDetails = () => {
    const {id} = useParams()
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(1);
    const dispatch = useDispatch()
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


    const addToCart = (product) => {
        dispatch(
            ADD_TO_CART(product)
        )
    }
    return (
        <section>
            <div className={`container ${styles.product}`}>
                <h2>Про товар</h2>
                <div><Link to='/#products'>Назад до товарів</Link></div>
                {product === null ? (<img src={Spinner} alt="завантаження"/>) : (
                    <>
                        <div className={styles.details}>
                            <div className={styles.img}>
                                <Zoom>
                                    <img src={product.imageURL} width="300" alt={product.name}/>
                                </Zoom>
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
                                <p>
                                    <b>Тканина:</b>{product.material}
                                </p>

                                <form style={{display: 'flex'}}>
                                    {product.euro || product.one || product.two ? (<>
                                        <label htmlFor="">Розмір виробу</label>
                                        <select name="pillowSize" id="">

                                            {product.euro ? <option value={product.euro}>Євро</option> : null}
                                            {product.two ? <option value={product.two}>Двоспальний</option> : null}
                                            {product.one ? <option value={product.one}>Півтораспальний</option> : null}

                                        </select>
                                    </>) : null}

                                    {product.pillowSize40 || product.pillowSize50 || product.pillowSize70 || product.pillowSize40plus || product.pillowSize50plus ? (<>
                                        <label htmlFor="">Розмір наволочок</label>
                                        <select name="pillowSize" id="">
                                            {product.pillowSize40 ?
                                                <option value={product.pillowSize40}>40/60</option> : null}
                                            {product.pillowSize50 ?
                                                <option value={product.pillowSize50}>50/70</option> : null}
                                            {product.pillowSize70 ?
                                                <option value={product.pillowSize70}>70/70</option> : null}
                                            {product.pillowSize40plus ?
                                                <option value={product.pillowSize40plus}>40/60+(борт
                                                    5см)</option> : null}
                                            {product.pillowSize50plus ?
                                                <option value={product.pillowSize50plus}>50/70+(борт
                                                    5см)</option> : null}
                                        </select>
                                    </>) : null}

                                </form>

                                <div className={styles.count}>
                                    <button onClick={() => count < 1 ? null : setCount(count - 1)}
                                    className="--btn">-</button>
                                    <p>
                                        <b>
                                            {count}
                                        </b>
                                    </p>
                                    <button onClick={() => count > 9 ? null : setCount(count + 1)} className="--btn">+</button>
                                </div>
                                <button className='--btn - --btn-danger' onClick={()=>addToCart(product)}> добавити в корзину</button>

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