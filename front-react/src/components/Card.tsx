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
    <div style={{display:'flex', width:'30%', border: '1px solid white', justifyContent:'center', flexDirection:'column', margin: '1rem',}}>
        <img src={card.image_uris.normal} className='imgCard' alt="Facecard"></img>
        <div style={{height: '30vh'}}>
            <h1 className='nameCard'>{card.name}</h1><p>{card.mana_cost}</p>
            <p className='rarityCard'>{card.rarity}</p>
            <p className='typeCard'>{card.type_line}</p> 
        </div>        
    </div>
  );
}

export default Card;