import React from 'react';
import styles from "./auth.module.scss";
import forgot from '../../assets/forgot.svg'
import {Link} from "react-router-dom";

function Reset() {
    return (
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={forgot} alt="reset" width="400"/>
            </div>
            <div className={styles.form}>
                <h2>Відновити пароль</h2>
                <form>
                    <input type="text" placeholder='Email' required/>

                    <button className="--btn --btn-primary --btn-block">Відновити пароль</button>
                    <div className={styles.links}>
                        <Link to='/login'>-Авторизація</Link>
                        <Link to='/register'>-Реєстрація</Link>
                    </div>

                </form>

            </div>
        </section>
    );
}

export default Reset;