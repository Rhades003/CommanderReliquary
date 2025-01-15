import React from 'react'
import { useState } from 'react';

const CardDoubleFace = ({card}) => {
  //class Card extends React.Component {
    const [face, setKey] = useState(false)

     function changeFace() {
      
      if(face === false) setKey(true);
      
      else if(face === true) setKey(false);
    
      console.log(face);
      
     } 
  if(face === false){
  return (
    <div style={{display:'flex', width:'30%', border: '1px solid white', justifyContent:'center', flexDirection:'column', margin: '1rem',}}>
        <script src="./SwapFaces.js"></script>
        <img src={card.card_faces[0].image_uris.large} className='imgCard' alt="Facecard"></img>
        <div style={{height: '30vh'}}>
            <h1 className='nameCard'>{card.card_faces[0].name}</h1><p>{card.card_faces[0].mana_cost}</p>
            <p className='rarityCard'>{card.rarity}</p>
            <p className='typeCard'>{card.card_faces[0].type_line}</p>
            <button className='changeFaceHTML' onClick={changeFace}>Cambia la carta</button>
        </div>
                
    </div>

    
  )
  }
  else if(face === true){
    return(
    <div style={{display:'flex', width:'30%', border: '1px solid white', justifyContent:'center', flexDirection:'column', margin: '1rem',}}>
        <script src="./SwapFaces.js"></script>
        <img src={card.card_faces[1].image_uris.large} className='imgCard'></img>
        <div style={{height: '30vh'}}>
            <h1 className='nameCard'>{card.card_faces[1].name}</h1><p>{card.card_faces[1].mana_cost}</p>
            <p className='rarityCard'>{card.rarity}</p>
            <p className='typeCard'>{card.card_faces[1].type_line}</p>
            <button className='changeFaceHTML' onClick={changeFace}>Cambia la carta</button>
        </div>
                
    </div>

    )
  }

}

export default CardDoubleFace