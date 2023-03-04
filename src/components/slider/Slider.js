import React, {useEffect} from "react";
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import useFetch from "../../customHook/useFetch";
import {useDispatch, useSelector} from "react-redux";
import {selectProducts, STORE_PRODUCTS} from "../../redux/slice/productSlice";
import styles from './slider.module.scss';

export default () => {
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

    const [sliderRef] = useKeenSlider({
        breakpoints: {
            "(min-width: 400px)": {
                slides: {perView: 2, spacing: 5},
            },
            "(min-width: 1000px)": {
                slides: {perView: 3, spacing: 10},
            },
        },
        slides: {perView: 1},
    });

    return (
        <div ref={sliderRef} className="keen-slider">
            {products.map((item) => {
                console.log(item);
                const {
                    id,
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

                const nonZeroPrice = prices.filter(num=>typeof num ==='number' && num !== 0 && !isNaN(num))

                const minPrice = Math.min(...nonZeroPrice)
                console.log(minPrice);

                return (
                    <div key={id} className="keen-slider__slide">
                        <p>Ціна від {minPrice} грн </p>
                        <img
                            src={imageURL} alt=""/>
                    </div>
                );
            })}

        </div>
    );
}