import React, {useEffect, useState} from 'react';
import styles from './ProductList.module.scss'
import {BsFillGridFill,} from "react-icons/bs";
import {FaList} from "react-icons/fa";
import useFetch from "../../../customHook/useFetch";
import {useDispatch, useSelector} from "react-redux";
import {selectProducts, STORE_PRODUCTS} from "../../../redux/slice/productSlice";
import Search from "../../search/Search";
import Product from "../Product";
import ProductItem from "../productItem/ProductItem";

const ProductList = ({products}) => {

    const [search, setSearch] = useState('');


    const [grid, setGrid] = useState(true)
    return (
        <div className={styles["product-list"]} id="products">
            <div className={styles.top}>
                <div className={styles.icons}>
                    <BsFillGridFill
                        size={22}
                        color={'orangered'}
                        onClick={() => setGrid(true)}/>
                    <FaList
                        size={24}
                        color='blue'
                        onClick={() => setGrid(false)}/>
                    <p>
                        <b>{products.length}</b> Товарів знайдено
                    </p>
                </div>
                {/*компонент пошуку*/}
                <div>
                    <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                {/*компонент сортування*/}
                <div className={styles.sort}>
                    <label htmlFor="">
                        Сортувати за:
                    </label>
                    <select>
                        <option value="latest">Найновіші</option>
                        <option value="highest">Найдорощі</option>
                        <option value="lowest">Найдешевші</option>
                        <option value="latest"></option>
                    </select>
                </div>
            </div>
            <div className={grid ? `${styles.grid}` : `${styles.list}`}>
                {products.length === 0 ? (<p>Товарів не знайдено</p>) : (
                    <>{products.map((product) => {

                        return (
                            <div key={product.id}>
                                <ProductItem {...product} grid={grid} products={products}/>
                            </div>
                        )
                    })}</>
                )}
            </div>
        </div>
    );
}

export default ProductList;