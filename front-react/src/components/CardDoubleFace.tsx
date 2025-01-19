import React from 'react'
import { useState } from 'react';

const CardDoubleFace = ({card}) => {
  //class Card extends React.Component {
    const [face, setKey] = useState(false)

     function changeFace() {
      
      if(face == 0) face = 1;
      
      else face = 0;

      console.log(face);
      
     } 
  
  return (
    <div style={{display:'flex', width:'30%', border: '1px solid white', justifyContent:'center', flexDirection:'column', margin: '1rem',}} key={key}>
        <script src="./SwapFaces.js"></script>
        <img src={card.card_faces[face].image_uris.large} className='imgCard'></img>
        <div style={{height: '30vh'}}>
            <h1 className='nameCard'>{card.card_faces[face].name}</h1><p>{card.card_faces[face].mana_cost}</p>
            <br/>
            <p className='rarityCard'>{card.rarity}</p>
            <p className='typeCard'>{card.card_faces[face].type_line}</p>
            <button className='changeFaceHTML' onClick={changeFace}>Cambia la carta</button>
        </div>
                
    </div>

    )
  }

}

export default CardDoubleFace