import React from 'react';
import CardGrid from './CardGrid';
import Card from './Card';
import SearchBar from './SearchBar';

interface CardProps {
  id:string;
  name:string;
  mana_cost:string;
  rarity:string;
  set:string;
  type_line:string;
  image_uris: {
    small:string;
    normal:string;
    large:string;
    png:string;
  };
};

interface MainContentProps {
  results: CardProps[] | null;
  selected: CardProps[];
  commander?: CardProps;
  resultForParent?: (cardId: string, action: string) => void;
  id: number | null;
}



const MainContent: React.FC<MainContentProps> = ({ results, selected, commander, resultForParent, id }) => {
  function exportDeck(){
    console.log(selected);
    console.log(commander);
    
    let contenido = "1 ["+commander!.set.toUpperCase()+"] "+commander?.name+"\n";
    selected.forEach(card => {
      contenido = contenido+"1 ["+card!.set.toUpperCase()+"] "+card?.name+"\n";
    });
    
    const blob = new Blob([contenido], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = id+'.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url)
}

  return (
  <>
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <h1 style={{color:"#fff", paddingRight:"1rem"}}>Cartas totales: {selected.length+1}</h1>
    <button 
      className="btnExport" 
      style={{ marginTop: "0.3rem", marginRight:"1rem", width:"6rem"  }} 
      onClick={() => exportDeck()}>
      Export
    </button>
  </div>
  <main className="flex w-full gap-4 p-4" style={{display: "grid", gap: "1rem", gridTemplateColumns:"0.8fr 0.8fr", height: "84vh", overflow: "hidden", marginRight:"1rem"}}>

    <CardGrid title="Search Results" cards={results} resultForParent={resultForParent}/>
    <CardGrid title="Commander" cards={selected}  commander={commander} resultForParent={resultForParent}/>
  </main>
  </>
);
}

export default MainContent;
