import React from 'react';
import './Home.module.scss';

import Slider from "../../components/slider/Slider";
import AdminOnlyRoute from "../../components/adminOnlyRoute/adminOnlyRoute";
import Product from "../../components/products/Product";

const Home = () => {

    return (
        <div>
            <Slider/>
            <Product/>
        </div>
    );
};

export default Home;