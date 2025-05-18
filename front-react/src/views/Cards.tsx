import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import CardDoubleFace from '../components/CardDoubleFace';
import Header from '../components/Header';
import InputTextFilter from '../components/InputTextFilter';
import axios from 'axios';
import { useParams } from 'react-router';


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



const Cards = () => {

  const [cardList, setCardList] = useState<(CardProps | CardDoubleFaceProps['card'])[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const api: string = "http://localhost:8080";

  const params = useParams();
  console.log(params.index);

  const colors = [
    { code: "W", alt: "Blanco", src: "/identityColors/W.svg" },
    { code: "U", alt: "Azul", src: "/identityColors/U.svg" },
    { code: "B", alt: "Negro", src: "/identityColors/B.svg" },
    { code: "R", alt: "Rojo", src: "/identityColors/R.svg" },
    { code: "G", alt: "Verde", src: "/identityColors/G.svg" },
  ];

  const rarities = [
    { value: "common", label: "Común" },
    { value: "uncommon", label: "Infrecuente" },
    { value: "rare", label: "Rara" },
    { value: "mythic", label: "Mítica" }
  ];

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
    axios.post(api + "/cards/megaFilter/" + page,
      {
        "name": name,
        "pasive": pasive,
        "typeLine": typeLine,
        "setName": setName,
        "rarity": rarity,
        "colorIdentity": colorIdentity
      })
      .then((response: any) => {
        if (response.status == 200) {
          console.log(response.data);
          console.log(response.status)
          if (response.status == "200") {
            console.log(response.data.content);
            setCardList(response.data.content);
            setCurrentPage(response.data.pageable.pageNumber);
            setTotalPages(response.data.totalPages);
            console.log(totalPages);
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


  function changePage(page: string) {
    let form: HTMLFormElement = document.getElementById("formOnlyForFilters") as HTMLFormElement;

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
    axios.post(api + "/cards/megaFilter/" + page,
      {
        "name": name,
        "pasive": pasive,
        "typeLine": typeLine,
        "setName": setName,
        "rarity": rarity,
        "colorIdentity": colorIdentity
      })
      .then((response: any) => {
        if (response.status == 200) {
          console.log(response.data);
          console.log(response.status)
          if (response.status == "200") {
            console.log(response.data.content);
            setCardList(response.data.content);
            setCurrentPage(response.data.pageable.pageNumber);
            setTotalPages(response.data.totalPages);
            console.log(totalPages);
          }
          else {
            console.log("status: " + response.data.status);
            console.log("message: " + response.data.message);
          }

        }
      });

  }

  return (
    <div className="App">

      <Header />
      <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
        <form className="formOnlyForFilters" onSubmit={handleSubmit} style={{ marginTop: "3rem" }} id="formOnlyForFilters">
          <div className="input-group" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", alignItems: "center", width: "76%", margin: "0 auto", marginBottom: "3rem", textAlign: "justify" }}>
            <InputTextFilter id="name" name="name" label="Nombre de la carta" placeholder="Nombre" />
            <InputTextFilter id="pasive" name="pasive" label="Pasiva de la carta" placeholder="Pasiva" />
            <InputTextFilter id="typeLine" name="typeLine" label="Tipo de la carta" placeholder="Tipo" />
            <InputTextFilter id="setName" name="setName" label="Expansión" placeholder="Nombre de la expansión" />
          </div>


          <div className="input-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", alignItems: "center", width: "70%", margin: "0 auto" }}>

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

            <div className="rarity">
              <label htmlFor="rarity" style={{ color: "#fff", marginBottom: "6px", display: "block", fontSize: "1.5rem" }} >Rareza de la carta</label>
              <select name="rarity" id="rarity" style={{ color: "#fff", backgroundColor: "#1e1e1e", padding: "8px" }}>
                <option value="">Selecciona una rareza</option>

                {rarities.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}

              </select>
            </div>


          </div>

          <div className="input-group">
            <button type="submit" className='btnPurple' style={{ padding: "10px 16px" }}>Buscar</button>
          </div>
        </form>
      </div>

      <div style={{ display: "flex", gap: "8px", width:"fit-content", margin: "0 auto"}}>
        {Array.from({ length: totalPages }).map((_, i) => {
          const isFirst = i === 0;
          const isLast = i === totalPages - 1;
          const inRange = i >= currentPage - 3 && i <= currentPage + 3;

          if (isFirst) {
            return (
              <a key={i} onClick={() => changePage(i.toString())}>
                <p style={{fontWeight: i === currentPage ? 'bold' : 'normal', textDecoration: i === currentPage ? 'underline' : 'none', color:"white"}}>{"<<"}</p>
              </a>
            );
          }
          if (inRange) {
            return (
              <a key={i} onClick={() => changePage(i.toString())}>
                <p style={{fontWeight: i === currentPage ? 'bold' : 'normal', textDecoration: i === currentPage ? 'underline' : 'none', color:"white"}}>{i}</p>
              </a>
            );
          }
          if (isLast) {
            return (
              <a key={i} onClick={() => changePage(i.toString())}>
                <p style={{fontWeight: i === currentPage ? 'bold' : 'normal', textDecoration: i === currentPage ? 'underline' : 'none', color:"white"}}>{">>"}</p>
              </a>
            );
          }

          return null;
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px", width:"fit-content", margin: "0 auto"}}>
        {cardList.map((card: any) => {
          if ('image_uris' in card && card.image_uris !== null) {
            return <Card key={card.id} card={card} />;
          } else {
            return <CardDoubleFace key={card.id} card={card} />;
          }
        })}
      </div>
    </div>
  )

}
export default Cards;