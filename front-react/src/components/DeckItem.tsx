import React from 'react';

interface DeckItemProps {
  name: string;
  colors: string[];
}

const DeckItem: React.FC<DeckItemProps> = ({ name, colors }) => (
  <div className="bg-gray-800 p-2 rounded">
    <p>{name}</p>
    <div className="flex space-x-1">
      {colors.map((color, i) => (
        <span key={i}>{color}</span>
      ))}
    </div>
  </div>
);

export default DeckItem;
