import React from 'react';
import clouds from '../../assets/icons/icon.png'
import icon from '../../assets/icons/icon1.png'
import bus from '../../assets/icons/bus.png'
import map from '../../assets/icons/map.png'
import styles from './HomeInfo.module.scss'
const HomeInfo = () => {
    return (
        <section className={styles.infoWrapper}>
            <div className={styles.infoWrapper_items}>
                <img src={clouds} alt=""/>
                <h4>Універсальна Постільна Білизна: Для Всіх Сезонів</h4>
                <p>М'який та комфортний матеріал для спання.</p>
            </div>
            <div className={styles.infoWrapper_items}>
                <img src={icon} alt=""/>
                <h4>Гарантія</h4>
                <p>100% гарантія задоволення або повернення грошей.</p>
            </div>
            <div className={styles.infoWrapper_items}>
                <img src={bus} alt=""/>
                <h4>Безкоштовна доставка
                    та повернення</h4>
                <p>Ми пропонуємо безкоштовну безконтактну доставку та
                    повернення по всій території України.</p>
            </div >
            <div className={styles.infoWrapper_items}>
                <img src={map} alt=""/>
                <h4>Вироблено в Україні</h4>
                <p>Точне пошиття для найкращого комфорту.</p>
            </div>
        </section>
    );
};

export default HomeInfo;