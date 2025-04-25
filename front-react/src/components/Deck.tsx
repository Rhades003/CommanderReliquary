import React from 'react'
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import CardDoubleFace from '../components/CardDoubleFace';
const axios = require('axios');

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
    image_uris: {
      small:string;
      normal:string;
      large:string;
      png:string;
    };
    card_faces: [CardProps, CardProps];
  };
}


interface DeckProps {
    deck: {
        id:bigint;
        name:string;
        identity:string;
        cards:CardDoubleFaceProps[];
    };
}
//:React.FC<any> 
const Deck= () => {

  let deckNull:DeckProps = {
    deck:{
      id:0n,
      name:"",
      identity:"",
      cards:[]
    }
  };
    const [deckModel, setDeckModel] = useState<DeckProps>(deckNull);
    
        useEffect(() => {
            const obtenerDeck = async () => {
              const res = await fetch('http://localhost:8080/decks/getDecks/1', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                mode: 'cors',
              });
              const data = await res.json();
              console.log(data)
              let deckResponse:DeckProps = data.content; 
              setDeckModel(deckResponse);
              
            }
      
            obtenerDeck();
      
          }, []);

    return (
    <>
    <div>
        {
            deckModel!.deck.cards.map((card:any, i:number) => {
                if ('image_uris' in card && card.image_uris !== null) {
                    return <Card key={i} card={card.card}></Card>;
                  } else {
                    return <CardDoubleFace key={i} card={card.card}></CardDoubleFace>;
                  }
            })
        }
    </div>
    </>
    );


}

export default Deck;