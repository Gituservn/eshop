import React, {useEffect} from 'react';
// import Swiper JS
import {Swiper, SwiperSlide} from 'swiper/react';
// import Swiper styles
import 'swiper/css';
import styles from './sliderWrapper.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {
    GET_PRICE_RANGE,
    selectProducts,
    STORE_PRODUCTS
} from "../../redux/slice/productSlice";
import useFetch from "../../customHook/useFetch";
import {Navigation, Pagination} from "swiper";
import {Link} from "react-router-dom";

export default function SwiperSlider() {
    const {data, isLoading} = useFetch("products", "category");
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            STORE_PRODUCTS({
                products: data
            })
        );
        dispatch(GET_PRICE_RANGE({
            products: data
        }));
    }, [dispatch, data]);

    return (
        <div className={styles.sliderWrapper}>
            <div className={styles.title}>
                <h2>Наші продукти</h2>
            </div>
            <Swiper
                breakpoints={{
                    // when window width is >= 640px
                    640: {
                        width: 640,
                        slidesPerView: 1,
                    },
                    // when window width is >= 768px
                    768: {
                        width: 768,
                        slidesPerView: 2,
                    },
                }}
                slidesPerView={3}
                spaceBetween={30}
                slidesPerGroup={1}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"

            >
                {products.map((slide) => {
                    console.log(slide);
                    return (
                        <div>
                            <SwiperSlide id={slide.id}>
                                <Link to={`/product-details/${slide.id}`}>
                                    <div className={styles.slideWrapper}>
                                        <p className={styles.productPrice}>
                                            <b>Ціна: {`₴${slide.priceOne || slide.pillowPrice40 || slide.pillowPrice50 || slide.pillowPrice60 || slide.pillowPrice70} -₴${slide.priceEuro || slide.pillowPrice70 || slide.pillowPrice60 || slide.pillowPrice50 || slide.pillowPrice40}`}
                                            </b>
                                        </p>
                                        <img className={styles.sliderImg}
                                             src={slide.imageURL} alt={""}/>
                                    </div>

                                </Link>
                                <button className={styles.button}>Більше інформації</button>
                            </SwiperSlide>

                        </div>

                    );
                })}
            </Swiper>
        </div>

    );
}
;


