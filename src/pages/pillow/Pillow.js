import React, {useEffect} from 'react';
import pillows from '../../assets/Pillow.png'
import styles from "../home/Home.module.scss";
import {useDispatch, useSelector} from "react-redux";
import stylesPillow from './Pilow.module.scss'
import {
    GET_PRICE_RANGE,
    selectProducts,
    STORE_PRODUCTS
} from "../../redux/slice/productSlice";
import useFetch from "../../customHook/useFetch";
import ProductItem from "../../components/products/productItem/ProductItem";
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
        <>
            <div className={styles.section_images}>
                <img  src={pillows} alt=""/>

            </div>
            <div className={stylesPillow.pillow_items}>
                {pillow.map((product)=>{
                    return(
                        <div key={product.id}>
                            <ProductItem {...product} products={products}/>
                        </div>
                    )
                })}
            </div>
           </>

    );
};

export default Pillow;