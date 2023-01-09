import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        ADD_TO_CART(state, action) {
            console.log(action.payload)
            const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

            if (productIndex >= 0) {
                //товар уже існує в кошику
                //Збільшити кількість кошика

                state.cartItems[productIndex].cartQuantity+=1
            } else {
                //товар ще не  існує в кошику
                //Добавити тавар в кошик
                const tempProducts = {...action.payload,cartQuantity:1}
                state.cartItems.push(tempProducts)
                toast.success(`${action.payload.name} вже в кошику =)` )
            }

            //зберігаєм в LS
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        }
    }
})


export const {ADD_TO_CART} = cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;

export const selectcartTotalAmount = (state) => state.cart.cartTotalAmount

export default cartSlice.reducer

