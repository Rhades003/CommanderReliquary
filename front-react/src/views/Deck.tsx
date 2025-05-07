import React, { SyntheticEvent, useEffect, useState } from 'react';
import Header from '../components/Header';
import DeckSidebar from '../components/DeckSidebar';
import MainContent from '../components/MainContent';
import axios from "axios";

const Deck: React.FC = () => {
  const [nameDecks, setNameDecks] = useState<{ id: number; name: string; identity: string }[]>([]);

  const api: string = "http://localhost:8080";

  const [decks, setDecks] = useState<any[]>([]);

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
        }
      })
      .catch((error) => {
        console.error("Error fetching decks:", error);
      });
  }, []);

  const [selectedDeck, setSelectedDeck] = useState<number | null>(null);
  const [cards, setCards] = useState<any[]>([]);

  const handleSelectDeck = (deckId: number) => {
    //console.log("aaaaaaaaaaa");
    
    setSelectedDeck(deckId);
    const selected = decks.find((d) => d.id === deckId);
    if (selected) {
      setCards(selected.cards);
      console.log(cards);
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="flex">
        <DeckSidebar decks={nameDecks} onSelect={handleSelectDeck} />

        <MainContent results={[]} selected={cards} />
      </div>
    </div>
  );
};

export default Deck;
