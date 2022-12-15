import React from 'react';
import styles from './Search.module.scss'
import {FcSearch} from "react-icons/fc";
const Search = ({value, onChange}) => {
    return (
        <div className={styles.search}>
            <FcSearch size={22} className={styles.icon}/>
            <input type="text" placeholder='Пошук' value={value} onChange={onChange}/>
        </div>
    );
}

export default Search;