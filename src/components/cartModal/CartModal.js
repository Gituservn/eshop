import React, {useEffect} from 'react';
import './cartModal.scss'
import {motion} from "framer-motion";
import ShowOnLogin, {ShowOnLogout} from "../hiddenLink/hiddenLink";
import {AiOutlineCloseSquare} from "react-icons/ai";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    CALC_SUBTOTAL, CALC_TOTAL_QUANTITY,
    CLEAR_CART,
    DECREASE_CART,
    INCREASE_CART, REMOVE_FROM_CART, SAVE_URL,
    selectCartItems,
    selectCartTotalAmount, selectCartTotalQuantity
} from "../../redux/slice/cartSlice";
import {selectIsLoggedIn} from "../../redux/slice/authSlice";
const CartModal = ({setOpenCartModal,openCartModal}) => {

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
    const closeCartModal=(e)=>{
        if(e.target.className==='cart__modal'){
            setOpenCartModal(false)
        }
    }

    const stopPropagation =(e)=>{
        e.stopPropagation()
    }


    return (
        <motion.div
            className="modalCart">
            <div className="modalCart_main" onClick={stopPropagation}>
                <ShowOnLogin>
                   <div className='modalCart_main_cart'>
                       <div className='modalCart__header'>
                           <h2 className='modalCart__header_title'>Кошик</h2>
                           <span className='modalCart__header_quantity'>{cartTotalQuantity}шт.</span>
                       </div>
                       {cartItems.length === 0 ? (
                               <>
                                   <p>Ваш кошик пустий</p>

                               </>
                           ):(<> не пустий</>)}

                       <button onClick={()=>{setOpenCartModal(false)}}>продовжити покупки</button>
                   </div>
                </ShowOnLogin>
                <ShowOnLogout>
                    <div className='logout'>
                        <h3>Авторизуйтесь щоб мати можливість бачити кошик</h3>
                        <div>
                            <NavLink className='--btn-modal' to="/login"
                            >Увійти</NavLink>
                            <p>Немає облікового запису? <Link className='--btn-modal'
                                                              to="/register">Зареєструватись</Link> </p>
                        </div>
                    </div>
                </ShowOnLogout>
            </div>
        </motion.div>
    );
};

export default CartModal;