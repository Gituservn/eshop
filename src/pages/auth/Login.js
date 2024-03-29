import React from 'react';
import {useState} from "react";
import styles from './auth.module.scss';
import loginImage from '../../assets/login.png';
import {Link} from 'react-router-dom';
import {FaGoogle} from 'react-icons/fa';
import Card from "../../components/card/Card";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import {auth} from "../../firebase/Config";
import {toast,} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Loader from "../../components/loader/Loader";
import {useSelector} from "react-redux";
import {selectPreviousURL} from "../../redux/slice/cartSlice";
import {motion} from "framer-motion";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const previousURL = useSelector(selectPreviousURL);

    const navigate = useNavigate();

    const redirectUser = () => {
        if (previousURL.includes('cart')) {
            return navigate('/cart');
        }
        navigate('/');

    };

    const loginUser = (e) => {
        e.preventDefault();
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // const user = userCredential.user;
                setIsLoading(false);
                toast.success('Ви вдало зайшли у особистий кабінет');
                redirectUser();
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error('Такого користувача не існує');
                navigate('/login');
            });
    };

    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        setIsLoading(true);
        signInWithPopup(auth, provider)
            .then((result) => {
                // const user = result.user;
                toast.success('Ви вдало зайшли у особистий кабінет');
                navigate('/');
                setIsLoading(false);
            }).catch((error) => {
            setIsLoading(false);
            toast.error(error.message);
        });
    };

    return (
        <>
            {isLoading && <Loader/>}

            <motion.section className={`container ${styles.auth}`}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity:0,transition:{duration:0.3}}}>>
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
                        <button className="--btn --btn-danger --btn-block"
                                onClick={signInWithGoogle}><FaGoogle
                            color="#fff"/> Увійдіть за допомогою Google
                        </button>
                        <span className={styles.register}>
                    <p>Немає облікового запису? <Link
                        to="/register">Зареєструватись</Link> </p>
                </span>
                    </div>
                </Card>
            </motion.section>
        </>
    );
};

export default Login;