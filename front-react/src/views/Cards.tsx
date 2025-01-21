import React, { useState, useEffect } from 'react';
import Card from '../components/Card.tsx';
import CardDoubleFace from '../components/CardDoubleFace.tsx';

interface CardBase {
  image_uris?: any; // Ajusta el tipo según la estructura real de 'image_uris'
}

const Cards = <T extends CardBase>() => {
  
    const [cardList, setCardList] = useState<T[]>([]);

    useEffect(() => {
        const obtenerCartas = async () => {
          const res = await fetch('http://192.168.1.137:8080/getAllCard/2', {mode:'cors'});
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
          if(card.image_uris != null){
            return <Card key={i} card={card}></Card>
          }
          else {
            return <CardDoubleFace key={i} card={card}></CardDoubleFace>
          }
         })
        
        }
        </div>
      </div>
      )

}
export default Cards;