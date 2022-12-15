import React from 'react';
import './Home.module.scss';

import Slider from "../../components/slider/Slider";

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