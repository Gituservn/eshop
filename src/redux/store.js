import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice'
import productReducer from './slice/productSlice'
import adminReducer from "./slice/adminSlice";

const rootReducer = combineReducers({
        auth: authReducer,
        product:productReducer,
        admin:adminReducer
}

);

const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
});

export default store;