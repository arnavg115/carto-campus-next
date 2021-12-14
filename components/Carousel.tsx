import { defaultProps } from "grommet";
import { Carousel } from "react-responsive-carousel";
import React from "react";
import { Accessibility, Location, Organization } from "grommet-icons";
import CarouselItem, { CarouselItemProps } from "./CarouselItem";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const items: CarouselItemProps[] = [
  {
    title: "Easy Usage",
    src: "./fhspool.jpg",
    text: `Our clear user interface allows for easy usage of the product.
        With just 2 clicks, users are able to access the platform and
        begin navigating.`,
    icon: <Accessibility color="white" size="50px" />,
    left: true,
  },
  {
    title: "Accurate Navigation",
    src: "./carto-ss.jpg",
    icon: <Location color="white" size="50px" />,
    text: `We utilize Mapbox for our navigation system. Mapbox provides us with detailed interactive maps and acurrate navigation.`,
    left: false,
  },
  {
    title: "School Compatibility",
    src: "./avhsfield.png",
    icon: <Organization color="white" size="50px" />,
    left: true,
    text: `Currently, our product is limited to only Foothill High School, but we hope to expand in the future, and potentially map a majority of the schools in the district.`,
  },
];
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
      {items.map((item) => (
        <CarouselItem {...item} key={Math.random()} />
      ))}
    </Carousel>
  );
};

export default CartoCarousel;
