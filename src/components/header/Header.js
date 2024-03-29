import React, {useEffect, useState} from "react";
import styles from './Header.module.scss';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {FaTimes} from 'react-icons/fa';
import {HiMenuAlt3} from "react-icons/hi";
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from "../../firebase/Config";
import {toast,} from "react-toastify";
import Loader from "../loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import {
    REMOVE_ACTIVE_USER,
    SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, {ShowOnLogout} from "../hiddenLink/hiddenLink";
import {AdminOnlyLink} from "../adminOnlyRoute/adminOnlyRoute";
import {
    CALC_TOTAL_QUANTITY,
    selectCartTotalQuantity
} from "../../redux/slice/cartSlice";
import Logo from '../../assets/logo.png';
import {BsFillHandbagFill} from "react-icons/bs";
import products from "../products/Product";
import useFetch from "../../customHook/useFetch";
import Search from "../search/Search";
import CartModal from "../cartModal/CartModal";


const logo = (
    <div className="logo">
        <Link to="/">
            <img className={styles.logo} src={Logo} alt="logo"/>
        </Link>
    </div>);

const activeLink = (({isActive}) => (isActive ? `${styles.active}` : ''));


const Header = () => {
    const {data} = useFetch("products", "category");
    const [showMenu, setShowMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [scrollPage, setScrollPage] = useState(false);
    const [openCartModal, setOpenCartModal] = useState(false);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);
    const dispatch = useDispatch();

// search
    const [results, setResults] = useState('');

    const handleChange = (e) => {
        const {target} = e;
        if (!target.value.trim()) return setResults([]);

        const filteredValue = data.filter((profile) => profile.name.toLowerCase().startsWith(target.value));
        setResults(filteredValue);
    };
    //
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

    useEffect(() => {
        dispatch(CALC_TOTAL_QUANTITY());
    }, [dispatch]);

    // const fixNavbar = () => {
    //   if (window.scrollY > 50){
    //       setScrollPage(true)
    //   } else {setScrollPage(false)}
    //
    // }

    // window.addEventListener('scroll',fixNavbar)


    const cart = (

        <ShowOnLogin>
        <span className={styles.cart} onClick={() => {
            setOpenCartModal(!openCartModal);
        }}>
            <div

                className={styles.cart__btn}

            >
                <BsFillHandbagFill
                    size={20}
                    color="#A78C70"/>
                <p>{cartTotalQuantity}</p> </div>
        </span>
        </ShowOnLogin>);
    return (<>
        {isLoading && <Loader/>}

        <header className={scrollPage ? `${styles.fixed}` : null}>
            <div className={styles.header}>
                <div>
                    {logo}

                    <HiMenuAlt3 className={styles.hamburger} color="#5C473D"
                                size={40} onClick={toggleMenu}/>
                </div>

                <div className={styles.header__wrapper}>
                    <nav
                        className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-menu"]}`}>
                        <div
                            /*className={showMenu ? `${styles["nav-wrapper"]} ${styles['show-nav-wrapper']}` : `${styles["nav-wrapper"]}`}*/
                            onClick={hideMenu}>
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
                                    <NavLink to="/linens"
                                             className={activeLink}>Постільні
                                        набори</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/pillow"
                                             className={activeLink}>Подушки</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/blankets"
                                             className={activeLink}>Ковдри</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/toppers"
                                             className={activeLink}>Наматрацники</NavLink>
                                </li>
                                <li>
                                    <ShowOnLogin>
                                        <NavLink to="/cart">Кошик</NavLink>
                                    </ShowOnLogin>
                                </li>


                                <li>
                                    <NavLink to="/contact"
                                             className={activeLink}>зв'яжіться
                                        з нами</NavLink>
                                </li>


                            </ul>
                            {/*Створив компонент передав пропси сюди*/}

                        </div>
                        <div className={styles.header_right}
                             onClick={hideMenu}>

                            <div className={styles.header_right__wrapper}>
                                    <span className={styles.links}>
                                    <ShowOnLogout>
                                        <NavLink to="/login"
                                                 className={activeLink}>Увійти</NavLink>
                                    <NavLink to="/register"
                                             className={activeLink}>Реєстрація</NavLink>
                                    </ShowOnLogout>

                                    <ShowOnLogin>
                                        <NavLink
                                            to="/orderHistory"
                                            className={activeLink}>Мої замовлення</NavLink>
                                    </ShowOnLogin>

                                    <ShowOnLogin>
                                        <NavLink to="/"
                                                 onClick={logoutUser}>Вийти
                                        </NavLink>
                                    </ShowOnLogin>

                                </span>
                            </div>
                        </div>
                        <div className={styles.cart__none}>
                            {cart}
                        </div>


                    </nav>
                    {openCartModal && <CartModal
                        openCartModal={openCartModal}
                        setOpenCartModal={setOpenCartModal}/>}
                    <Search/>
                </div>


                <div className={styles['menu-icon']}>
                    {cart}

                </div>

            </div>
        </header>
    </>);
};

export default Header;
