import loaderImg from '../../assets/loader.gif';
import styles from './Loader.module.scss';
import ReactDom from 'react-dom';

const Loader = () => {
    return ReactDom.createPortal(
        <div className={styles.wrapper}>
            <div className={styles.loader}>
                <img src={loaderImg} alt="loading..."/>
            </div>
        </div>,
        document.getElementById('loader')
    );
};

export default Loader;