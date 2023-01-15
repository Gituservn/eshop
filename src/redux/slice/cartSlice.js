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
            console.log(action.payload.product)
            const productIndex = state.cartItems.findIndex((item) => item.product.id === action.payload.product.id)
            const productSize = state.cartItems.findIndex((item) => item.currentPrice === action.payload.currentPrice)
            const productPillowSize = state.cartItems.findIndex((item) => item.currentSize === action.payload.currentSize)
            console.log(productIndex)
            console.log(productSize)


            if (productIndex >= 0 && productSize >= 0 && productPillowSize >= 0) {
                //якщо товар уже існує в кошику
                //Збільшити кількість товару в кошику

                state.cartItems[productIndex].cartQuantity += 1
            } else {
                //товар ще не  існує в кошику
                //Добавити тавар в кошик
                const tempProducts = {...action.payload, cartQuantity: 1}
                state.cartItems.push(tempProducts)
                toast.success(`${action.payload.product.name} вже в кошику =)`)

            }
            //зберігаєм в LS
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },

        INCREASE_CART(state,action){
            const productIndex = state.cartItems.findIndex((item) => item.product.id === action.payload.product.id)
            if (state.cartItems[productIndex].product.id === action.payload.product.id && state.cartItems[productIndex].currentSize ===action.payload.currentSize && state.cartItems[productIndex].currentPrice ===action.payload.currentPrice){
                state.cartItems[productIndex].cartQuantity += 1
                console.log(action.payload)
                console.log('ok')

            } else {console.log('not ok')
                console.log(state.cartItems[productIndex].currentPrice)
                console.log(state.cartItems[productIndex].currentSize)
                console.log(state.cartItems[productIndex].product.id)
                console.log(action.payload.product.id)
                console.log(action.payload.currentPrice)
                console.log(action.payload.currentSize)
            }

        },
        DECREASE_CART(state, action) {
            const productIndex = state.cartItems.findIndex((item) => item.product.id === action.payload.product.id)
            if (state.cartItems[productIndex].cartQuantity > 1) {
                state.cartItems[productIndex].cartQuantity -= 1
            } else if (state.cartItems[productIndex].cartQuantity === 1) {
                const newCartItem = state.cartItems.filter((item) => item.product.id !== action.payload.product.id)
                state.cartItems = newCartItem
            }
        },

    }
})


export const {ADD_TO_CART, DECREASE_CART,INCREASE_CART } = cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;

export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount

export default cartSlice.reducer

