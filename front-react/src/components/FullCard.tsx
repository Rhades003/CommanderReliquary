import { useState } from "react";

interface CardProps {
    id: string;
    name: string;
    mana_cost: string;
    color_identity: string[];
    rarity: string;
    type_line: string;
    oracle_text: string;
    keywords?: string[];
    power?: string | null;
    toughness?: string | null;
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

    const [face, setFace] = useState<number>(0);
    console.log(card);

    if (!isDoubleFace(card)) {
        const symbols: string[] = card.mana_cost.match(/\{(.*?)\}/g)?.map(s => s.slice(1, -1)) ?? [];
        let stats: string;

        if (card.power && card.toughness) stats = card.power + "/" + card.toughness;
        else stats = "";

        return (
            <div style={{ marginTop: "10rem", }}>
                <div className="MainContent" style={{ display: "flex", flexDirection: "row", gap: "2rem", padding: "2rem", paddingTop: "2rem", margin: "0 auto", width: "90%", maxWidth: "62rem", backgroundColor: "#1e1e1e", color: "white", borderRadius: "25px", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)", justifyContent: "center", alignItems: "center" }}>

                    <div style={{ flex: "1 1 300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={card.image_uris.large} alt={card.id} style={{ width: "100%", maxWidth: "30rem", height: "auto", borderRadius: "20px", objectFit: "cover", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)" }} />
                    </div>

                    <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", justifyContent: "start", gap: "1rem" }}>

                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                            <h1 style={{ margin: 0, fontSize: "2rem" }}>{card.name}</h1>
                            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>

                                {symbols.map((color, index) => {

                                    let path = color.includes("/") ? "/identityColors/"+color.replace("/", "")+".svg" : "/identityColors/"+color+".svg";

                                    return <img key={index} src={path} alt={color} style={{ height: "2.5rem" }} />
                                })}

                            </div>

                        </div>
                        <p style={{ fontSize: "1.2rem" }}>{card.type_line}</p>

                        {card.oracle_text.split("\n").map((line, index) => (
                            <span style={{ fontSize: "1.2rem" }} key={index}>
                                {line}
                                <br />
                            </span>
                        ))}

                        <p style={{ fontWeight: "bold", textTransform: "capitalize", fontSize: "1.2rem" }}>
                            {card.rarity}
                        </p>

                        <p style={{ fontSize: "1.2rem" }}>
                            {stats}
                        </p>
                    </div>
                </div>



            </div>
        );
    }
    else {
        const symbols: string[] = card.card_faces[0].mana_cost.match(/\{(.*?)\}/g)?.map(s => s.slice(1, -1)) ?? [];
        let stats: string;

        if (card.card_faces[0].power && card.card_faces[0].toughness) stats = card.card_faces[0].power + "/" + card.card_faces[0].toughness;
        else stats = "";


        function swapFace() {
            if (face == 0) setFace(1);
            else setFace(0)
        }
        return (
            <div style={{ marginTop: "10rem", }}>
                <div className="MainContent" style={{ display: "flex", flexDirection: "row", gap: "2rem", padding: "2rem", paddingTop: "2rem", margin: "0 auto", width: "90%", maxWidth: "62rem", backgroundColor: "#1e1e1e", color: "white", borderRadius: "25px", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)", justifyContent: "center", alignItems: "center" }}>

                    <div style={{ flex: "1 1 300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={card.card_faces[face].image_uris.large} alt={card.id} style={{ width: "100%", maxWidth: "30rem", height: "auto", borderRadius: "20px", objectFit: "cover", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)" }} />
                        <button onClick={() => swapFace()} style={{
                            position: "absolute",
                            bottom: "10rem",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 10,
                            background: "#ffffff",
                            color: "#000",
                            padding: "0.5rem 1rem",
                            borderRadius: "777px",
                            border: "none",
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.4)",
                            cursor: "pointer"
                        }}><img src="/imgs/exchange.svg" style={{height:"2rem"}}></img></button>
                    </div>

                    <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", justifyContent: "start", gap: "1rem" }}>

                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                            <h1 style={{ margin: 0, fontSize: "2rem" }}>{card.card_faces[face].name}</h1>
                            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>

                                {symbols.map((color, index) => {

                                    let path = color.includes("/") ? "/identityColors/"+color.replace("/", "")+".svg" : "/identityColors/"+color+".svg";

                                    return <img key={index} src={path} alt={color} style={{ height: "2.5rem" }} />
                                })}

                            </div>

                        </div>
                        <p style={{ fontSize: "1.2rem" }}>{card.card_faces[face].type_line}</p>

                        {card.card_faces[face].oracle_text.split("\n").map((line, index) => (
                            <span style={{ fontSize: "1.2rem" }} key={index}>
                                {line}
                                <br />
                            </span>
                        ))}

                        <p style={{ fontWeight: "bold", textTransform: "capitalize", fontSize: "1.2rem" }}>
                            {card.card_faces[face].rarity}
                        </p>

                        <p style={{ fontSize: "1.2rem" }}>
                            {stats}
                        </p>
                    </div>
                </div>



            </div>
        );
    }
}

export default FullCard;