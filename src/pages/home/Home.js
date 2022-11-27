import React from 'react';
import './Home.module.scss';

import Slider from "../../components/slider/Slider";
import AdminOnlyRoute from "../../components/adminOnlyRoute/adminOnlyRoute";

const Home = () => {

    return (
        <div>
            <Slider/>
            <h1>home</h1>

        </div>
    );
};

export default Home;