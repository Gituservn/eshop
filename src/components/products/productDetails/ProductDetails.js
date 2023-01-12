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
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentSize, setCurrentSize] = useState(null);
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

    function handleChangePillow(event) {
        setCurrentSize(event.target.value);
    }

    function handleChangeSize(event) {
        setCurrentPrice(event.target.value);
    }

    const addToCart = (product) => {
        dispatch(
            ADD_TO_CART({product, currentPrice, currentSize})
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
                                        <select name="pillowSize" onChange={handleChangeSize} value={currentPrice}>
                                            <option
                                                value=""
                                                disabled
                                                selected
                                            >
                                                --Виберіть розмір--
                                            </option>
                                            {product.euro ? <option value={'Євро'}>Євро</option> : null}
                                            {product.two ? <option value={'Двоспальний'}>Двоспальний</option> : null}
                                            {product.one ? <option value={'Півтораспальний'}>Півтораспальний</option> : null}

                                        </select>
                                    </>) : null}

                                    {product.pillowSize40 || product.pillowSize50 || product.pillowSize70 || product.pillowSize40plus || product.pillowSize50plus ? (<>
                                        <label htmlFor="">Розмір наволочок</label>
                                        <select name="pillowSize" id="" onChange={handleChangePillow} value={currentSize} required>
                                            <option
                                                value=""
                                                disabled
                                                selected
                                            >
                                                --Виберіть розмір--
                                            </option>
                                            {product.pillowSize40 ?
                                                <option name={`40/60`} value={`40/60`}>40/60</option> : null}
                                            {product.pillowSize50 ?
                                                <option name={`50/70`} value={`50/70`}>50/70</option> : null}
                                            {product.pillowSize70 ?
                                                <option  name={`70/70`} value={`70/70`}>70/70</option> : null}
                                            {product.pillowSize40plus ?
                                                <option name={`40/60+(борт
                                                    5см)`} value={`40/60+(борт
                                                    5см)`}>40/60+(борт
                                                    5см)</option> : null}
                                            {product.pillowSize50plus ?
                                                <option name={`50/70+(борт
                                                    5см)`} value={`50/70+(борт
                                                    5см)`}>50/70+(борт
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