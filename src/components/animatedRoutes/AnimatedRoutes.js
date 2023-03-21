import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import {
    Admin,
    Blankets, Cart,
    Contact,
    Home,
    Linens,
    Login,
    Pillow,
    Register,
    Reset, Toppers
} from "../../pages";
import AdminOnlyRoute from "../adminOnlyRoute/adminOnlyRoute";
import ProductDetails from "../products/productDetails/ProductDetails";
import CheckoutDetails from "../../pages/checkout/CheckoutDetails";
import CheckoutSuccess from "../../pages/checkout/CheckoutSuccess";
import Checkout from "../../pages/checkout/Checkout";

import {AnimatePresence} from 'framer-motion'

const AnimatedRoutes = () => {
    const location = useLocation()
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/reset" element={<Reset/>}/>
                <Route path="/pillow" element={<Pillow/>}/>
                <Route path="/linens" element={<Linens/>}/>
                <Route path="/blankets" element={<Blankets/>}/>
                <Route path="/toppers" element={<Toppers/>}/>

                <Route path="/admin/*" element={
                    <AdminOnlyRoute>
                        <Admin/>
                    </AdminOnlyRoute>}/>
                <Route path="/product-details/:id" element={<ProductDetails/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/checkout-details" element={<CheckoutDetails/>}/>
                <Route path="/checkout-success" element={<CheckoutSuccess/>}/>
                <Route path="/checkout" element={<Checkout/>}/>

            </Routes>
        </AnimatePresence>

    );
};

export default AnimatedRoutes;