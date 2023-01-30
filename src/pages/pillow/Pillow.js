import React, {useEffect} from 'react';
import pillows from '../../assets/Pillow.png'
import styles from "../home/Home.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    GET_PRICE_RANGE,
    selectProducts,
    STORE_PRODUCTS
} from "../../redux/slice/productSlice";
import useFetch from "../../customHook/useFetch";
import ProductItem from "../../components/products/productItem/ProductItem";
import {motion} from "framer-motion";

const Pillow = () => {
    const{data,isLoading} = useFetch("products","category")


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

    const pillow =products.filter(item=>item.category.includes('Подушки'))
    console.log(pillow);
    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0,transition:{duration:0.3}}}>>
            <div className={styles.section_images}>
                <img  src={pillows} alt=""/>

            </div>
            <div className={styles.product_items}>
                {pillow.map((product)=>{
                    return(
                        <div key={product.id}>
                            <ProductItem {...product} products={products}/>
                        </div>
                    )
                })}
            </div>
        </motion.div>
    );
};

export default Pillow;