import React, {useState} from 'react';
import styles from './ProductFilter.module.scss'
import {brands} from "../../admin/addProduct/consts";

const ProductFilter = () => {
    const [priceRange, setPriceRange] = useState(100);
    const [selectedBrand, setSelectedBrand] = useState(false);

    return (
        <div className={styles.filter}>
            <h4>Категорії</h4>
            <div className={styles.category}>
                <button>Всі</button>
            </div>
            <h4 className={styles.brand}>Виробник</h4>
            <div className={styles.brand}>
                <select name="brand">
                    <option>All</option>
                    {brands.map((brand) => {
                        return (<>

                                <option value={brand.name} key={brand.id}>{brand.name}</option>
                            </>
                        )
                    })}
                </select>

            </div>
            <h4>Ціна</h4>
            <p>{priceRange}</p>
            <div className={styles.price}>
                <input type="range" name='price' min='100' max='10000'
                       onChange={(event) => setPriceRange(event.target.value)}/>
            </div>
            <br/>
            <button className='--btn --btn-danger'>Скинути фільтри</button>
        </div>
    );
}

export default ProductFilter;