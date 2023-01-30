import React from 'react';
import './Contact.module.scss'
import stewie from '../../assets/stewie.png'
import {motion} from "framer-motion";

const stewieStyle={
    width:'100%'
}
const Contact = () => {
    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0,transition:{duration:0.1}}}>>
            <img style={stewieStyle} src={stewie} alt=""/>
        </motion.div>
    );
};

export default Contact;
