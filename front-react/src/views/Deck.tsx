import React, { SyntheticEvent, useEffect, useState } from 'react';
import Header from '../components/Header';
import DeckSidebar from '../components/DeckSidebar';
import MainContent from '../components/MainContent';
import axios from "axios";
import SearchBar from '../components/SearchBar';

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

interface DeckProps {
  id: number;
  name: string;
  identity: string;
  cards: CardProps[];
  isPublic: boolean;
  commanderInfo: CardProps;
}


const Deck: React.FC = () => {
  document.title = "Mis Mazos";
  const token = localStorage.getItem("token");
  console.log(token);
  if (token == null) window.location.href = "/login";
  const [nameDecks, setNameDecks] = useState<{ id: number; name: string; identity: string, isPublic:boolean, commander: CardProps }[]>([]);

  const [selectedDeck, setSelectedDeck] = useState<number | null>(null);
  const [cards, setCards] = useState<CardProps[]>([]);
  const api: string = "http://localhost:8080";

  const [decks, setDecks] = useState<DeckProps[]>([]);

  const [commander, setCommander] = useState<CardProps>();
  let commanderInfo: any;

  const [results, setResults] = useState<CardProps[] | null>(null);

  const handleChangeSerchBar = (cards: CardProps[]) => {
    setResults(cards);
  };

  function addCardToDeck(idCard: string) {

    console.log("sum " + idCard);
    axios
      .get(api + "/decks/" + selectedDeck + "/card/" + idCard, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        if (response.status == 200 && response.data != "") {
          //Add card to deck
          const clonCards = [...cards];
          clonCards.push(response.data.card);
          setCards(clonCards);
          
          const deckWithoutChanges = decks.find(deck => deck.id === selectedDeck);
          deckWithoutChanges?.cards.push(response.data.card);
          if (deckWithoutChanges !== undefined) {
            const clondDecks = [...decks]
            clondDecks.push(deckWithoutChanges);
            setDecks(clondDecks);
          }
          console.log("selecteeedddddd: "+selectedDeck);
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching decks:", error);
      });

  }

  function removeCardToDeck(idCard: string) {
    const token = localStorage.getItem("token")!;
    console.log("rest " + idCard);
    axios
      .delete(api + "/decks/" + selectedDeck + "/card/" + idCard, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        if (response.status == 200 && response.data != "") {
          const clonCards = cards.filter((card) => card.id !== idCard);
          setCards(clonCards);
          
          const deckWithoutChanges = decks.find(deck => deck.id === selectedDeck);
          if (deckWithoutChanges) {
            deckWithoutChanges.cards = clonCards;
            const clondDecks = [...decks]
            clondDecks.push(deckWithoutChanges);
            setDecks(clondDecks);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching decks:", error);
      });

  }

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
        console.log("dataaaaaaaaaaaa");
        console.log(response.data);
        setDecks(fullDecks);
        const deckSimple = response.data.map((deck: any) => ({
          id: deck.id,
          name: deck.name,
          identity: deck.identity,
          commander: deck.commanderInfo,
          isPublic: deck.isPublic,
        }));
        console.log("------DecksSimple------");
        console.log(decks);
        console.log("-----------------");
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

    setSelectedDeck(deckId);
    const selected = decks.find((d) => d.id === deckId);
    if (selected) {
      setCards(selected.cards);
      setCommander(selected.commanderInfo);
      console.log(cards);
    }

  };

  const handleCardToDeck = (cardId: string, action: string) => {

    if (action == "sum") addCardToDeck(cardId);

    else removeCardToDeck(cardId);
  }

  console.log("------nameDecks------");
  console.log(nameDecks);
  console.log("-----------------");

  return (
    <div className="min-h-screen bg-gray-950 text-white" style={{ backgroundColor: "#2B2A2A", height: "100%" }}>
      <Header />
      <div className="flex" style={{ display: "grid", gridTemplateColumns: "0.1fr 1fr", width: "99%" }}>
        <DeckSidebar decks={nameDecks} onSelect={handleSelectDeck} />
        <div className="contentCards">
          <SearchBar resultForParent={handleChangeSerchBar} />
          <MainContent results={results} selected={cards} commander={commander} resultForParent={handleCardToDeck} id={selectedDeck}/>
        </div>
      </div>
    </div>
  );
};

export default Deck;
