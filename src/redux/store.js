import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice'
import productReducer from './slice/productSlice'
import adminReducer from "./slice/adminSlice";
import filterReducer from "./slice/filterSlice";
import cartReducer from "./slice/cartSlice";

const rootReducer = combineReducers({
        auth: authReducer,
        product: productReducer,
        admin: adminReducer,
        filter: filterReducer,
        cart: cartReducer
    }
);

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;