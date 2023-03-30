import './ProductModal.scss';
import {GrClose} from "react-icons/gr";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";


const ProductModal = ({openProductModal, setOpenProductModal, modalData}) => {
    const [product, setProduct] = useState(null);
    const [currentSize, setCurrentSize] = useState(null);
    const [currentSizePillow, setCurrentSizePillow] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentPillowPrice, setCurrentPillowPrice] = useState(null);
// id, name, priceOne,priceEuro,pillowPrice40,pillowPrice50,pillowPrice60,pillowPrice70, desc, imageURL,category,brand

    console.log(currentPrice);
    console.log(currentSize);

    useEffect(()=>{
        setProduct({
            currentSize: currentSize,
            currentSizePillow: currentSizePillow,
            currentPrice: currentPrice,
            currentPillowPrice: currentPillowPrice,
        })
    },[currentSize, currentSizePillow, currentPrice, currentPillowPrice])

    function handleChangePillow(event) {
        setCurrentSizePillow(event.target.value);
        if (event.target.value === '40/60') {
            setCurrentPillowPrice(modalData.pillowPrice40);
        } else if (event.target.value === '50/70') {
            setCurrentPillowPrice(modalData.pillowPrice50);
        } else if (event.target.value === '60/60') {
            setCurrentPillowPrice(modalData.pillowPrice60);
        } else if (event.target.value === '70/70') {
            setCurrentPillowPrice(modalData.pillowPrice70);
        }

    }

    function handleChangeSize(event) {
        const value = event.target.value;
        const name = event.target.name;

        setCurrentPrice(value)
        setCurrentSize(name)

    }

    const ChangeSizeButton = ({sizeName, sizePrice}) => {
        return (<button className={currentSize===sizeName? 'changeSizeButton__active':'changeSizeButton'} onClick={handleChangeSize} name={sizeName}
                        value={sizePrice}>{sizeName}</button>);
    };
    const closeModal = (e) => {
        if (e.target.className === 'modal') {
            setOpenProductModal(false);
        }
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    return (
        <motion.div
            className="modal"
            onClick={closeModal}

        >
            <motion.div
                onClick={stopPropagation}
                className="modal__main"
                initial={{opacity: 0, scale: 0}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0}}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}>
                <GrClose className="modal__main_exit" size={30} onClick={() => {
                    setOpenProductModal(false);
                }}/>
                <div className="modal__main_content">
                    <img className="img" src={modalData.imageURL} alt=""/>
                    <h3 className="modal_title">{modalData.name} ТМ:{modalData.brand}</h3>
                    <h2 className="modal_category">{modalData.category}</h2>
                    <div className="modal_btnGroup">
                        {modalData.euro && (<ChangeSizeButton sizeName={'Євро'}
                                                              sizePrice={modalData.priceEuro}/>)}
                        {modalData.two && (
                            <ChangeSizeButton sizeName={'Двоспальний'}
                                              sizePrice={modalData.priceTwo}/>)}
                        {modalData.one && (
                            <ChangeSizeButton sizeName={'Півтораспальний'}
                                              sizePrice={modalData.priceOne}/>)}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProductModal;