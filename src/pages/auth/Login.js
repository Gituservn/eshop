import React from 'react';
import {useState} from "react";
import styles from './auth.module.scss';
import loginImage from '../../assets/login.png';
import {Link} from 'react-router-dom';
import {FaGoogle} from 'react-icons/fa';
import Card from "../../components/card/Card";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase/Config";
import {toast,ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Loader from "../../components/loader/Loader";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const loginUser = (e) => {
        e.preventDefault();
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setIsLoading(false);
                toast.success('Ви вдало зайшли у особистий кабінет')
                navigate('/')
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error('Такого користувача не існує');
                navigate('/login')
            });
    };
    return (
        <>
            {isLoading && <Loader/>}
        <ToastContainer/>
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={loginImage} alt="login" width="400"/>
            </div>
            <Card>
                <div className={styles.form}>
                    <h2>Авторизація</h2>

                    <form onSubmit={loginUser}>
                        <input type="email"
                               placeholder="Email"
                               required
                               value={email}
                               onChange={(e) => {
                                   setEmail(e.target.value);
                               }}
                        />
                        <input type="password"
                               placeholder="Пароль"
                               required
                               value={password}
                               onChange={(e) => {
                                   setPassword(e.target.value);
                               }}
                        />
                        <button type="submit"
                                className="--btn --btn-primary --btn-block">Вхід
                        </button>

                    </form>
                    <div className={styles.links}>
                        <Link to="/reset">Відновити пароль</Link>
                    </div>
                    <p>-- Або --</p>
                    <button className="--btn --btn-danger --btn-block"><FaGoogle
                        color="#fff"/> Увійдіть за допомогою Google
                    </button>
                    <span className={styles.register}>
                    <p>Немає облікового запису? <Link
                        to="/register">Зареєструватись</Link> </p>
                </span>
                </div>
            </Card>
        </section>
        </>
    );
};

export default Login;