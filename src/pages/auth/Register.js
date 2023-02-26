import React from 'react';
import {useState} from "react";
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase/Config";
import Loader from "../../components/loader/Loader";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate =useNavigate()


    const registerUser = (e) => {
        e.preventDefault()
        console.log(email,password,cPassword,name,phoneNumber,);
        if (password !== cPassword) {
           toast.error('Паролі не співпадають')
        }
        else if(password.length <8){
            toast.error('Пароль менше 8 символів')
        }
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                setIsLoading(false)
                toast.success('Ви вдало зареєструвались')
                navigate('/login')

            })
            .catch((error) => {

                const errorMessage = error.message;
                toast.error(errorMessage)
                setIsLoading(false)
                // ..
            });
    }



    return (
        <>

            {isLoading && <Loader/>}
        <motion.section className={`container ${styles.auth}`}
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        exit={{opacity:0,transition:{duration:0.3}}}>>
            <div className={styles.img}>
                <img src={registerImg} alt="register" width="400"/>
            </div>
            <Card>
                <div className={styles.form}>
                    <h2>Реєстрація</h2>


                    <form onSubmit={registerUser}>
                        <input type="text"
                               placeholder="Ваше ім'я"
                               required
                               value={name}
                               onChange={(e) => setName(e.target.value)}/>
                        <input type="tel"
                               placeholder="Ваш номер телефону"
                               required
                               value={phoneNumber}
                               onChange={(e)=>{setPhoneNumber(e.target.value)}}
                        />
                        <input type="email"
                               placeholder="Email"
                               required
                               value={email}
                               onChange={(e)=>{setEmail(e.target.value)}}
                        />
                        <input type="password"
                               placeholder="Пароль"
                               required
                               value={password}
                               onChange={(e)=>{setPassword(e.target.value)}}
                        />
                        <input type="password"
                               placeholder="Підтвердіть пароль"
                               required
                               value={cPassword}
                               onChange={(e)=>{setCPassword(e.target.value)}}
                        />
                        <button
                            type="submit"
                            className="--btn --btn-primary --btn-block">Зареєструватись
                        </button>

                    </form>
                    <span className={styles.register}>
                    <p>Маєте акаунт? <Link to="/login">Увійти</Link> </p>
                </span>
                </div>
            </Card>

        </motion.section>
        </>
    );
};

export default Register;