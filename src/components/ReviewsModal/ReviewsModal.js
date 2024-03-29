import React, {useState,useEffect} from 'react';
import {motion} from "framer-motion";
import './ReviewsModal.scss';
import {addDoc, collection, Timestamp} from "firebase/firestore";
import {auth, db} from "../../firebase/Config";
import {AiOutlineCloseSquare} from "react-icons/ai";
import ShowOnLogin, {ShowOnLogout} from "../hiddenLink/hiddenLink";
import {Link, NavLink} from "react-router-dom";
import {REMOVE_ACTIVE_USER, SET_ACTIVE_USER} from "../../redux/slice/authSlice";
import {useDispatch} from "react-redux";
import {onAuthStateChanged} from "firebase/auth";

const ReviewsModal = ({openModal, setOpenModal}) => {
    const [review, setReview] = useState({
        email: '',
        name: '',
        city: '',
        review: '',
    });
    const [displayName, setDisplayName] = useState('');

    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {

                if (user.displayName == null) {
                    const ul = user.email.slice(0, user.email.indexOf("@"));
                    const uName = ul.charAt(0).toUpperCase() + ul.slice(1);

                    setDisplayName(uName);
                } else {
                    setDisplayName(user.displayName);
                }


                dispatch(SET_ACTIVE_USER({
                    email: user.email,
                    userName: user.displayName ? user.displayName : displayName,
                    userId: user.uid,

                }));
            } else {
                setDisplayName('');
                dispatch(REMOVE_ACTIVE_USER());
            }
        });
    }, [dispatch, displayName]);

    const handleReviewsChange = (e) => {
        const {name, value} = e.target;
        setReview({...review, [name]: value});
    };

    const addReview = (e) => {
        e.preventDefault();
        try {
            const docRef = addDoc(collection(db, 'reviews'), {
                email: review.email,
                name: review.name,
                city: review.city,
                review: review.review,
                createdAt: Timestamp.now().toDate(),
                displayName:displayName

            });
            setReview(review);

            console.log('ok');
        } catch (error) {
            console.log('error');
        }
    };

    const closeModal = (e) => {
        if (e.target.className === 'modal') {
            setOpenModal(false);
        }
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className="modal"
            onClick={closeModal}


        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
                className="modal_main"
                onClick={stopPropagation}>
                <ShowOnLogin>
                    <form onSubmit={addReview}>
                        <div className="form__wrapper">
                            <AiOutlineCloseSquare className='form__wrapper_exit' size={20} onClick={()=>{setOpenModal(false)}}/>
                            <div className="form__wrapper_section">
                                <div className="form__wrapper_section_title">
                                    <h2>1</h2>
                                    <p>Особисті данні</p>
                                </div>
                                <input
                                    type="email"
                                    placeholder="Ваш email"
                                    name="email"
                                    required
                                    defaultValue={review.email}
                                    onChange={(e) => handleReviewsChange(e)}
                                />
                                <input
                                    type="text"
                                    placeholder="Ваше Ім'я"
                                    name="name"
                                    required
                                    defaultValue={review.name}
                                    onChange={(e) => handleReviewsChange(e)}
                                />
                                <input
                                    type="text"
                                    placeholder="Ваше місто"
                                    name="city"
                                    required
                                    defaultValue={review.city}
                                    onChange={(e) => handleReviewsChange(e)}
                                />
                            </div>

                            <div className="form__wrapper_section">
                                <div className="form__wrapper_section_title">
                                    <h2>2</h2>
                                    <p>ваш відгух</p>
                                </div>
                                <textarea
                                    placeholder="Напишіть ваш відгук"
                                    name="review"
                                    required
                                    defaultValue={review.review}
                                    onChange={(e) => handleReviewsChange(e)}/>
                            </div>
                        </div>
                        <button className='--btn-modal'>Відправити</button>
                    </form>
                </ShowOnLogin>
                <ShowOnLogout>
                   <div className='logout'>
                       <h3>Тільки авторизовані користувачі можуть залишати відгуки</h3>
                       <div>
                           <NavLink className='--btn-modal' to="/login"
                                    >Увійти</NavLink>
                           <p>Немає облікового запису? <Link className='--btn-modal'
                               to="/register">Зареєструватись</Link> </p>
                       </div>
                   </div>
                </ShowOnLogout>
            </motion.div>
        </div>
    );
};

export default ReviewsModal;