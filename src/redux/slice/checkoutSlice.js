import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    shipingAdress:{}
}

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        SAVE_SHIPPING_ADDRESS(state,action){
            console.log(action.payload);
            state.shipingAdress=action.payload
        }
    }
})



export const { SAVE_SHIPPING_ADDRESS }=checkoutSlice.actions

export const selectShippingAddress = (state)=>state.checkout.shipingAdress

export default checkoutSlice.reducer

