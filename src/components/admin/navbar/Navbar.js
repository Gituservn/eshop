import React, {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {NavLink} from "react-router-dom";
import {selectUserName} from "../../../redux/slice/authSlice";
import {FaUserCircle} from "react-icons/fa";
import styles from './Navbar.module.scss';
import {
    CALC_SUBTOTAL,
    CALC_TOTAL_QUANTITY,
    selectCartItems,
    selectCartTotalQuantity
} from "../../../redux/slice/cartSlice";

const activeLink = (({isActive}) => (isActive ? `${styles.active}` : ''));


const Navbar = () => {
    

    const userName = useSelector(selectUserName)
    return (
        <div className={styles.navbar}>
            <div className={styles.user}>
                <FaUserCircle size={40} color="#ffff"/>
                <h4>{userName}</h4>

            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/admin/home' className={activeLink}>
                            Загальна
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={activeLink}  to='/admin/all-product'>
                            Всі продукти
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={activeLink} to='/admin/add-product/ADD'>
                            Добавити продукт
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={activeLink} to='/admin/orders'>
                           Замовлення
                        </NavLink>
                    </li>


                    <li>
                        <NavLink className={activeLink} to='/admin/add-Admins'>
                            Адміністратори
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;