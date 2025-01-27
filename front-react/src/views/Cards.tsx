import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import CardDoubleFace from '../components/CardDoubleFace';
/*
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
}

interface CardDoubleFaceProps {
card: {
  id:string;
  name:string;
  mana_cost:string;
  rarity:string;
  type_line:string;
  card_faces: [CardProps, CardProps];
  image_uris: {
    small:string;
    normal:string;
    large:string;
    png:string;
  };
  
};
}

type CardType = CardDoubleFaceProps | CardProps; */

const Cards = () => {
  
    const [cardList, setCardList] = useState<any[]>([]);

    useEffect(() => {
        const obtenerCartas = async () => {
          const res = await fetch('http://192.168.1.137:8080/cards/2', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors',
          });
          const data = await res.json();
          console.log(data)
          setCardList([...data.content]);
          
        }
  
        obtenerCartas();
  
      }, []);

      return (
        <div className="App">
  
        <div style={{display:'flex', width:'100%', flexWrap:'wrap'}}>

        {
        cardList.map((card, i) => {
          if ('image_uris' in card && card.image_uris !== null) {
            return <Card key={i} card={card}></Card>;
          } else {
            return <CardDoubleFace key={i} card={card}></CardDoubleFace>;
          }
         })
        
        }
        </div>
      </div>
      )

}
export default Cards;