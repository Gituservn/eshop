import React, {useEffect} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useFetch from "../../customHook/useFetch";
import {useDispatch, useSelector} from "react-redux";
import {selectProducts, STORE_PRODUCTS} from "../../redux/slice/productSlice";
import style from './Slider.module.scss';
import {Link} from "react-router-dom";
import productImage from '../../assets/image.psd-removebg-preview.png'
const Slider = () => {
    const {data, isLoading} = useFetch("products", "category");

    const products = useSelector(selectProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            STORE_PRODUCTS({
                products: data
            })
        );
    }, [dispatch, data]);
    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 3,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2,
            slidesToSlide: 1, // optional, default to 1.

        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1,
            slidesToSlide: 1, // optional, default to 1.

        }
    };
    return (
        <div className={style.slider}>
            <div className={style.slider__titleImage}>
                <img src={productImage} alt=""/>
            </div>
            <Carousel
                arrows={false}
                infinite
                autoPlay
                autoPlaySpeed={4000}
                responsive={responsive}>

                {products.map((item) => {
                    console.log(item);
                    const {
                        id,
                        name,
                        imageURL,
                        priceOne,
                        priceTwo,
                        priceEuro,
                        pillowPrice40,
                        pillowPrice50,
                        pillowPrice70,
                        pillowPrice60
                    } = item;
                    const prices = [
                        priceOne, priceTwo, priceEuro, pillowPrice40, pillowPrice50, pillowPrice70, pillowPrice60
                    ];

                    const nonZeroPrice = prices.filter(num => typeof num === 'number' && num !== 0 && !isNaN(num));

                    const minPrice = Math.min(...nonZeroPrice);
                    console.log(minPrice);

                    return (
                        <div className={style.slide} key={id}>
                            <p className={style.slide__price}>Ціна
                                від <span>{minPrice} грн</span></p>
                            <img
                                src={imageURL} alt=""/>
                            <p className={style.slide__name}>{name}</p>

                            <Link to={`/product-details/${id}`}
                                  className={style.slide__btn}>докладніше</Link>
                        </div>
                    );
                })}
            </Carousel>
        </div>

    );
};

export default Slider;