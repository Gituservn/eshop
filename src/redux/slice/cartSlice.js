import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";


const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    previousURL:'',
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        ADD_TO_CART(state, action) {

            const productSize = state.cartItems.findIndex((item) => item.currentSize === action.payload.currentSize)
            const productPillowSize = state.cartItems.findIndex((item) => item.currentSizePillow === action.payload.currentSizePillow)
            const productIndex = state.cartItems.findIndex((item) => item.product.id === action.payload.product.id)

            console.log(action.payload)


            if (productIndex >= 0 && productSize >= 0 && productPillowSize >= 0 ) {
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

        INCREASE_CART(state, action) {
            const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

            state.cartItems[productIndex].cartQuantity += 1



        },
        DECREASE_CART(state, action) {
            const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
            if (state.cartItems[productIndex].cartQuantity > 1) {
                state.cartItems[productIndex].cartQuantity -= 1
                toast.success(`1 ${action.payload.product.name} видалено з вашого кошика`)
            } else if (state.cartItems[productIndex].cartQuantity === 1) {
                const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id)
                state.cartItems = newCartItem
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        REMOVE_FROM_CART(state, action) {
            const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id)
            state.cartItems = newCartItem
            toast.info(` ${action.payload.product.name} видалено з вашого кошика`)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        CLEAR_CART(state, action) {
            state.cartItems = []
            toast.info(`кошик очищено`)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        CALC_SUBTOTAL(state, action) {
            const array =[];
            // Вибираєм ціну і кількість товару
            state.cartItems.map((item)=>{
                const cartItemAmount=(item.currentPrice || item.currentPillowPrice)
                    * item.cartQuantity
                return array.push(cartItemAmount)
            })
            //розраховуєм загальну вартість
            const totalAmount = array.reduce((a,b)=> {
                return a + b
            },0)

            state.cartTotalAmount = totalAmount
        },
        CALC_TOTAL_QUANTITY(state,action){
            const array =[];
            // Вибираєм ціну і кількість товару
            state.cartItems.map((item)=>{
                const quantity=item.cartQuantity
                return array.push(quantity)
            })
            //розраховуєм загальну вартість
            const totalQuantity = array.reduce((a,b)=> {
                return a + b
            },0)

            state.cartTotalQuantity = totalQuantity
        },
        SAVE_URL(state,action){
            state.previousURL=action.payload
            console.log(action.payload)
        }


    }
})


export const {
    ADD_TO_CART,
    DECREASE_CART,
    INCREASE_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    CALC_SUBTOTAL,
    CALC_TOTAL_QUANTITY,
    SAVE_URL
} = cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;

export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount

export const selectPreviousURL =(state)=> state.cart.previousURL

export default cartSlice.reducer

