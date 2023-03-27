import React, {useEffect, useState} from 'react';
import styles from './Product.module.scss'
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import useFetch from "../../customHook/useFetch";
import {useDispatch, useSelector} from "react-redux";
import {selectProducts, STORE_PRODUCTS,GET_PRICE_RANGE} from "../../redux/slice/productSlice";
import spinnerImg from './../../assets/7VE.gif'
import {FaCogs} from "react-icons/fa";
const Product = () => {
    const{data,isLoading} = useFetch("products","category")
    const [showFilter, setShowFilter] = useState(false);

    const products = useSelector(selectProducts)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            STORE_PRODUCTS({
                products: data
            })
        )
        dispatch(GET_PRICE_RANGE({
            products:data
        }))
    }, [dispatch,data]);
    const toggleFilter = () => {
      setShowFilter(!showFilter)
    }
    return (
       <section>
          {/* <div className={`container ${styles.product}`}>
               <aside className={showFilter ? `${styles.filter} ${styles.show}` :`${styles.filter}`}>
                   {isLoading ? null : <ProductFilter/>}

               </aside>
               <div className={styles.content}>
                   {isLoading ? (<img src={spinnerImg} alt="loading" style={{width:'270px'}} className='--center-all'/>): <ProductList products ={products}/>}
                   <div className={styles.icon} onClick={toggleFilter}>
                       <FaCogs size={20} color='orangered'/>
                       <p>
                           <b>{showFilter ? 'Сховати' : 'Відфільтувати'}</b>
                       </p>
                   </div>

               </div>
           </div>*/}
       </section>
    );
}

export default Product;