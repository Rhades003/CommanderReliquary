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
  card_faces?: [CardProps, CardProps];
};

interface CardGridProps {
  title: string;
  cards: CardProps[] | null;
  commander?: CardProps;
  resultForParent?: (cardId: string, action: string) => void;
  //searchResult: boolean;
}

const CardGrid: React.FC<CardGridProps> = ({ title, cards, commander, resultForParent }) => {
  console.log("fukin commadner");
  console.log(cards);
  if (!cards) return null;
  if(commander){
  return(
  <section className="flex-1">
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <div className="grid grid-cols-3 gap-2" style={{display: "grid", gridTemplateColumns:"auto auto auto auto"}}>
      <CardSimple id={commander.id} image_uris={commander.image_uris} name={commander.name} mana_cost={commander.mana_cost} rarity={commander.rarity} type_line={commander.type_line} isCommander={true}/>
      {cards.map((card) => {
        console.log("Fukin kRAKEN")
        console.log(card);
          if (card.card_faces) {
            console.log(card.card_faces[0].image_uris);
            return (
              <>
                <CardSimple key={card.id} id={card.card_faces[0].id} image_uris={card.card_faces[0].image_uris} name={card.card_faces[0].name} mana_cost={card.card_faces[0].mana_cost} rarity={card.card_faces[0].rarity}  type_line={card.card_faces[0].type_line} action={"rest"} resultForParent={resultForParent}/>
              </>
            );
          } else {
            console.log(card);
            return (
              <CardSimple key={card.id} id={card.id} image_uris={card.image_uris} name={card.name} mana_cost={card.mana_cost} rarity={card.rarity} type_line={card.type_line} action={"rest"} resultForParent={resultForParent}/>
            );
          }
        })}
    </div>
  </section>
  )
}
else {
  return(
    <section className="flex-1">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <div className="grid grid-cols-3 gap-2" style={{display: "grid", gridTemplateColumns:"auto auto auto auto"}}>
      {cards.map((card) => {
        console.log("Fukin kRAKEN")
        console.log(card);
          if (card.card_faces) {
            console.log(card.card_faces[0].image_uris);
            return (
              <>
                <CardSimple key={card.id} id={card.card_faces[0].id} image_uris={card.card_faces[0].image_uris} name={card.card_faces[0].name} mana_cost={card.card_faces[0].mana_cost} rarity={card.card_faces[0].rarity}  type_line={card.card_faces[0].type_line} action={"sum"} resultForParent={resultForParent}/>
              </>
            );
          } else {
            console.log(card);
            return (
              <CardSimple key={card.id} id={card.id} image_uris={card.image_uris} name={card.name} mana_cost={card.mana_cost} rarity={card.rarity} type_line={card.type_line} action={"sum"} resultForParent={resultForParent}/>
            );
          }
        })}
      </div>
    </section>
    )
}
};

export default CardGrid;
