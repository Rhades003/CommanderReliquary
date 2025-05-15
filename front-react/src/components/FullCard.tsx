interface CardProps {
    id: string;
    name: string;
    mana_cost: string;
    color_identity: string[];
    rarity: string;
    type_line: string;
    oracle_text: string;
    image_uris: {
        small: string;
        normal: string;
        large: string;
        png: string;
    };
}

interface CardDoubleFaceProps {
    card: {
        id: string;
        name: string;
        mana_cost: string;
        color_identity: string[];
        rarity: string;
        type_line: string;
        oracle_text: string;
        image_uris: {
            small: string;
            normal: string;
            large: string;
            png: string;
        };
        card_faces: [CardProps, CardProps];
    };
}
type FullCardProps = {
  card: CardProps | CardDoubleFaceProps['card'];
};

const FullCard: React.FC<FullCardProps> = ({ card }) => {

  function isDoubleFace(card: any): card is CardDoubleFaceProps['card'] {
    return card && 'card_faces' in card;
  }

    
    //console.log("---------------");
    console.log(card);
    if (!isDoubleFace(card)) {

        return (
            <>
                <div className="MainContent">
                    <div id="img">
                        <img src={card.image_uris.large} alt={card.id} />
                    </div>
                    <div id="info">
                        <h1>{card.name}</h1>
                        <div id="colors">
                            {card.color_identity.map(color => {
                                console.log(color);
                                if (color == "W") return <img src="/identityColors/W.svg" alt={color} style={{height:"10rem"}}/>
                                if (color == "U") return <img src="/identityColors/U.svg" alt={color} style={{height:"10rem"}}/>
                                if (color == "B") return <img src="/identityColors/B.svg" alt={color} style={{height:"10rem"}}/>
                                if (color == "R") return <img src="/identityColors/R.svg" alt={color} style={{height:"10rem"}}/>
                                if (color == "G") return <img src="/identityColors/G.svg" alt={color} style={{height:"10rem"}}/>
                            })}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    else {
        return (<></>);
    }


}

export default FullCard;