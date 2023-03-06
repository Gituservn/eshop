import React from 'react';
import styles from './discountBtn.module.scss'
const DiscountBtn = () => {
    return (
        <div className={styles.discountBtn}>

                <h2 className={styles.discountBtn__title}>Весняні знижки</h2>
                <p className={styles.discountBtn__desc}>До <br/> <span>50%</span> <br/> цього сезону</p>
                <button className='--btn-secondary'>За покупками</button>
        </div>
    );
};

export default DiscountBtn;