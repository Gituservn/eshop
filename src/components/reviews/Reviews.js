import React, {useEffect, useState} from 'react';
import review from '../../assets/reviews.png';
import styles from './Reviews.module.scss';
import Phone from '../../assets/Phone-removebg.png';
import ReviewsModal from "../ReviewsModal/ReviewsModal";


const Reviews = () => {
    const [openModal, setOpenModal] = useState(false);
    const [date, setDate] = useState(new Date());

    const tick = () => {
        setDate(new Date());
    };

    useEffect(() => {
        const intervalId = setInterval(() => tick(), 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);


    return (
        <div className={styles.reviews}>
            <img className={styles.reviews__img} src={review} alt=""/>
            <div className={styles.reviews__wrapper}>
                <h3 className={styles.reviews__wrapper_title}>Якщо ви ще не замовили та сумніваєтеся, <br/> рекомендуємо ознайомитися з відгуками наших задоволених клієнтів!</h3>
                <div className={styles.reviews__wrapper_container}>

                    <img src={Phone} alt=""/>
                    <p className={styles.time}>{date.getHours()}:{date.getMinutes()}
                    </p>
                </div>

                {openModal && <ReviewsModal openModal={openModal}
                                            setOpenModal={setOpenModal}/>}

                <button className={styles.reviews__btn} onClick={() => {
                    setOpenModal(true);
                }}>Написати відгук
                </button>
            </div>
        </div>);
};

export default Reviews;