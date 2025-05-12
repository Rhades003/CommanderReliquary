import React, { MouseEventHandler } from 'react';

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
    action?:string;
    resultForParent?: (cardId: string, action: string) => void;
};

const CardSimple: React.FC<CardProps> = ({ id, image_uris, name, isCommander, action, resultForParent}) => {

 if(isCommander){
  return(
  <div className="border border-gray-700 rounded" >
    <img src={image_uris.normal} alt={name} className="w-full h-auto" style={{border: "8px solid rgb(95, 10, 112)", borderRadius:"15px", height:"20rem" }}/>
  </div>);
}
else if(resultForParent){
  if(action == "sum"){
  return(
    <div className="border border-gray-700 rounded">
      <img src={image_uris.normal} alt={name} className="w-full h-auto" onClick={() => resultForParent(id, "sum")} style={{height:"20rem", borderRadius:"15px", border: "8px solid rgb(11, 156, 30)"}} />
    </div>);
  }
  else {
    return(
      <div className="border border-gray-700 rounded">
        <img src={image_uris.normal} alt={name} className="w-full h-auto" onClick={() => resultForParent(id, "rest")} style={{height:"20rem", borderRadius:"15px", border: "8px solid rgb(172, 11, 11)"}} />
      </div>);
    }
  }
  return null;
};

export default CardSimple;
