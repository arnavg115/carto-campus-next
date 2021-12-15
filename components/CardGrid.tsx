import React, { FC } from "react";
import Cards, { CardsProps } from "./Cards";

interface CardGridProps {
  cards: CardsProps[];
}

const CardGrid: FC<CardGridProps> = (props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
        padding: "2rem",
        gap: "2rem",
        backgroundColor: "black",
      }}
    >
      {props.cards.map((card) => (
        <Cards {...card} key={Math.random()}/>
      ))}
    </div>
  );
};

export default CardGrid;
