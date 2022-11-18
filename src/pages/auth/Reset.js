import React from 'react';
import styles from "./auth.module.scss";
import resetImg from "../../assets/forgot.png";
import {Link} from "react-router-dom";

function Reset() {
    return (
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={resetImg} alt="reset" width="400"/>
            </div>
            <div className={styles.form}>
                <h2>Відновити пароль</h2>
                <form>
                    <input type="text" placeholder='Email' required/>

                    <button className="--btn --btn-primary --btn-block">Відновити пароль</button>
                    <div className={styles.links}>
                        <Link to='/reset'>-Авторизація</Link>
                        <Link to='/register'>-Реєстрація</Link>
                    </div>

                </form>

            </div>
        </section>
    );
}

export default Reset;