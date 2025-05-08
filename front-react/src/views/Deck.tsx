import React, { SyntheticEvent, useEffect, useState } from 'react';
import Header from '../components/Header';
import DeckSidebar from '../components/DeckSidebar';
import MainContent from '../components/MainContent';
import axios from "axios";
import SearchBar from '../components/SearchBar';

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
};

const Deck: React.FC = () => {
  const [nameDecks, setNameDecks] = useState<{ id: number; name: string; identity: string }[]>([]);

  const api: string = "http://localhost:8080";

  const [decks, setDecks] = useState<any[]>([]);

  const [commander, setCommander] = useState<CardProps>();
  let commanderInfo:any;

  const [selectedDeck, setSelectedDeck] = useState<number | null>(null);
  const [cards, setCards] = useState<CardProps[]>([]);


  const [results, setResults] = useState<CardProps[] | null>(null);

  const handleChangeSerchBar = (cards: CardProps[]) => {
    console.log('Valor después del debounce:', cards);
    setResults(cards);
  };
  useEffect(() => {
    const token = localStorage.getItem("token")!;
    axios
      .get(api + "/decks/getDecks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        console.log(response.data);
        const fullDecks = response.data;
        setDecks(fullDecks);
        const deckSimple = fullDecks.map((deck: any) => ({
          id: deck.id,
          name: deck.name,
          identity: deck.identity,
        }));
        setNameDecks(deckSimple);
        if (fullDecks.length > 0) {
          const lastDeck = fullDecks[fullDecks.length - 1];
          setSelectedDeck(lastDeck.id);
          setCards(lastDeck.cards);
          setCommander(lastDeck.commanderInfo);
          commanderInfo = response.data.commanderInfo;
        }
      })
      .catch((error) => {
        console.error("Error fetching decks:", error);
      });
  }, []);

 

  const handleSelectDeck = (deckId: number) => {
    //console.log("aaaaaaaaaaa");
    
    setSelectedDeck(deckId);
    const selected = decks.find((d) => d.id === deckId);
    if (selected) {
      setCards(selected.cards);
      setCommander(selected.commanderInfo);
      console.log(cards);
    }
    
  };

  const handleCardToDeck = (cardId:string, action:string) => {
    if(action == "sum") console.log("sum "+cardId);
    else console.log("rest "+cardId);
  }

  console.log("commander?");
  console.log(commanderInfo);
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="flex" style={{display: "grid", gridTemplateColumns:"auto auto"}}>
        <DeckSidebar decks={nameDecks} onSelect={handleSelectDeck} />
        <div className="contentCards">
          <SearchBar resultForParent={handleChangeSerchBar}/>
          <MainContent results={results} selected={cards} commander={commander} resultForParent={handleCardToDeck}/>
        </div>
      </div>
    </div>
  );
};

export default Deck;
