import React from "react";
import styles from './Header.module.scss';
import {Link} from "react-router-dom";
import {FaShoppingCart} from 'react-icons/fa';
import {HiMenuAlt3} from "react-icons/hi";
import {useState} from "react";
const spanStyle = {
    color: 'orangered'
};

const logo = (
    <div className="logo">
        <Link to="/">
            <h2>
                <span style={spanStyle}>W</span>illow.
            </h2>
        </Link>
    </div>
);

const cart = (
    <span className={styles.cart}>
                        <Link to="/cart">Кошик <FaShoppingCart
                            size={20}/> <p>0</p> </Link>
                    </span>);


const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu=()=>{
        setShowMenu(!showMenu)
    }

    const hideMenu = () => {
      setShowMenu(false)
    }

    return (
        <header>
            <div className={styles.header}>
                {logo}
                <nav className={showMenu ? `${styles["show-nav"]}`:`${styles["hide-menu"]}`}>
                    <div className={showMenu ? `${styles["nav-wrapper"]} ${styles['show-nav-wrapper']}` : `${styles["nav-wrapper"]}`}
                    onClick={hideMenu}
                    >
                    </div>
                        <ul onClick={hideMenu}>
                            <li>
                                <Link to="/">Головна</Link>
                            </li>
                            <li>
                                <Link to="/contact">зв'яжіться з нами</Link>
                            </li>
                        </ul>
                        <div className={styles["header-right"]}>
                        <span className={styles.links}>
                            <Link to="/login">Увійти</Link>
                            <Link to="/register">Реєстрація</Link>
                            <Link to="/orderHistory">Мої замовлення</Link>
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
    );
};

export default Header;
