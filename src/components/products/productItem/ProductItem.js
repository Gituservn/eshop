import React, {useState} from 'react';
import styles from './ProductItem.module.scss';
import {Link} from "react-router-dom";

const ProductItem = ({
                         grid,
                         products,
                         category
                         ,
                         id,
                         name,
                         priceOne,
                         priceTwo,
                         priceEuro,
                         pillowPrice40,
                         pillowPrice50,
                         pillowPrice60,
                         pillowPrice70,
                         desc,
                         imageURL,
                         brand,
                         euro,
                         one,
                         two,
                         pillowSize40,
                         pillowSize40plus,
                         pillowSize50,
                         pillowSize50plus,
                         pillowSize70,
                         onSelectedProductData,
                         setOpenProductModal
                     }) => {
    const product = {
        id,
        name,
        priceOne,
        priceEuro,
        priceTwo,
        pillowPrice40,
        pillowPrice50,
        pillowPrice60,
        pillowPrice70,
        desc,
        imageURL,
        category,
        brand,
        euro,
        one,
        two,
        pillowSize40,
        pillowSize40plus,
        pillowSize50,
        pillowSize50plus,
        pillowSize70,

    };
    const [selectedProductData, setSelectedProductData] = useState(product);
    const shortenText = (text, n) => {
        if (text.length > n) {
            const shortText = text.substring(0, n).concat("...");
            return shortText;
        }
        return text;
    };


    const handleClick = async () => {
        await setSelectedProductData(product);
        await onSelectedProductData(selectedProductData);
        await setOpenProductModal(true);
    };

    return (
        <div className={styles.itemWrapper}>
            <div className={styles.details}>
                <p>{`₴${priceOne || pillowPrice40 || pillowPrice50 || pillowPrice60 || pillowPrice70} -₴${priceEuro || pillowPrice70 || pillowPrice60 || pillowPrice50 || pillowPrice40}`}</p>
                <Link to={`/product-details/${id}`}>
                    <div className={styles.img}>
                        <img src={imageURL} alt={name}/>
                    </div>
                </Link>
            </div>

            <div className={styles.content}>
                <h4 title={name}>{shortenText(name, 218)}</h4>
                {!grid &&
                    <p className={styles.desc}>{shortenText(desc, 300)}</p>}
                <button onClick={handleClick}
                        className="--btn --btn-danger">Придбати
                </button>
            </div>
        </div>

    );
};

export default ProductItem;