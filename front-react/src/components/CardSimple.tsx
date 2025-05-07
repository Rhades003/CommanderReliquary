import React from 'react';

interface CardProps {
    id:string;
    name:string;
    mana_cost:string;
    rarity:string;
    type_line:string;
    image_uris: {
      small:string;
      normal:string;
      large:string;
      png:string;
    };
};

const CardSimple: React.FC<CardProps> = ({ id, image_uris, name }) => {
 //console.log("Que coño me llega: "+image_uris+" "+name);
  return(
  <div className="border border-gray-700 rounded">
    <img src={image_uris.small} alt={name} className="w-full h-auto" />
  </div>);
};

export default CardSimple;
