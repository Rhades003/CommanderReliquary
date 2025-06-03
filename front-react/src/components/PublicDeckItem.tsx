
interface CardProps {
  id: string;
  name: string;
  mana_cost: string;
  rarity: string;
  set: string;
  type_line: string;
  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
  };
}

interface DeckProps {
  id: number;
  name: string;
  identity: string;
}

const PublicDeckItem: React.FC<DeckProps> = ({ id, name, identity }) => {

  const local: string = "http://localhost:3000";

  function setIdentity(colors: string) {
    if (colors == "white") return ['/identityColors/W.svg'];
    if (colors == "blue") return ['/identityColors/U.svg'];
    if (colors == "black") return ['/identityColors/B.svg'];
    if (colors == "red") return ['/identityColors/R.svg'];
    if (colors == "green") return ['/identityColors/G.svg'];

    if (colors == "azorius") return ['/identityColors/W.svg', '/identityColors/U.svg'];
    if (colors == "dimir") return ['/identityColors/U.svg', '/identityColors/B.svg'];
    if (colors == "rakdos") return ['/identityColors/B.svg', '/identityColors/R.svg'];
    if (colors == "gruul") return ['/identityColors/R.svg', '/identityColors/G.svg'];
    if (colors == "selesnya") return ['/identityColors/G.svg', '/identityColors/W.svg'];
    if (colors == "orzhov") return ['/identityColors/W.svg', '/identityColors/B.svg'];
    if (colors == "izzet") return ['/identityColors/A.webp', '/identityColors/R.svg'];
    if (colors == "golgari") return ['/identityColors/G.svg', '/identityColors/B.svg'];
    if (colors == "boros") return ['/identityColors/R.svg', '/identityColors/W.svg'];
    if (colors == "simic") return ['/identityColors/G.svg', '/identityColors/U.svg'];

    if (colors == "esper") return ['/identityColors/W.svg', '/identityColors/U.svg', '/identityColors/B.svg'];
    if (colors == "grixis") return ['/identityColors/U.svg', '/identityColors/B.svg', '/identityColors/R.svg'];
    if (colors == "jund") return ['/identityColors/B.svg', '/identityColors/R.svg', '/identityColors/G.svg'];
    if (colors == "naya") return ['/identityColors/R.svg', '/identityColors/G.svg', '/identityColors/W.svg'];
    if (colors == "bant") return ['/identityColors/G.svg', '/identityColors/W.svg', '/identityColors/U.svg'];
    if (colors == "abzan") return ['/identityColors/W.svg', '/identityColors/B.svg', '/identityColors/G.svg'];
    if (colors == "jeskai") return ['/identityColors/A.webp', '/identityColors/R.svg', '/identityColors/W.svg'];
    if (colors == "sultai") return ['/identityColors/G.svg', '/identityColors/B.svg', '/identityColors/A.webp'];
    if (colors == "mardu") return ['/identityColors/R.svg', '/identityColors/W.svg', '/identityColors/B.svg'];
    if (colors == "temur") return ['/identityColors/G.svg', '/identityColors/U.svg', '/identityColors/R.svg'];


    if (colors == "yore-tiller") return ['/identityColors/W.svg', '/identityColors/U.svg', '/identityColors/B.svg', '/identityColors/R.svg'];
    if (colors == "glint-eye") return ['/identityColors/U.svg', '/identityColors/B.svg', '/identityColors/R.svg', '/identityColors/G.svg'];
    if (colors == "dune-brood") return ['/identityColors/B.svg', '/identityColors/R.svg', '/identityColors/G.svg', '/identityColors/W.svg'];
    if (colors == "ink-trader") return ['/identityColors/R.svg', '/identityColors/G.svg', '/identityColors/W.svg', '/identityColors/A.webp'];
    if (colors == "witch-maw") return ['/identityColors/G.svg', '/identityColors/W.svg', '/identityColors/U.svg', '/identityColors/B.svg'];

    if (colors == "pentacolor") return ['/identityColors/W.svg', '/identityColors/U.svg', '/identityColors/B.svg', '/identityColors/R.svg', '/identityColors/G.svg'];
    else return ["error"]
  }

  function goTo(id:number){
    window.location.href = local+"/public/deck/"+id;
  }
    let identityArray:string[] = setIdentity(identity);

     return (
    <div style={{ 
      backgroundColor: "#1D1D1D",
      padding: "1rem",
      borderRadius: "0.5rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    }}
    onClick={() => goTo(id)}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "1rem",
        minHeight: "60px"
      }}>
        <h4 style={{ 
          color: "#E2E8F0", 
          margin: "0",
          fontSize: "1.1rem",
          fontWeight: "500",
        }}>{name}</h4>
      </div>
      <div style={{ 
        display: "flex", 
        gap: "8px",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {identityArray.map(color => (
          <img 
            src={color} 
            height="30" 
            width="30" 
            key={color} 
            style={{ borderRadius: "50%" }}
            alt="Color identity"
          />
        ))}
      </div>
    </div>
  );
}

export default PublicDeckItem;
/**
 * 
 */