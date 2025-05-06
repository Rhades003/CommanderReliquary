import React from 'react';

interface CardProps {
  id: string;
  img: string;
  title: string;
}

const CardSimple: React.FC<CardProps> = ({ id, img, title }) => (
  <div className="border border-gray-700 rounded">
    <img src={img} alt={title} className="w-full h-auto" />
  </div>
);

export default CardSimple;
