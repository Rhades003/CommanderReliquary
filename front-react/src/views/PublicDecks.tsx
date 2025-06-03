import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import InputTextFilter from '../components/InputTextFilter';
import axios from 'axios';
import { useParams } from 'react-router';
import PublicDeckItem from '../components/PublicDeckItem';

interface DeckProps {
  id: number;
  name: string;
  identity: string;
  public: boolean;
}

const api: string = "http://localhost:8080";

const Decks = () => {

  const [decks, setDecks] = useState<(DeckProps)[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>, page = "0") {
    event.preventDefault();

    let form = event.currentTarget;
    let formData = new FormData(form);

    let name = formData.get("name");
    let pasive = formData.get("pasive");
    let typeLine = formData.get("typeLine");
    let setName = formData.get("setName");
    let rarity = formData.get("rarity");

    let colorIdentity = [];
    let checkboxes = form.querySelectorAll('input[name="colorIdentity"]');

    for (let i = 0; i < checkboxes.length; i++) {
      let checkbox = checkboxes[i];
      if ((checkbox as HTMLInputElement).checked) {
        colorIdentity.push((checkbox as HTMLInputElement).value);
      }
    }
    let identity = setInversIdentity(colorIdentity);
    if(identity == "") identity = "*";

    axios.get(api + "/decks/getPublicDecks?name="+name+"&identity="+identity+"&page="+ page,)
      .then((response: any) => {
        if (response.status == 200) {
          console.log(response.data);
          console.log(response.status)
          if (response.status == "200") {
            console.log("name: "+name);
            console.log("name: "+identity);
            console.log("name: "+page);

            const decksResponse = response.data.content as DeckProps[];
            setDecks(decksResponse);
          }
          else {
            console.log("status: " + response.data.status);
            console.log("message: " + response.data.message);
          }

        }
      });

    console.log({
      name: name,
      pasive: pasive,
      typeLine: typeLine,
      setName: setName,
      rarity: rarity,
      colorIdentity: colorIdentity
    });
  }

    const colors = [
    { code: "W", alt: "Blanco", src: "/identityColors/W.svg" },
    { code: "U", alt: "Azul", src: "/identityColors/U.svg" },
    { code: "B", alt: "Negro", src: "/identityColors/B.svg" },
    { code: "R", alt: "Rojo", src: "/identityColors/R.svg" },
    { code: "G", alt: "Verde", src: "/identityColors/G.svg" },
  ];

  function setInversIdentity(colors: String[]) {
    console.log(colors);
    if (colors.length === 5) return "pentacolor";

    if (colors.length === 1) {
      if (colors.includes("W")) return "white";
      if (colors.includes("U")) return "blue";
      if (colors.includes("B")) return "black";
      if (colors.includes("R")) return "red";
      if (colors.includes("G")) return "green";
    }

    if (colors.length === 2) {
      if (colors.includes("W") && colors.includes("U")) return "azorius";
      if (colors.includes("U") && colors.includes("B")) return "dimir";
      if (colors.includes("B") && colors.includes("R")) return "rakdos";
      if (colors.includes("R") && colors.includes("G")) return "gruul";
      if (colors.includes("G") && colors.includes("W")) return "selesnya";
      if (colors.includes("W") && colors.includes("B")) return "orzhov";
      if (colors.includes("U") && colors.includes("R")) return "izzet";
      if (colors.includes("B") && colors.includes("G")) return "golgari";
      if (colors.includes("R") && colors.includes("W")) return "boros";
      if (colors.includes("G") && colors.includes("U")) return "simic";
    }

    if (colors.length === 3) {
      if (colors.includes("W") && colors.includes("U") && colors.includes("B")) return "esper";
      if (colors.includes("U") && colors.includes("B") && colors.includes("R")) return "grixis";
      if (colors.includes("B") && colors.includes("R") && colors.includes("G")) return "jund";
      if (colors.includes("R") && colors.includes("G") && colors.includes("W")) return "naya";
      if (colors.includes("G") && colors.includes("W") && colors.includes("U")) return "bant";
      if (colors.includes("W") && colors.includes("B") && colors.includes("G")) return "abzan";
      if (colors.includes("W") && colors.includes("U") && colors.includes("R")) return "jeskai";
      if (colors.includes("U") && colors.includes("B") && colors.includes("G")) return "sultai";
      if (colors.includes("W") && colors.includes("B") && colors.includes("R")) return "mardu";
      if (colors.includes("U") && colors.includes("R") && colors.includes("G")) return "temur";
    }

    if (colors.length === 4) {
      if (colors.includes("W") && colors.includes("U") && colors.includes("B") && colors.includes("R")) return "yore-tiller";
      if (colors.includes("U") && colors.includes("B") && colors.includes("R") && colors.includes("G")) return "glint-eye";
      if (colors.includes("B") && colors.includes("R") && colors.includes("G") && colors.includes("W")) return "dune-brood";
      if (colors.includes("R") && colors.includes("G") && colors.includes("W") && colors.includes("U")) return "ink-trader";
      if (colors.includes("G") && colors.includes("W") && colors.includes("U") && colors.includes("B")) return "witch-maw";
    }
    return "";
  }

  return (
    <div className="App">

      <Header />
      <div style={{ width: '100%', flexWrap: 'wrap' }}>
        <form className="formOnlyForFilters" onSubmit={handleSubmit} style={{ marginTop: "3rem" }} id="formOnlyForFilters">
          <div className="input-group" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", alignItems: "center", width: "76%", margin: "0 auto", marginBottom: "3rem", textAlign: "justify" }}>
            <InputTextFilter id="name" name="name" label="Nombre del mazo" placeholder="Nombre" />

            <div className='identity'>
              <label style={{ fontWeight: "600", marginBottom: "8px", display: "block", fontSize: "1.5rem" }}>Identidad del comandante</label>
              <div className="input-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>

                {colors.map(({ code, alt, src }) => (
                  <label key={code} style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "4px", }}>
                    <input type="checkbox" name="colorIdentity" value={code} />
                    <img src={src} alt={alt} width={24} height={24} style={{ display: "block" }} />
                  </label>
                ))}
              </div>
            </div>
            <div className="input-group">
              <button type="submit" className='btnPurple' style={{ padding: "10px 16px" }}>Buscar</button>
            </div>

            
          </div>
        </form>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px", width:"fit-content", margin: "0 auto", paddingTop: "2rem"}}>
        
           <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px", padding: "20px 0"
      }}>
        {decks.map((deck: DeckProps) => (
          <PublicDeckItem 
            key={deck.id}
            id={deck.id} 
            name={deck.name} 
            identity={deck.identity}
          />
        ))}
      </div>

      </div>
    </div>
    </div>
  )

}
export default Decks;