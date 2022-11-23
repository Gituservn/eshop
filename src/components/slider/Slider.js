import React from 'react';
import {useState} from "react";
import './Slider.scss';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import {sliderData} from "./slider-data";

const Slider = () => {


    const [currentSlide, setCurrentSlide] = useState(1);
    const slideLenght = sliderData.length
    const nextSlide = ()=>{
        setCurrentSlide(currentSlide===slideLenght -1 ? 0 : currentSlide +1)

    }

    const prevSlide = ()=>{
        setCurrentSlide(currentSlide=== 0 ? slideLenght -1 : currentSlide -1)
    }
    return (
        <div className="slider">

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