import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import CardDoubleFace from '../components/CardDoubleFace';

const Cards = () => {
  
    const [cardList, setCardList] = useState<any[]>([]);

    useEffect(() => {
        const obtenerCartas = async () => {
          const res = await fetch('http://localhost:8080/cards/getAllCards/1', {
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