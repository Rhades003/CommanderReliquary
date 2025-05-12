import React from 'react';
import CardGrid from './CardGrid';
import Card from './Card';
import SearchBar from './SearchBar';

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
  results: CardProps[] | null;
  selected: CardProps[];
  commander?: CardProps;
  resultForParent?: (cardId: string, action: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ results, selected, commander, resultForParent }) => (
  <main className="flex w-full gap-4 p-4" style={{display: "grid", gap: "1rem", gridTemplateColumns:"1fr 1fr", height: "90vh", overflow: "hidden"}}>
    <CardGrid title="Search Results" cards={results} resultForParent={resultForParent}/>
    <CardGrid title="Commander" cards={selected}  commander={commander} resultForParent={resultForParent}/>
  </main>
);

export default MainContent;
