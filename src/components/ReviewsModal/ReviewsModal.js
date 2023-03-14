import React, {useState} from 'react';
import {motion} from "framer-motion";
import './ReviewsModal.scss';
import {addDoc, collection, Timestamp} from "firebase/firestore";
import {db} from "../../firebase/Config";
import {AiOutlineCloseSquare} from "react-icons/ai";

const ReviewsModal = ({openModal, setOpenModal}) => {
    const [review, setReview] = useState({
        email: '',
        name: '',
        city: '',
        review: '',

    });
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
                createdAt: Timestamp.now().toDate()
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
        <motion.div
            className="modal"
            onClick={closeModal}
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.9}}

        >
            <div className="modal_main" onClick={stopPropagation}>
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
                    <button>Відправити відгук</button>
                </form>
            </div>
        </motion.div>
    );
};

export default ReviewsModal;