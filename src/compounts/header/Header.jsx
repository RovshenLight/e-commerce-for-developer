import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import { sliderUnits } from '../../data/data';
import './header.css';

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = sliderUnits.length;
  const intervalIdRef = useRef(null);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    startAutoSlide();
    
    return () => {
      stopAutoSlide();
      stopDelayedAutoSlide();
    };
  }, [totalSlides]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalIdRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  const stopDelayedAutoSlide = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  const handleManualSlide = (direction) => {
    stopAutoSlide();
    stopDelayedAutoSlide();

    setCurrentIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % totalSlides;
      } else {
        return (prevIndex - 1 + totalSlides) % totalSlides;
      }
    });

    timeoutIdRef.current = setTimeout(() => {
      startAutoSlide();
    }, 10000);
  };

  const handleNext = () => {
    handleManualSlide('next');
  };

  const handlePrev = () => {
    handleManualSlide('prev');
  };

  return (
    <div className='header'>
      <button className='prev' onClick={handlePrev}><BiLeftArrow /></button>
      <div className='header_container' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {sliderUnits.map((slider) => (
          <header key={slider.id} style={{ backgroundColor: `#${slider.bg}` }}>
            <div className="left">
              <h1>{slider.title}</h1>
              <h2>{slider.desc}</h2>
              <button><Link to='/Productslist'>Shop Now</Link></button>
            </div>
            <div className="right">
              <div className="right_bg gradient-background"></div>
              <img src={slider.img} alt="Hero" />
            </div>
          </header>
        ))}
      </div>
      <button className='next' onClick={handleNext}><BiRightArrow /></button>
    </div>
  );
};

export default Header;
