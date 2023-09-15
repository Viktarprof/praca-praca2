import React, { useState, useRef, useEffect } from "react";
import s from "./LogoCarusel.module.css";
import Button from "../UI/Button/Button";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { 
  PiPlayFill, 
  PiPauseFill 
} from "react-icons/pi";

function LogoCarousel({ logoComponies }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [isPlay, setIsPlay] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.getBoundingClientRect().width;
      setSlideWidth(containerWidth);
    }

    if (isPlay) {
      const interval = setInterval(() => {
        handleScrollRight();
      }, 3000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [logoComponies, isPlay]);

  const handleScrollRight = () => {
    setCurrentSlide((prevSlide) => {
      if (prevSlide === logoComponies.length - 1) {
        return 0;
      }
      return prevSlide + 1;
    });
  };

  const handleScrollLeft = () => {
    setCurrentSlide((prevSlide) => {
      if (prevSlide === 0) {
        return logoComponies.length - 1;
      }
      return prevSlide - 1;
    });
  };

  const toggleAutoScroll = () => {
    setIsPlay((prevState) => !prevState);
  };

  const carouselStyle = {
    transform: `translateX(-${currentSlide * slideWidth}px)`,
    transition: "transform 1s ease-in-out",
  };

  return (
    <div className={s.container}>
      <div className={s.navSlider}>
        <Button
          text={isPlay ? <PiPlayFill /> : <PiPauseFill />}
          styles="play"
          onClick={toggleAutoScroll}
        />
        <ul className={s.dots}>
          {logoComponies.map((dot, index) => (
            <li
              key={dot.id}
              className={` ${index === currentSlide ? s.active : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </ul>
      </div>
      <div className={s.caruselWindow}>
        <Button
          text={<IoIosArrowDropleftCircle />}
          styles="arrow"
          onClick={handleScrollLeft}
        />
        <div className={s.caruselTrack}>
          <div className={s.carousel} style={carouselStyle}>
            {logoComponies.map((el) => (
              <div className={s.logoItem} key={el.id} ref={carouselRef}>
                <img src={el.image} alt={el.title} />
                <p>{el.title}</p>
              </div>
            ))}
          </div>
        </div>
        <Button
          text={<IoIosArrowDroprightCircle />}
          styles="arrow"
          onClick={handleScrollRight}
        />
      </div>
    </div>
  );
}

export default LogoCarousel;
