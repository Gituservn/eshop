import {BrowserRouter, Routes, Route} from "react-router-dom";
//Components
import {Footer,Header} from "./components/index";
//Pages
import {
    Home,
    Contact,
    Login,
    Register,
    Reset,
    Admin,
    Cart,
    Pillow, Linens, Blankets, Toppers
} from './pages/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute from "./components/adminOnlyRoute/adminOnlyRoute";
import ProductDetails from "./components/products/productDetails/ProductDetails";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import Checkout from "./pages/checkout/Checkout";
import './App.scss'

function App() {

    return (
        <div className='container'>

                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <BrowserRouter>
                    <Header/>
                    <Routes>
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
                    <Footer/>
                </BrowserRouter>

        </div>

    );
}

export default App;
