import {BrowserRouter, Routes, Route} from "react-router-dom";
//Components
import {Footer,Header} from "./components/index";
//Pages
import {Home,Contact,Login,Register,Reset,Admin} from './pages/index'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute from "./components/adminOnlyRoute/adminOnlyRoute";
import ProductDetails from "./components/products/productDetails/ProductDetails";



function App() {

    return (
        <>
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


                    <Route path="/admin/*" element={
                        <AdminOnlyRoute>
                            <Admin/>
                        </AdminOnlyRoute>}/>

                    <Route path="/product-details/:id" element={<ProductDetails/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    );
}

export default App;
