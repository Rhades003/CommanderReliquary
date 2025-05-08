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
    isCommander?:boolean;
};

const CardSimple: React.FC<CardProps> = ({ id, image_uris, name, isCommander}) => {
 //console.log("Que coño me llega: "+image_uris+" "+name);
 if(isCommander){
  return(
  <div className="border border-gray-700 rounded" >
    <img src={image_uris.normal} alt={name} className="w-full h-auto" style={{border: "8px solid rgb(95, 10, 112)", borderRadius:"15px", height:"20rem" }}/>
  </div>);
}
else {
  return(
    <div className="border border-gray-700 rounded">
      <img src={image_uris.normal} alt={name} className="w-full h-auto" style={{height:"20rem", borderRadius:"15px"}} />
    </div>);
}
};

export default CardSimple;
