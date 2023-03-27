import React, {useState,useEffect} from 'react';

import '../../components/ReviewsModal/ReviewsModal.scss';
import ShowOnLogin, {ShowOnLogout} from "../hiddenLink/hiddenLink";
import {AiOutlineCloseSquare} from "react-icons/ai";
import {Link, NavLink} from "react-router-dom";
import {motion} from "framer-motion";


const ProductModal = ({openProductModal, setOpenProductModal,modalData}) => {

    console.log(modalData);
    return (
        <motion.div
            className="modal"
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
            }}

        >
            <div className="modal_main">
                {modalData.id}
            </div>
        </motion.div>
    );
};

export default ProductModal;