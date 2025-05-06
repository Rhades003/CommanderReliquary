import React from 'react';
import CardSimple from './CardSimple';

interface CardData {
  id: string;
  img: string;
  title: string;
}

interface CardGridProps {
  title: string;
  cards: CardData[];
}

const CardGrid: React.FC<CardGridProps> = ({ title, cards }) => (
  <section className="flex-1">
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <div className="grid grid-cols-3 gap-2">
      {cards.map(card => (
        <CardSimple key={card.id} {...card} />
      ))}
    </div>
  </section>
);

export default CardGrid;
