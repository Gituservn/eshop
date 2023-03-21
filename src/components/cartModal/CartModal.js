import React, {useEffect} from 'react';
import './cartModal.scss';
import {motion} from "framer-motion";
import ShowOnLogin, {ShowOnLogout} from "../hiddenLink/hiddenLink";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    CALC_SUBTOTAL,
    CALC_TOTAL_QUANTITY,
    CLEAR_CART,
    DECREASE_CART,
    INCREASE_CART,
    REMOVE_FROM_CART,
    SAVE_URL,
    selectCartItems,
    selectCartTotalAmount,
    selectCartTotalQuantity
} from "../../redux/slice/cartSlice";
import {selectIsLoggedIn} from "../../redux/slice/authSlice";
import {FaTrashAlt} from "react-icons/fa";

const CartModal = ({setOpenCartModal, openCartModal}) => {

    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const increaseCart = (cart) => {
        dispatch(INCREASE_CART(cart));
    };

    const decreaseCart = (cart) => {
        dispatch(DECREASE_CART(cart));
    };

    const removeFromCart = (cart) => {
        dispatch(REMOVE_FROM_CART(cart));
    };

    const clearCart = () => {
        dispatch(CLEAR_CART());
    };

    useEffect(() => {
        dispatch(CALC_SUBTOTAL());
        dispatch(CALC_TOTAL_QUANTITY());
        dispatch(SAVE_URL(''));
    }, [dispatch, cartItems]);

    const url = window.location.href;
    const checkout = () => {
        if (isLoggedIn) {
            navigate('/checkout-details');
            setOpenCartModal(false)
        } else {
            dispatch(SAVE_URL(url));
            navigate('/login');
        }
    };


    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    };

    const items = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="modalCart">
            <div className="box"></div>
            <div className="modalCart__header">
                <h2 className="modalCart__header_title">Кошик</h2>
                <span
                    className="modalCart__header_quantity">{cartTotalQuantity}шт.</span>
            </div>
            <div className="modalCart_main" onClick={stopPropagation}>
                <ShowOnLogin>
                    <div className="modalCart_main_cart">

                        {cartItems.length === 0 ? (
                            <>
                                <p>Ваш кошик пустий</p>

                            </>
                        ) : (<>
                            {cartItems.map((item, index) => {

                                return (

                                    <motion.div
                                        key={index + 1}
                                        className="modalCart__item"
                                        variants={items}
                                    >
                                        <div
                                            className="modalCart__item_wrapper">
                                            <div
                                                className="modalCart__item_wrapper_img">
                                                <img src={item.product.imageURL}
                                                     alt={item.product.name}/>
                                            </div>

                                            <div
                                                className="modalCart__item_wrapper_desc">
                                                <h3 className="title">{item.product.name},{item.currentSize},{item.currentSizePillow}</h3>
                                                <p>Ціна за одиницю: <b>{item.currentPrice === null ? item.currentPillowPrice : item.currentPrice}</b> грн.</p>
                                                <p>Загальна ціна: <b>{((item.currentPrice === null ? item.currentPillowPrice : item.currentPrice)
                                                    * item.cartQuantity).toFixed(2)}</b> грн.</p>
                                                <div className='btn__group'>
                                                    <div className="count">
                                                        <button
                                                            className="count__btn"
                                                            onClick={() => decreaseCart(item)}>-
                                                        </button>
                                                        <p>
                                                            <b>{item.cartQuantity}</b>
                                                        </p>
                                                        <button
                                                            className="count__btn"
                                                            onClick={() => increaseCart(item)}>+
                                                        </button>
                                                    </div>
                                                    <FaTrashAlt size={19} color='red' onClick={() => removeFromCart(item)}/>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                    </motion.div>
                                );
                            })}
                        </>)}


                    </div>
                </ShowOnLogin>
                <ShowOnLogout>
                    <div className="logout">
                        <h3>Авторизуйтесь щоб мати можливість бачити кошик</h3>
                        <div>
                            <NavLink className="--btn-modal" to="/login"
                            >Увійти</NavLink>
                            <p>Немає облікового запису? <Link
                                className="--btn-modal"
                                to="/register">Зареєструватись</Link></p>
                        </div>
                    </div>
                </ShowOnLogout>
            </div>
            {cartItems.length ===0? null: <h3 className='modalCart__total'>Сума до сплати: <span>{`₴${cartTotalAmount.toFixed(2)}`}</span></h3>}
            {cartItems.length===0?(<button className='modalCart__btn' onClick={()=>setOpenCartModal(false)}>Продовжити покупки</button>):( <button className='modalCart__btn' onClick={checkout} >Оформити замовлення</button>)}

        </motion.div>
    );
};

export default CartModal;