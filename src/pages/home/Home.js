import React, {useEffect} from 'react';
import styles from './Home.module.scss';
import home from '../../assets/Home.png';
import HomeInfo from "../../components/homeInfo/HomeInfo";

import {motion} from 'framer-motion';
import BrandSlogan from "../../components/brandSlogan/BrandSlogan";
import DiscountBtn from "../../components/discountBtn/discountBtn";
import Slider from "../../components/Slider/Slider";


const Home = () => {
    const url = window.location.href;

    const scrollToProduct = () => {
        if (url.includes('#product')) {
            window.scrollTo({
                top: 700,
                behavior: 'smooth'
            });
            return;
        }
    };

    useEffect(() => {
        scrollToProduct();
    }, []);


    return (
        <motion.div className="container"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0, transition: {duration: 0.1}}}>
            <div className={styles.subheader}>
                <div className={styles.subheader__btn}><DiscountBtn/></div>
                <div className={styles.subheader__img}><img src={home} alt=""/>
                </div>
            </div>
            <HomeInfo/>
            <BrandSlogan/>

            <Slider/>


        </motion.div>
    );
};

export default Home;