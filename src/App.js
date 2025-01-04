import {BrowserRouter, } from "react-router-dom";
//Components
import {Footer,Header} from "./components/index";
//Pages

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss'
import AnimatedRoutes from "./components/animatedRoutes/AnimatedRoutes";

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
                   <AnimatedRoutes/>
                    <Footer/>
                </BrowserRouter>
        </div>
//test
    );
}

export default App;
