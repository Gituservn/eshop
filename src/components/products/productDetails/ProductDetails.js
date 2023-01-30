import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../../firebase/Config";
import {toast} from "react-toastify";
import Spinner from '../../../assets/spinner.jpg';
import styles from './ProductDetails.module.scss'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import uuid from 'react-uuid';

import NovaPoshta from 'novaposhta';

import {
    Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel
} from "react-accessible-accordion";
import 'react-accessible-accordion/dist/fancy-example.css';
import {
    ADD_TO_CART, CALC_TOTAL_QUANTITY, DECREASE_CART, INCREASE_CART, selectCartItems
} from "../../../redux/slice/cartSlice";
import {useDispatch, useSelector} from "react-redux";


const __ApiKey = '421852b3235e42445b33038dadf21808';

const ProductDetails = () => {
    const {id} = useParams()
    const [product, setProduct] = useState(null);
    const [currentSize, setCurrentSize] = useState(null);
    const [currentSizePillow, setCurrentSizePillow] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentPillowPrice, setCurrentPillowPrice] = useState(null);
    const dispatch = useDispatch()
    const cartItem = useSelector(selectCartItems)
    const cart = cartItem.find((cart) => cart.product.id === id)


    const isCartAdded = cartItem.findIndex((cart) => {
        return cart.product.id === id
    })


    const getProduct = async () => {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const obj = {
                id: id, ...docSnap.data()
            }
            setProduct(obj)
        } else {
            toast.error('Товар не знайдено')
        }
    }


    useEffect(() => {
        getProduct();
    }, [])


//https://firebase.google.com/docs/firestore/query-data/get-data


    function handleChangePillow(event) {
        setCurrentSizePillow(event.target.value)
        if (event.target.value === '40/60') {
            setCurrentPillowPrice(product.pillowPrice40)
        } else if (event.target.value === '50/70') {
            setCurrentPillowPrice(product.pillowPrice50)
        } else if (event.target.value === '60/60') {
            setCurrentPillowPrice(product.pillowPrice60)
        } else if (event.target.value === '70/70') {
            setCurrentPillowPrice(product.pillowPrice70)
        }

    }

    function handleChangeSize(event) {
        setCurrentSize(event.target.value);

        if (event.target.value === 'Євро') {
            setCurrentPrice(product.priceEuro)
        } else if (event.target.value === 'Двоспальний') {
            setCurrentPrice(product.priceTwo)
        } else if (event.target.value === 'Півтораспальний') {
            setCurrentPrice(product.priceOne)
        }
    }

    const addToCart = (product) => {
        dispatch(ADD_TO_CART({
            product, currentSize, currentPrice: currentPrice, currentPillowPrice, currentSizePillow, id: uuid()
        }))
        dispatch(CALC_TOTAL_QUANTITY())
    }

    const increaseCart = (cart) => {
        dispatch(INCREASE_CART(cart))
        dispatch(CALC_TOTAL_QUANTITY)
    }
    const decreaseCart = (cart) => {
        dispatch(DECREASE_CART(cart))
        dispatch(CALC_TOTAL_QUANTITY)
    }


    return (<section>
        <div className={`container ${styles.product}`}>
            <h2>Про товар</h2>
            <div><Link to='/#products'>Назад до товарів</Link></div>
            {product === null ? (<img src={Spinner} alt="завантаження"/>) : (<>
                <div className={styles.details}>
                    <div className={styles.img}>
                        <Zoom>
                            <img src={product.imageURL} width="300" alt={product.name}/>
                        </Zoom>
                    </div>
                    <div className={styles.content}>
                        <h3>{product.name}</h3>
                        <p className={styles.price}>{currentPrice === null ? currentPillowPrice : currentPrice}</p>

                        <p>
                            <b>Категорія:</b>{product.category}
                        </p>
                        <p>
                            <b>Виробник:</b>{product.brand}
                        </p>
                        <p>
                            <b>Тканина:</b>{product.material}
                        </p>
                        {product.category === "Постільна білизна" ? <> <p>

                            <b>Ціна півтораспального комплекта:</b> <b>{product.priceOne}</b>
                        </p>
                            <p>
                                <b>Ціна двоспального комплекта:</b> <b>{product.priceTwo}</b>
                            </p>
                            <p>
                                <b>Ціна євро комплекта:</b> <b>{product.priceEuro}</b>
                            </p></> : null}


                        <form style={{display: 'flex'}}>
                            {product.euro || product.one || product.two ? (<>
                                <label htmlFor="">Розмір виробу</label>
                                <select name="pillowSize" onChange={handleChangeSize} value={currentSize}>
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
                                <select name="pillowSize" id="" onChange={handleChangePillow}
                                        value={currentSizePillow} required>
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
                                    {product.pillowSize60 ?
                                        <option name={`60/60`} value={`60/60`}>60/60</option> : null}
                                    {product.pillowSize70 ?
                                        <option name={`70/70`} value={`70/70`}>70/70</option> : null}
                                    {product.pillowSize40plus ?
                                        <option name={`40/60+(борт 5см)`} value={`40/60+(борт 5см)`}>40/60+(борт
                                            5см)</option> : null}
                                    {product.pillowSize50plus ?
                                        <option name={`50/70+(борт 5см)`} value={`50/70+(борт 5см)`}>50/70+(борт
                                            5см)</option> : null}
                                </select>
                            </>) : null}

                        </form>

                        <div className={styles.count}>
                            {isCartAdded < 0 ? null : (<>
                                <button onClick={() => decreaseCart(cart)}
                                        className="--btn">-
                                </button>
                                <p>
                                    <b>
                                        {cart?.cartQuantity}
                                    </b>
                                </p>
                                <button onClick={() => increaseCart(cart)} className="--btn">+</button>
                            </>)}

                        </div>

                        <button className='--btn - --btn-danger' onClick={() => addToCart(product)}> добавити в
                            корзину
                        </button>

                        <Accordion allowZeroExpanded>
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton style={{fontSize: '20px'}}>
                                        Детальніше4
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p> {product.desc}</p>
                                </AccordionItemPanel>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </>)}
        </div>

    </section>);
}

export default ProductDetails;