import loaderProductImg from '../../assets/7VE.gif';
import styles from './Loader.module.scss';
import ReactDom from 'react-dom';

const LoaderProductList = () => {
    return ReactDom.createPortal(
        <div className={styles.wrapper}>
            <div className={styles.loader}>
                <img src={loaderProductImg} alt="loading..."/>
            </div>
        </div>,
        document.getElementById('loader')
    );
};

export default LoaderProductList;