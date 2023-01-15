import React from 'react';
import styles from './Cart.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_TO_CART, DECREASE_CART, INCREASE_CART,
    selectCartItems,
    selectCartTotalAmount,
    selectCartTotalQuantity
} from "../../redux/slice/cartSlice";
import {Link} from "react-router-dom";
import {FaTrashAlt} from "react-icons/fa";
import Card from "../../components/card/Card";

const Cart = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotalAmount = useSelector(selectCartTotalAmount)
    const cartTotalQuantity = useSelector(selectCartTotalQuantity)

    const dispatch = useDispatch()

    const increaseCart = (cart) => {
        dispatch(INCREASE_CART(cart))
    }

    const decreaseCart = (cart) => {
        dispatch(DECREASE_CART(cart))
    }



    return (
        <section>
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
                                        <td>{cart.product.price}</td>
                                        <td>{cart.currentPrice}</td>
                                        <td>{cart.currentSize}</td>
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
                                            {(cart.product.price * cart.cartQuantity).toFixed(2)}
                                        </td>
                                        <td className={styles.icons}>
                                            <FaTrashAlt size={19} color='red'/>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>

                        </table>
                        <div className={styles.summary}>
                            <button className='--btn --btn-danger'>
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
                                        <button className='--btn --btn-primary'>Розрахувати</button>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Cart;
