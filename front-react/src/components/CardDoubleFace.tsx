import React from 'react'
import { useState } from 'react';

interface CardProps {
    id:string;
    name:string;
    mana_cost:string;
    rarity:string;
    type_line:string;
    oracle_text:string;
    image_uris: {
      small:string;
      normal:string;
      large:string;
      png:string;
    };
}

interface CardDoubleFaceProps {
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
    card_faces: [CardProps, CardProps];
  };
}

const CardDoubleFace: React.FC<CardDoubleFaceProps> = ({ card }) => {

  const [face, setFace] = useState(0);

  function changeFace() {
    if (face === 0) setFace(1);
    else setFace(0);
  }

    return (
      <div style={{display:'flex', width:'fit-content', justifyContent:'center', flexDirection:'column', margin: '1rem'}}>
        <a href={"/card/"+card.id} target="_blank"><img src={card.card_faces[face].image_uris.normal} className='imgCard' alt="Facecard" style={{borderRadius:"25px"}}/></a>     
          <button onClick={changeFace} style={{
                            bottom: "10rem",
                            zIndex: 10,
                            margin: "auto auto",
                            background: "#ffffff",
                            color: "#000",
                            padding: "0.5rem 1rem",
                            borderRadius: "777px",
                            border: "none",
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.4)",
                            width:"fit-content",
                            cursor: "pointer"
                        }}><img src="/imgs/exchange.svg" style={{height:"2rem"}}></img></button>
      </div>

    )

}

export default CardDoubleFace