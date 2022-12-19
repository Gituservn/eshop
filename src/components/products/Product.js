import React, {useEffect} from 'react';
import styles from './Product.module.scss'
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import useFetch from "../../customHook/useFetch";
import {useDispatch, useSelector} from "react-redux";
import {selectProducts, STORE_PRODUCTS} from "../../redux/slice/productSlice";
import spinnerImg from './../../assets/7VE.gif'
const Product = () => {
    const{data,isLoading} = useFetch("products","category")
    const products = useSelector(selectProducts)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            STORE_PRODUCTS({
                products: data
            })
        )
    }, [dispatch,data]);
    return (
       <section>
           <div className={`container ${styles.product}`}>
               <aside className={styles.filter}>
                   {isLoading ? null : <ProductFilter/>}

               </aside>
               <div className={styles.content}>
                   {isLoading ? (<img src={spinnerImg} alt="loading" style={{width:'270px'}} className='--center-all'/>): <ProductList products ={products}/>}

               </div>
           </div>
       </section>
    );
}

export default Product;