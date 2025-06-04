import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { useParams } from 'react-router';
import CardGrid from '../components/CardGrid';
interface DeckProps {
  id: number;
  name: string;
  identity: string;
  cards: CardProps[];
  public: boolean;
  commanderInfo: CardProps;
}

interface CardProps {
  id: string;
  name: string;
  mana_cost: string;
  rarity: string;
  set: string;
  type_line: string;
  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
  };
}

const api: string = "http://localhost:8080";

const Decks = () => {
    
    const [cards, setCards] = useState<CardProps[]>([]);
    const [commander, setCommander] = useState<CardProps>();
    const [iterator, setIterator] = useState<number>(0);
    const [titleDeck, setTitleDeck] = useState<string>("");

    const path = window.location.pathname;
    const params  = useParams<{ id: string }>();
    console.log(path);
    console.log(params);
    console.log(api+"/decks/getDeck/"+params.id);

     if(iterator == 0){
    axios.get(api+"/decks/getDeck/"+params.id)
      .then((response: any) => {
        setIterator(1);
        if (response.status == 200) {
            console.log("data");
          console.log(response.data);
          console.log(response.status)
            const decksResponse = response.data as DeckProps;
            console.log("------deckResponde------");
            console.log(decksResponse);
            setCards(decksResponse.cards);
            setCommander(decksResponse.commanderInfo);
           setTitleDeck(decksResponse.name);
                
        }
      });
    }
    document.title = titleDeck;
  return (
    <>
    <Header />
    <div style={{display: "flex", }}>
    <h1 style={{margin: "1rem", color:"#858585"}}>{titleDeck}</h1>
    <h1 style={{margin: "1rem", color:"#fff", justifySelf: 'flex-end'}}>Cartas totales: {cards.length+1}</h1>
    </div>
    <CardGrid title={titleDeck} commander={commander} cards={cards}/>
    </>
  )

}
export default Decks;