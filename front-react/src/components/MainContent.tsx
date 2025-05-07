import React from 'react';
import CardGrid from './CardGrid';
import Card from './Card';

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

interface MainContentProps {
  results: CardProps[];
  selected: CardProps[];
}

const MainContent: React.FC<MainContentProps> = ({ results, selected }) => (
  <main className="flex w-full gap-4 p-4">
    <CardGrid title="Search Results" cards={results} />
    <CardGrid title="Commander" cards={selected} />
  </main>
);

export default MainContent;
