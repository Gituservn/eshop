import React from 'react';
import './OrderHistory.module.scss'
import {motion} from "framer-motion";

const OrderHistory = () => {
    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0,transition:{duration:0.1}}}>>
            OrderHistory
        </motion.div>
    );
};

export default OrderHistory;
