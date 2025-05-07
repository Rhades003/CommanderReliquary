import React from 'react';
import CardSimple from './CardSimple';

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

interface CardGridProps {
  title: string;
  cards: CardProps[];
}

const CardGrid: React.FC<CardGridProps> = ({ title, cards }) => {
  //console.log("carttukis");
  //console.log(cards);
  return(
  <section className="flex-1">
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <div className="grid grid-cols-3 gap-2">
      {cards.map(card => (
        <CardSimple key={card.id} id={card.id} image_uris={card.image_uris} name={card.name} mana_cost={card.mana_cost} rarity={card.rarity} type_line={card.type_line}/>
      ))}
    </div>
  </section>
  )
};

export default CardGrid;
