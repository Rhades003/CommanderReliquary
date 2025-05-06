import React from 'react';
import CardGrid from './CardGrid';
import Card from './Card';

interface CardData {
  id: string;
  img: string;
  title: string;
}

interface MainContentProps {
  results: CardData[];
  selected: CardData[];
}

const MainContent: React.FC<MainContentProps> = ({ results, selected }) => (
  <main className="flex w-full gap-4 p-4">
    <CardGrid title="Search Results" cards={results} />
    <CardGrid title="Commander" cards={selected} />
  </main>
);

export default MainContent;
