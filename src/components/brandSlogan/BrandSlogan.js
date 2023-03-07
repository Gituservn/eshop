import React from 'react';
import styles from './BrandSlogan.module.scss'
import {GiQueenCrown, GiThreeLeaves} from "react-icons/gi";
const BrandSlogan = () => {
    return (
        <div className={styles.brandSlogan}>
            <div className={styles.brandSlogan__wrapper}>
                <GiQueenCrown size={60} color={'#5C473D'}/>
                <h2 className={styles.brandSlogan__wrapper_title}>Willow House</h2>
                <p className={styles.brandSlogan__wrapper_desc}>Створюйте розкішний світ свого сну.</p>
                <div className={styles.brandSlogan__wrapper_list}>
                    <ul >
                        <li>
                            <GiThreeLeaves size={45} color={'#5C473D'}/>
                            <p>Покращує відпочинок</p>
                        </li>
                        <li>
                            <GiThreeLeaves size={45} color={'#5C473D'}/>
                            <p>Покращує сон</p>
                        </li>
                        <li>
                            <GiThreeLeaves size={45} color={'#5C473D'}/>
                            <p>Зменшує стрес</p>
                        </li>
                        <li>
                            <GiThreeLeaves size={45} color={'#5C473D'}/>
                            <p>Гарантія</p>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    );
};

export default BrandSlogan;