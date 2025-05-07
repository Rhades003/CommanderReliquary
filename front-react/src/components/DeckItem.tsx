import React from 'react';

interface DeckItemProps {
  name: string;
  colors: string;
  onClick: () => void;
}

const DeckItem: React.FC<DeckItemProps> = ({ name, colors, onClick }) => {
  let identity: string[] = [];

  function setIdentity(colors: string) {
    if (colors == "white") return ['/identityColors/W.webp'];
    if (colors == "blue") return ['/identityColors/U.webp'];
    if (colors == "black") return ['/identityColors/B.webp'];
    if (colors == "red") return ['/identityColors/R.webp'];
    if (colors == "green") return ['/identityColors/G.webp'];

    if (colors == "azorius") return ['/identityColors/W.webp', '/identityColors/U.webp'];
    if (colors == "dimir") return ['/identityColors/U.webp', '/identityColors/B.webp'];
    if (colors == "rakdos") return ['/identityColors/B.webp', '/identityColors/R.webp'];
    if (colors == "gruul") return ['/identityColors/R.webp', '/identityColors/G.webp'];
    if (colors == "selesnya") return ['/identityColors/G.webp', '/identityColors/W.webp'];
    if (colors == "orzhov") return ['/identityColors/W.webp', '/identityColors/B.webp'];
    if (colors == "izzet") return ['/identityColors/A.webp', '/identityColors/R.webp'];
    if (colors == "golgari") return ['/identityColors/G.webp', '/identityColors/B.webp'];
    if (colors == "boros") return ['/identityColors/R.webp', '/identityColors/W.webp'];
    if (colors == "simic") return ['/identityColors/G.webp', '/identityColors/U.webp'];

    if (colors == "esper") return ['/identityColors/W.webp', '/identityColors/U.webp', '/identityColors/B.webp'];
    if (colors == "grixis") return ['/identityColors/U.webp', '/identityColors/B.webp', '/identityColors/R.webp'];
    if (colors == "jund") return ['/identityColors/B.webp', '/identityColors/R.webp', '/identityColors/G.webp'];
    if (colors == "naya") return ['/identityColors/R.webp', '/identityColors/G.webp', '/identityColors/W.webp'];
    if (colors == "bant") return ['/identityColors/G.webp', '/identityColors/W.webp', '/identityColors/U.webp'];
    if (colors == "abzan") return ['/identityColors/W.webp', '/identityColors/B.webp', '/identityColors/G.webp'];
    if (colors == "jeskai") return ['/identityColors/A.webp', '/identityColors/R.webp', '/identityColors/W.webp'];
    if (colors == "sultai") return ['/identityColors/G.webp', '/identityColors/B.webp', '/identityColors/A.webp'];
    if (colors == "mardu") return ['/identityColors/R.webp', '/identityColors/W.webp', '/identityColors/B.webp'];
    if (colors == "temur") return ['/identityColors/G.webp', '/identityColors/U.webp', '/identityColors/R.webp'];


    if (colors == "yore-tiller") return ['/identityColors/W.webp', '/identityColors/U.webp', '/identityColors/B.webp', '/identityColors/R.webp'];
    if (colors == "glint-eye") return ['/identityColors/U.webp', '/identityColors/B.webp', '/identityColors/R.webp', '/identityColors/G.webp'];
    if (colors == "dune-brood") return ['/identityColors/B.webp', '/identityColors/R.webp', '/identityColors/G.webp', '/identityColors/W.webp'];
    if (colors == "ink-trader") return ['/identityColors/R.webp', '/identityColors/G.webp', '/identityColors/W.webp', '/identityColors/A.webp'];
    if (colors == "witch-maw") return ['/identityColors/G.webp', '/identityColors/W.webp', '/identityColors/U.webp', '/identityColors/B.webp'];

    if (colors == "pentacolor") return ['/identityColors/W.webp', '/identityColors/U.webp', '/identityColors/B.webp', '/identityColors/R.webp', '/identityColors/G.webp'];
    else return ["error"]
  }

  identity = setIdentity(colors);
  return (
    <div className="bg-gray-800 p-2 rounded cursor-pointer" onClick={onClick}>
      <p>{name}</p>
      <div className='identityColor'>
        {identity.map(color =>
          <img src={color} height={"30rem"} />
        )}

      </div>
    </div>
  );
}

export default DeckItem;
