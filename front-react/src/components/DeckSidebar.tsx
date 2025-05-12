import React from 'react';
import ColorCheckbox from './ColorCheckbox';
import DeckItem from './DeckItem';

interface DeckSidebarProps {
  decks: {
    id: number;
    name: string;
    identity: string;
    commander: CardProps;
  }[];
  onSelect: (deckId: number) => void;
}

interface CardProps {
  id:string;
  name:string;
  mana_cost:string;
};
const DeckSidebar: React.FC<DeckSidebarProps> = ({ decks, onSelect }) => {
  if (!decks) return null;
  return (
    <aside className="w-1/5 bg-gray-900 text-white p-4">
      <h2 className="text-lg font-semibold mb-2">Decks</h2>
      <input type="text" placeholder="Name" className="w-full mb-2 p-1" />
      <div className="flex flex-wrap gap-1 mb-2">
        {['W', 'U', 'B', 'R', 'G'].map(color => (
          <ColorCheckbox key={color} color={color} />
        ))}
      </div>
      <button className="bg-purple-600 px-3 py-1 rounded text-white mb-4">Create</button>
      <div className="space-y-2">
      {decks.map((deck, i) => (
  <DeckItem
    key={i}
    name={deck.name}
    colors={deck.identity}
    commander={deck.commander}
    id={deck.id}
    onClick={() => onSelect(deck.id)}
  />
))}

      </div>
    </aside>
  );
};

export default DeckSidebar;
