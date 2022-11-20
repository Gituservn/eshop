import React from 'react';
import styles from './auth.module.scss';
import loginImage from '../../assets/login.svg'
import {Link} from 'react-router-dom'
import {FaGoogle} from 'react-icons/fa'
import Card from "../../components/card/Card";



function Login() {
    return (
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={loginImage} alt="login" width="400"/>
            </div>
            <Card>
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
            </Card>
        </section>
    );
}

export default Login;