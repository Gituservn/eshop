import React, {useEffect, useState} from 'react';
import styles from "../home/Home.module.scss";
import pillows from "../../assets/Pillow.png";
import ProductItem from "../../components/products/productItem/ProductItem";
import useFetch from "../../customHook/useFetch";
import {useDispatch, useSelector} from "react-redux";
import {
    GET_PRICE_RANGE,
    selectProducts,
    STORE_PRODUCTS
} from "../../redux/slice/productSlice";

import {motion} from "framer-motion";

const Linens = () => {
    const{data,isLoading} = useFetch("products","category")
    const [selectedProduct, setSelectedProduct] = useState(null);
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

    const linen =products.filter(item=>item.category.includes('Постільна білизна'))

    const handleSelectedProduct = (selectedProductData) => {
      setSelectedProduct(selectedProductData)
    }
    console.log(selectedProduct);
    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0,transition:{duration:0.1}}}>
            <div className={styles.subheader}>
                <img  src={pillows} alt=""/>

            </div>
            <div className={styles.product_items}>
                {linen.map((product)=>{
                    return(
                        <div key={product.id}>
                            <ProductItem {...product} products={products} onSelectedProductData={handleSelectedProduct}/>
                        </div>
                    )
                })}
            </div>
        </motion.div>
    );
};

export default Linens;