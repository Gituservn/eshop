import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    admins:[]
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        STORE_ADMINS(state, action) {
             console.log(action.payload)
            state.admins = action.payload.admins
        }}
})



export const { STORE_ADMINS }=adminSlice.actions

export const selectAdmins = (state)=>state.admin.admins

export default adminSlice.reducer

