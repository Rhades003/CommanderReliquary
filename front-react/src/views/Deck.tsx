import React from 'react';
import Header from '../components/Header';
import DeckSidebar from '../components/DeckSidebar';
import MainContent from '../components/MainContent';

const Deck: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <div className="flex">
      <DeckSidebar decks={[]} />
        <MainContent results={[]} selected={[]} />
      </div>
    </div>
  );
};

export default Deck;
