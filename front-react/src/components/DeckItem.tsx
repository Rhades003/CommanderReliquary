import React from 'react';

interface DeckItemProps {
  name: string;
  colors: string;
  onClick: () => void;
}

const DeckItem: React.FC<DeckItemProps> = ({ name, colors, onClick }) => (
  <div className="bg-gray-800 p-2 rounded cursor-pointer" onClick={onClick}>
    <p>{name}</p>
    <span>{colors}</span>
  </div>
);

export default DeckItem;
