import React from 'react';
import styles from './auth.module.scss';
import loginImg from './login.png'
import {Link} from 'react-router-dom'
import {FaGoogle} from 'react-icons/fa'

function Login() {
    return (
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={loginImg} alt="login" width="400"/>
            </div>
            <div className={styles.form}>
                <h2>Авторизація</h2>
                <form>
                    <input type="text" placeholder='Email' required/>
                    <input type="text" placeholder='Password' required/>
                    <button className="--btn --btn-primary --btn-block">Вхід</button>
                    <div className={styles.links}>
                        <Link to='/reset'>Відновити пароль</Link>
                    </div>
                    <p>-- Або --</p>
                </form>
                <button className="--btn --btn-danger --btn-block"> <FaGoogle color="#fff"/>  Увійдіть за допомогою Google</button>
                <span className={styles.register}>
                    <p>Немає облікового запису? <Link to='/register'>Зареєструватись</Link> </p>
                </span>
            </div>
        </section>
    );
}

export default Login;