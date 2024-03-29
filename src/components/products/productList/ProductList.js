import React, {useState, useEffect} from 'react';
import styles from './ProductList.module.scss'
import {BsFillGridFill,} from "react-icons/bs";
import {FaList} from "react-icons/fa";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import {useDispatch, useSelector} from "react-redux";
import {FILTER_BY_SEARCH, selectFilteredProduct,SORT_PRODUCTS} from "../../../redux/slice/filterSlice";
import Pagination from "../../pagination/Pagination";

const ProductList = ({products,onProductClick}) => {

    const [search, setSearch] = useState('');
    const [grid, setGrid] = useState(true)
    const [sort, setSort] = useState('latest');
    const filteredProducts = useSelector(selectFilteredProduct)

    //стейти пагінації
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(9);
    //отриманя поточних продуктів
    const indexOfLastProducts = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProducts - productsPerPage

    const currentProducts = filteredProducts.slice(indexOfFirstProduct,indexOfLastProducts)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(
            FILTER_BY_SEARCH({
                products,search
            })
        )
    }, [dispatch,products,search]);
    useEffect(() => {
        dispatch(
            SORT_PRODUCTS({
                products,sort
            })
        )
    }, [dispatch,products,sort]);

    return (
        <div className={styles["product-list"]} id="products">
            <div className={styles.top}>
                <div className={styles.icons}>
                    <BsFillGridFill className={styles.fillIcons}
                                    size={22}
                                    color={'orangered'}
                                    onClick={() => setGrid(true)}/>
                    <FaList
                        className={styles.fillIcons}
                        size={24}
                        color='blue'
                        onClick={() => setGrid(false)}/>
                    <p>
                        <b>{filteredProducts.length}</b> Товарів знайдено
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
                    <select value={sort} onChange={(e)=>setSort(e.target.value)}>
                        <option value="latest">Найновіші</option>
                        <option value="highest">Найдорощі</option>
                        <option value="lowest">Найдешевші</option>

                    </select>
                </div>
            </div>
            <div className={grid ? `${styles.grid}` : `${styles.list}`}>
                {products.length === 0 ? (<p>Товарів не знайдено</p>) : (
                    <>{currentProducts.map((product) => {

                        return (
                            <div key={product.id}>
                                <ProductItem {...product} grid={grid} products={products} />
                            </div>
                        )
                    })}</>
                )}
            </div>
            <Pagination
            productsPerPage={productsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalProducts={filteredProducts.length}

            />
        </div>

    );
}

export default ProductList;