import React from 'react';
import Card from "../../card/Card";
import styles from './ProductItem.module.scss'
import {Link} from "react-router-dom";

const ProductItem = ({grid, products, id, name, priceOne,priceEuro,pillowPrice40,pillowPrice50,pillowPrice60,pillowPrice70, desc, imageURL, brand}) => {

    const shortenText = (text, n) => {
      if (text.length > n){
          const shortText = text.substring(0,n).concat("...")
          return shortText
      }
      return text
    }
    return (
        <div className={styles.itemWrapper}>
            <div className={styles.details}>
                <p>{`₴${priceOne || pillowPrice40 || pillowPrice50 || pillowPrice60 || pillowPrice70 } -₴${priceEuro || pillowPrice70 || pillowPrice60 || pillowPrice50 || pillowPrice40 }`}</p>
                <Link to={`/product-details/${id}`}>
                    <div className={styles.img}>
                        <img src={imageURL} alt={name}/>
                    </div>
                </Link>
            </div>

            <div className={styles.content}>
                <h4 title={name}>{shortenText(name,218)}</h4>
                {!grid && <p className={styles.desc}>{shortenText(desc,300)}</p>}
                <Link to={`/product-details/${id}`} className='--btn --btn-danger'>Придбати</Link>
            </div>
        </div>

    );
}

export default ProductItem;