import React, {useState} from 'react';
import review from '../../assets/reviews.png';
import styles from './Reviews.module.scss';
import Phone from '../../assets/Phone-removebg.png';
import ReviewsModal from "../ReviewsModal/ReviewsModal";


const Reviews = () => {
    const [openModal, setOpenModal] = useState(false);



    return (
        <div className={styles.reviews}>
            <img className={styles.reviews__img} src={review} alt=""/>
            <div className={styles.reviews__wrapper}>
                <img src={Phone} alt=""/>
                {openModal && <ReviewsModal openModal={openModal} setOpenModal={setOpenModal}/>}

                <button className={styles.reviews__btn} onClick={()=>{setOpenModal(true)}}>Написати відгук</button>
            </div>
        </div>);
};

export default Reviews;