import React from 'react';
import {motion} from "framer-motion";

const Toppers = () => {
    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0,transition:{duration:0.1}}}>>
        >Toppers</motion.div>
    );
};

export default Toppers;