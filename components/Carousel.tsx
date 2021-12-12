import { Carousel, defaultProps } from "grommet";
import React from "react";
import { Accessibility, Location, Organization } from "grommet-icons";
import CarouselItem, { CarouselItemProps } from "./CarouselItem";
import cartoSS from "../public/carto-ss.jpg";
import fhsPool from "../public/fhspool.jpg";
import avhsField from "../public/avhsfield.png";

const items: CarouselItemProps[] = [
  {
    title: "Easy Usage",
    src: fhsPool,
    text: `Our clear user interface allows for easy usage of the product.
        With just 2 clicks, users are able to access the platform and
        begin navigating.`,
    icon: <Accessibility color="white" size="50px" />,
    left: true,
  },
  {
    title: "Accurate Navigation",
    src: cartoSS,
    icon: <Location color="white" size="50px" />,
    text: `We utilize Mapbox for our navigation system. Mapbox provides us with detailed interactive maps and acurrate navigation.`,
    left: false,
  },
  {
    title: "School Compatibility",
    src: avhsField,
    icon: <Organization color="white" size="50px" />,
    left: true,
    text: `Currently, our product is limited to only Foothill High School, but we hope to expand in the future, and potentially map a majority of the schools in the district.`,
  },
];
const CartoCarousel = () => {
  return (
    <Carousel controls={false} play={6000}>
      {items.map((item) => (
        <CarouselItem {...item} key={Math.random()} />
      ))}
    </Carousel>
  );
};

export default CartoCarousel;
