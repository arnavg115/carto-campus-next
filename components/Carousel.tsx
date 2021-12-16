import { Carousel } from "react-responsive-carousel";
import React from "react";
import CarouselItem from "./CarouselItem";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CarouselItems } from "../lib/contents";

const CartoCarousel = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      showIndicators={false}
      interval={6000}
    >
      {CarouselItems.map((item) => (
        <CarouselItem {...item} key={Math.random()} />
      ))}
    </Carousel>
  );
};

export default CartoCarousel;
