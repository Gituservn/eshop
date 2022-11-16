import React from 'react';
import './Home.module.scss'
import brian from '../../assets/brian.png'
const Home=()=> {
    const stylesBrian={
        width:'100%'
    }
    return (
        <div><img style={stylesBrian} src={brian} alt=""/></div>
    );
}

export default Home;