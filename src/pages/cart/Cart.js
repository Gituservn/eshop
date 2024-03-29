import React, {useEffect} from 'react';
import styles from './Cart.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
    CALC_SUBTOTAL, CALC_TOTAL_QUANTITY,
    CLEAR_CART,
    DECREASE_CART, INCREASE_CART, REMOVE_FROM_CART, SAVE_URL,
    selectCartItems,
    selectCartTotalAmount,
    selectCartTotalQuantity
} from "../../redux/slice/cartSlice";
import {Link, useNavigate,} from "react-router-dom";
import {FaTrashAlt} from "react-icons/fa";
import Card from "../../components/card/Card";
import {selectIsLoggedIn} from "../../redux/slice/authSlice";
import {motion} from "framer-motion";

const Cart = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotalAmount = useSelector(selectCartTotalAmount)
    const cartTotalQuantity = useSelector(selectCartTotalQuantity)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const increaseCart = (cart) => {
        dispatch(INCREASE_CART(cart))
    }

    const decreaseCart = (cart) => {
        dispatch(DECREASE_CART(cart))
    }

    const removeFromCart = (cart) => {
        dispatch(REMOVE_FROM_CART(cart))
    }

    const clearCart = () => {
        dispatch(CLEAR_CART())
    }

    useEffect(() => {
        dispatch(CALC_SUBTOTAL())
        dispatch(CALC_TOTAL_QUANTITY())
        dispatch(SAVE_URL(''))
    }, [dispatch, cartItems]);

    const url = window.location.href
    const checkout = () => {
        if (isLoggedIn) {
            navigate('/checkout-details')
        } else{
            dispatch(SAVE_URL(url))
            navigate('/login')
        }
    }

    return (
        <motion.section
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0,transition:{duration:0.1}}}>>
            <div className={`container ${styles.table}`}>
                <h2>Кошик</h2>
                {cartItems.length === 0 ? (
                    <>
                        <p>Ваш кошик пустий</p>
                        <br/>
                        <div>
                            <Link to='/#products'>&larr; продовжити покупки</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <table>
                            <thead>
                            <tr>
                                <th>
                                    №
                                </th>
                                <th>
                                    Назва товару
                                </th>
                                <th>
                                    Ціна
                                </th>
                                <th>
                                    Розмір
                                </th>
                                <th>
                                    Розмір подушки / наволочки
                                </th>
                                <th>
                                    кількість
                                </th>
                                <th>
                                    Загальна ціна
                                </th>
                                <th>
                                    Керування
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {cartItems.map((cart, index) => {

                                return (
                                    <tr key={cart.product.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <p>
                                                <b>{cart.product.name}</b>
                                            </p>
                                            <img src={cart.product.imageURL} alt={cart.product.name}
                                                 style={{width: '100px'}}/>
                                        </td>
                                        <td>{cart.currentPrice === null ? cart.currentPillowPrice : cart.currentPrice}</td>
                                        <td>{cart.currentSize}</td>
                                        <td>{cart.currentSizePillow}</td>
                                        <td>
                                            <div className={styles.count}>
                                                <button className='--btn' onClick={() => decreaseCart(cart)}>-</button>
                                                <p>
                                                    <b>{cart.cartQuantity}</b>
                                                </p>
                                                <button className='--btn' onClick={() => increaseCart(cart)}>+</button>
                                            </div>
                                        </td>
                                        <td>
                                            {((cart.currentPrice === null ? cart.currentPillowPrice : cart.currentPrice)
                                                * cart.cartQuantity).toFixed(2)}
                                        </td>
                                        <td className={styles.icons}>
                                            <FaTrashAlt size={19} color='red' onClick={() => removeFromCart(cart)}/>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>

                        </table>
                        <div className={styles.summary}>
                            <button className='--btn --btn-danger' onClick={clearCart}>
                                Очистити кошик
                            </button>
                            <div className={styles.checkout}>
                                <div>
                                    <Link to='#/product'>&larr; Продовжити покупки</Link>
                                </div>
                                <div>
                                    <br/>
                                    <Card cardClass={styles.card}>
                                        <p>{`Товарів в кошику: ${cartTotalQuantity}`}</p>
                                        <div className={styles.text}>
                                            <h4>Загальна вартість:</h4>
                                            <h3>{`₴${cartTotalAmount.toFixed(2)}`}</h3>
                                        </div>
                                        <p>Вартість доставки розраховується під час оформлення замовлення</p>
                                        <button className='--btn --btn-primary' onClick={checkout}>Замовити</button>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </motion.section>
    );
};

export default Cart;
