import React from 'react'

interface CardProps {
  card: {
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
}

const Card: React.FC<CardProps>  = ({card}) => {
  
  return (
    <div style={{display:'flex', width:'30%', justifyContent:'center', flexDirection:'column', margin: '1rem'}}>
        <a href={"/card/"+card.id} target="_blank"><img src={card.image_uris.normal} className='imgCard' alt="Facecard" style={{borderRadius:"25px"}}/></a>     
    </div>
  );
}

export default Card;