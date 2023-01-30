import React from 'react';
import {motion} from "framer-motion";

const Blankets = () => {
    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0,transition:{duration:0.3}}}>>
            >Blankets</motion.div>
    );
};

export default Blankets;