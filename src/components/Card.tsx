import React from "react";
import Typography from "./Typography";
// import Button from "./Button";

interface CardProps {
  title: string;
  image: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, image, description }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105">
      <img className="w-full h-auto" src={image} alt={title} />
      <div className="p-4">
        <Typography content={title} variant="h2" />
        <Typography content={description} variant="p" />
      </div>
    </div>
  );
};

export default Card;
