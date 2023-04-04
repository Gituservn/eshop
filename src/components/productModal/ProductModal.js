import './ProductModal.scss';
import {GrClose} from "react-icons/gr";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase/Config";
import {toast} from "react-toastify";

import {ADD_TO_CART, CALC_TOTAL_QUANTITY} from "../../redux/slice/cartSlice";
import uuid from "react-uuid";
import {useDispatch} from "react-redux";


const ProductModal = ({openProductModal, setOpenProductModal, modalData}) => {

    const [product, setProduct] = useState(null);
    const [currentSize, setCurrentSize] = useState(null);
    const [currentSizePillow, setCurrentSizePillow] = useState(null);
    const [currentPrice, setCurrentPrice] = useState('');
    const [currentPillowPrice, setCurrentPillowPrice] = useState(null);
    const [category, setCategory] = useState(null);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const id = modalData.id;
    const dispatch = useDispatch();
// id, name, priceOne,priceEuro,pillowPrice40,pillowPrice50,pillowPrice60,pillowPrice70, desc, imageURL,category,brand
    console.log(modalData);


    const getProduct = async () => {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const obj = {
                id: id, ...docSnap.data()
            };
            setProduct(obj);
        } else {
            toast.error('Товар не знайдено');
        }
    };


    useEffect(() => {
        getProduct();
    }, []);

    const addToCart = (product) => {
        dispatch(ADD_TO_CART({
            product,
            currentSize,
            currentPrice: currentPrice,
            currentPillowPrice,
            currentSizePillow,
            id: uuid()
        }));
        dispatch(CALC_TOTAL_QUANTITY());
        setOpenProductModal(false)
    };
    useEffect(() => {
        setCategory(modalData.category);
        if (category === 'Постільна білизна' && currentSize !== null && currentSizePillow !== null && currentPrice !== null) {
            setButtonEnabled(true);
        } else if (category === 'Подушки' && currentSizePillow !== null) {
            setButtonEnabled(true);
        } else {
            setButtonEnabled(false);
        }
    }, [category, currentSize, currentSizePillow, currentPrice]);


    function handleChangeSizeLinens(event) {
        const value = event.target.value;
        const name = event.target.name;

        setCurrentPrice(Number(value));
        setCurrentSize(name);

    }

    function handleChangeSizePillow(event) {
        const value = event.target.value;
        const name = event.target.name;
        setCurrentPillowPrice(value);
        setCurrentSizePillow(name);
    }

    const ChangeSizeLinensButton = ({sizeName, sizePrice}) => {
        return (<button
            className={currentSize === sizeName ? 'changeSizeButton__active' : 'changeSizeButton'}
            onClick={handleChangeSizeLinens} name={sizeName}
            value={sizePrice}>{sizeName}</button>);
    };

    const ChangeSizePillowsButton = ({sizeName, sizePrice}) => {
        return (<button
            className={currentSizePillow === sizeName ? 'changeSizeButton__active' : 'changeSizeButton'}
            onClick={handleChangeSizePillow} name={sizeName}
            value={sizePrice}>{sizeName}</button>);
    };

    const LinensBtnGroup = () => {
        return (
            <>
                <label>Виберіть розмір комплекту</label>
                <div className="modal__btnGroup_linensSize">

                    {modalData.euro && (
                        <ChangeSizeLinensButton sizeName={'Євро'}
                                                sizePrice={modalData.priceEuro}/>)}
                    {modalData.two && (
                        <ChangeSizeLinensButton sizeName={'Двоспальний'}
                                                sizePrice={modalData.priceTwo}/>)}
                    {modalData.one && (
                        <ChangeSizeLinensButton sizeName={'Півтораспальний'}
                                                sizePrice={modalData.priceOne}/>)}
                </div>
            </>
        );
    };

    const PillowBtnGroup = () => {
        return (
            <>
                <label>{modalData.category === 'Постільна білизна' ? 'Виберіть' +
                    ' розмір наволочок' : 'Виберіть розмір подушки'}</label>
                <div className="modal__btnGroup_linensSize">
                    {modalData.pillowSize40 && (
                        <ChangeSizePillowsButton sizeName={'40/60'}
                                                 sizePrice={modalData.pillowPrice40}/>)}
                    {modalData.pillowSize50 && (
                        <ChangeSizePillowsButton sizeName={'50/70'}
                                                 sizePrice={modalData.pillowPrice50}/>)}
                    {modalData.pillowSize70 && (
                        <ChangeSizePillowsButton sizeName={'70/70'}
                                                 sizePrice={modalData.pillowPrice70}/>)}
                    {modalData.pillowSize50plus && (
                        <ChangeSizePillowsButton sizeName={'50/70+5см'}
                                                 sizePrice={modalData.pillowPrice50}/>)}
                </div>
            </>
        );
    };

    const Сomposition = () => {
        return (
            <>
                <h3>
                    Склад комплекту
                </h3>
                <div>
                    <ul>
                        <li>
                            <img src="" alt=""/>
                            <div>
                                <p></p>
                                <p></p>
                            </div>
                        </li>
                        <li><img src="" alt=""/>
                            <div>
                                <p></p>
                                <p></p>
                            </div>
                        </li>
                        <li><img src="" alt=""/>
                            <div>
                                <p></p>
                                <p></p>
                            </div>
                        </li>
                        <li><img src="" alt=""/>
                            <div>
                                <p></p>
                                <p></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </>
        );
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
                    <h2>Ціна:{currentPrice || currentPillowPrice} грн</h2>
                    <div className="modal__btnGroup">
                        {modalData.category === 'Постільна білизна' && (
                            <LinensBtnGroup/>)}
                        {modalData.category === 'Постільна білизна' && (
                            <PillowBtnGroup/>)}
                        {modalData.category === 'Подушки' && (
                            <PillowBtnGroup/>)}


                    </div>

                    <button
                        className={buttonEnabled ? "--btn --btn-danger" : "--btn --btn-danger --disabled"}
                        disabled={!buttonEnabled}
                        onClick={() => addToCart(product)}>Добавити в кошик
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProductModal;