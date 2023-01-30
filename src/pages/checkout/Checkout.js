import React from 'react';
import styles from './CheckoutDetails.module.scss'
import {motion} from "framer-motion";

const Checkout = () => {
    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0,transition:{duration:0.1}}}>>
            >Checkout</motion.div>
    );
}

export default Checkout;