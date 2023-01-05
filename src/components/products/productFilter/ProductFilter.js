import React, {useState, useEffect} from 'react';
import styles from './ProductFilter.module.scss'

import {useDispatch, useSelector} from "react-redux";
import {selectMaxPrice, selectMinPrice, selectProducts} from "../../../redux/slice/productSlice";
import {FILTER_BY_CATEGORY, FILTER_BY_BRAND, FILTER_BY_PRICE} from "../../../redux/slice/filterSlice";

const ProductFilter = () => {
    const minPrice = useSelector(selectMinPrice)
    const maxPrice = useSelector(selectMaxPrice)
    const [category, setCategory] = useState('Всі');
    const [price, setPrice] = useState(maxPrice);
    const [brand, setBrand] = useState('Всі');

    const dispatch = useDispatch()

    const products = useSelector(selectProducts)

    const allCategories = [
        "Всі",
        ...new Set(products.map((products) => products.category))
    ]

    const allBrands = [
        'Всі',
        ...new Set(products.map((products) => products.brand))
    ]
    useEffect(() => {
        dispatch(FILTER_BY_BRAND({products, brand}))
    }, [dispatch, products, brand]);

    useEffect(() => {
        dispatch(FILTER_BY_PRICE({products, price}))
    }, [dispatch, products, price]);


    const filterProduct = (cat) => {
        setCategory(cat)
        dispatch(
            FILTER_BY_CATEGORY({products, category: cat}))
    }

    const clearFilters = () => {
        setCategory('Всі')
        setBrand('Всі')
        setPrice(maxPrice)
    }

    return (
        <div className={styles.filter}>
            <h4>Категорії</h4>
            <div className={styles.category}>
                {allCategories.map((cat, index) => {
                    return (
                        <button
                            key={index}
                            type='button'
                            className={`${category}` === cat ? `${styles.active}` : null}
                            onClick={() => filterProduct(cat)}
                        >&#8250;{cat}</button>
                    )
                })}

            </div>
            <h4 className={styles.brand}>Виробник</h4>
            <div className={styles.brand}>
                <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                    {allBrands.map((brand, index) => {
                        return (
                            <option
                                value={brand}
                                key={index}>

                                {brand}
                            </option>
                        )
                    })}

                </select>

            </div>
            <h4>Ціна</h4>
            <p>{`₴${price}`}</p>
            <div className={styles.price}>
                <input type="range" value={price} min={minPrice} max={maxPrice}
                       onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <br/>
            <button className='--btn --btn-danger' onClick={clearFilters}>Скинути фільтри</button>
        </div>
    );
}

export default ProductFilter;