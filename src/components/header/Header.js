import React from "react";
import styles from './Header.module.scss';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {FaShoppingCart, FaTimes} from 'react-icons/fa';
import {HiMenuAlt3} from "react-icons/hi";
import {useState} from "react";
import {signOut} from 'firebase/auth';
import {auth} from "../../firebase/Config";
import {toast, ToastContainer} from "react-toastify";
import Loader from "../loader/Loader";

const spanStyle = {
    color: 'orangered'
};
const logoStyle = {
    color: 'white'
};


const logo = (
    <div className="logo">
        <Link to="/">
            <h2 style={logoStyle}>
                <span style={spanStyle}>W</span>illow<span
                style={spanStyle}>.</span>
            </h2>
        </Link>
    </div>
);

const activeLink = (({isActive}) => (isActive ? `${styles.active}` : ''));

const cart = (
    <span className={styles.cart}>
                        <NavLink to="/cart"
                                 className={activeLink}>Кошик <FaShoppingCart
                            size={20}/> <p>0</p> </NavLink>
                    </span>);


const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const hideMenu = () => {
        setShowMenu(false);
    };
    const navigate = useNavigate();

    const logoutUser = () => {
        setIsLoading(true)
        signOut(auth).then(() => {
            toast.success('Ви вийшли з кабінету');
            setIsLoading(false)
            navigate('/login');
        }).catch((error) => {
            toast.error(error.message);
            setIsLoading(false)
        });
    };
    return (
        <>
            {isLoading && <Loader/>}
            <ToastContainer/>
            <header>
                <div className={styles.header}>
                    {logo}
                    <nav
                        className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-menu"]}`}>
                        <div
                            className={showMenu ? `${styles["nav-wrapper"]} ${styles['show-nav-wrapper']}` : `${styles["nav-wrapper"]}`}
                            onClick={hideMenu}
                        >
                        </div>
                        <ul onClick={hideMenu}>
                            <li className={styles['logo-mobile']}>
                                {logo}
                                <FaTimes size={22} color={'white'}
                                         onClick={hideMenu}/>
                            </li>

                            <li>
                                <NavLink to="/"
                                         className={activeLink}>Головна</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className={activeLink}>зв'яжіться
                                    з нами</NavLink>
                            </li>
                        </ul>
                        <div className={styles["header-right"]}
                             onClick={hideMenu}>
                        <span className={styles.links}>
                            <NavLink to="/login"
                                     className={activeLink}>Увійти</NavLink>
                            <NavLink to="/register"
                                     className={activeLink}>Реєстрація</NavLink>
                            <NavLink to="/orderHistory" className={activeLink}>Мої замовлення</NavLink>
                            <NavLink to="/" onClick={logoutUser}>Вийти</NavLink>
                        </span>
                            {cart}
                        </div>


                    </nav>
                    <div className={styles['menu-icon']}>
                        {cart}
                        <HiMenuAlt3 size={40} onClick={toggleMenu}/>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
