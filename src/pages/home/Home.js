import React, {useEffect} from 'react';
import styles from'./Home.module.scss';
import Slider from "../../components/slider/Slider";
import Product from "../../components/products/Product";
import discount from '../../assets/Discount.png'
import home from '../../assets/Home.png'
import HomeInfo from "../../components/homeInfo/HomeInfo";
import SwiperSlider from "../../components/swiper/Swiper";
import {motion} from 'framer-motion'

const Home = () => {
    const url = window.location.href;

    const scrollToProduct = () => {
        if (url.includes('#product')) {
            window.scrollTo({
                top: 700,
                behavior: 'smooth'
            })
            return
        }
    }

    useEffect(()=>{
        scrollToProduct()
    },[])


    return (
        <motion.div className='container'
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0,transition:{duration:0.1}}}>
            <div
                className={styles.section_images}

            >
                <img src={home} alt=""/>
            </div>
            <HomeInfo/>
            {/*<Slider/>*/}
           <SwiperSlider/>
        </motion.div>
    );
};

export default Home;