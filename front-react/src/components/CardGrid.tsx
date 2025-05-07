import React from 'react';
import CardSimple from './CardSimple';
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

interface CardGridProps {
  title: string;
  cards: CardProps[];
  commander?: CardProps;
}

const CardGrid: React.FC<CardGridProps> = ({ title, cards, commander }) => {
  //console.log("fukin commadner");
  //console.log(commander);
  if(commander){
  return(
  <section className="flex-1">
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <div className="grid grid-cols-3 gap-2">
      <CardSimple id={commander.id} image_uris={commander.image_uris} name={commander.name} mana_cost={commander.mana_cost} rarity={commander.rarity} type_line={commander.type_line}></CardSimple>
      {cards.map(card => (
        <CardSimple key={card.id} id={card.id} image_uris={card.image_uris} name={card.name} mana_cost={card.mana_cost} rarity={card.rarity} type_line={card.type_line}/>
      ))}
    </div>
  </section>
  )
}
else {
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
}
};

export default CardGrid;
