import React from 'react';
import {Link} from "react-router-dom";
import styles from './Error404.module.scss'

const Error404 = () => {
    return (
            <div className={styles.errorBlock}>
                <h1 className={styles.h1}>404 - Not Found!</h1>
                <div className={styles.link}><Link to="/">Go Home</Link></div>
            </div>
    );
};

export default Error404;