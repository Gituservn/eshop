import {BrowserRouter, Routes, Route} from "react-router-dom";
//Components
import {Footer,Header} from "./components/index";
//Pages
import {Home,Contact,Login,Register,Reset,Admin} from './pages/index'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute from "./components/adminOnlyRoute/adminOnlyRoute";
import Error404 from "./pages/error404/Error404";



function App() {

    return (
        <>
            <ToastContainer/>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/reset" element={<Reset/>}/>
                    <Route path="notfound" element={<Error404 />} />
                    <Route path="*" element={<Error404 to="/notfound" replace />} />
                    <Route path="/admin/*" element={
                        <AdminOnlyRoute>
                            <Admin/>
                        </AdminOnlyRoute>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    );
}

export default App;
