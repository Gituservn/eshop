import React from "react";
import {useEffect} from "react";
import styles from './Header.module.scss';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {FaShoppingCart, FaTimes, FaUserCircle} from 'react-icons/fa';
import {HiMenuAlt3} from "react-icons/hi";
import {useState} from "react";
import {signOut, onAuthStateChanged} from 'firebase/auth';
import {auth} from "../../firebase/Config";
import {toast,} from "react-toastify";
import Loader from "../loader/Loader";
import {useDispatch} from "react-redux";
import {SET_ACTIVE_USER,} from "../../redux/slice/authSlice";
import {REMOVE_ACTIVE_USER} from '../../redux/slice/authSlice';
import ShowOnLogin from "../hiddenLink/hiddenLink";
import {ShowOnLogout} from "../hiddenLink/hiddenLink";
import AdminOnlyRoute, {AdminOnlyLink} from "../adminOnlyRoute/adminOnlyRoute";

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
    <ShowOnLogin>
        <span className={styles.cart}>
            <NavLink
                to="/cart"
                className={activeLink}>Кошик <FaShoppingCart
                size={20}/> <p>0</p> </NavLink>

        </span>
    </ShowOnLogin>
);


const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [displayName, setDisplayName] = useState('');

    const dispatch = useDispatch();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const hideMenu = () => {
        setShowMenu(false);
    };
    const navigate = useNavigate();

    const logoutUser = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            toast.success('Ви вийшли з кабінету');
            setIsLoading(false);
            navigate('/login');
        }).catch((error) => {
            toast.error(error.message);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {

                if (user.displayName == null) {
                    const ul = user.email.slice(0, user.email.indexOf("@"));
                    const uName = ul.charAt(0).toUpperCase() + ul.slice(1);

                    setDisplayName(uName);
                } else {
                    setDisplayName(user.displayName);
                }


                dispatch(SET_ACTIVE_USER({
                    email: user.email,
                    userName: user.displayName ? user.displayName : displayName,
                    userId: user.uid,

                }));
            } else {
                setDisplayName('');
                dispatch(REMOVE_ACTIVE_USER());
            }
        });
    }, [dispatch, displayName]);


    return (
        <>
            {isLoading && <Loader/>}

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
                            <AdminOnlyLink>
                                <li>
                                    <Link to="/admin/home">
                                        <button
                                            className="--btn --btn-primary">Адміністратор
                                        </button>
                                    </Link>

                                </li>
                            </AdminOnlyLink>


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
                            <ShowOnLogout>
                                <NavLink to="/login"
                                         className={activeLink}>Увійти</NavLink>
                            <NavLink to="/register"
                                     className={activeLink}>Реєстрація</NavLink>
                            </ShowOnLogout>


                            <ShowOnLogin>
                                <a href="#">
                            <FaUserCircle
                                className={styles.userCircle}
                                size={16}
                            />
                                Вітаємо,{displayName}
                            </a>
                            </ShowOnLogin>

                            <ShowOnLogin>
                                <NavLink
                                    to="/orderHistory"
                                    className={activeLink}>Мої замовлення</NavLink>
                            </ShowOnLogin>

                            <ShowOnLogin>
                                <NavLink to="/"
                                         onClick={logoutUser}>Вийти</NavLink>
                            </ShowOnLogin>

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
