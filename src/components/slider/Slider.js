import React from 'react';
import {useState,useEffect} from "react";
import './Slider.scss';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import {sliderData} from "./slider-data";
import {useSwipeable} from "react-swipeable";

const Slider = () => {


    const [currentSlide, setCurrentSlide] = useState(1);
    const slideLength = sliderData.length

    const autoScroll = true
    let slideInterval;
    let intervalTime = 5000;

    const nextSlide = ()=>{
        setCurrentSlide(currentSlide===slideLength -1 ? 0 : currentSlide +1)
    }

    const prevSlide = ()=>{
        setCurrentSlide(currentSlide=== 0 ? slideLength -1 : currentSlide -1)
    }

    function auto() {
            slideInterval = setInterval(nextSlide,intervalTime)

    }

    useEffect(() => {
        setCurrentSlide(0)

    }, []);

    useEffect(() => {
       if(autoScroll){
           auto()
       }
       return ()=>clearInterval(slideInterval)
    }, [currentSlide]);

    const handlers =useSwipeable({
        onSwipedLeft:()=>nextSlide(),
        onSwipedRight:()=>prevSlide(),
    })


    return (
        <div className="slider"{...handlers}>

            <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide}/>
            <AiOutlineArrowRight className="arrow next" onClick={nextSlide}/>

            {sliderData.map((slide, index) => {
                const {image,heading,descr} = slide;
                return (
                    <div key={index}
                         className={index === currentSlide ? 'slide current' : 'slide'}>
                        {index === currentSlide && (
                            <>
                                <img src={image} alt="slide"/>
                                <div className="content">
                                    <h2>{heading}</h2>
                                    <p>{descr}</p>
                                    <hr/>
                                    <a href="#product" className='--btn --btn-primary'> За покупками</a>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Slider;