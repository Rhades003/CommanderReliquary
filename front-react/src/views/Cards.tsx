import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import CardDoubleFace from '../components/CardDoubleFace';
import Header from '../components/Header';
import InputTextFilter from '../components/InputTextFilter';
import axios from 'axios';


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

  const [cardList, setCardList] = useState<(CardProps | CardDoubleFaceProps['card'])[]>([])

  //const [cardList, setCardList] = useState<any[]>([]);
  const api: string = "http://localhost:8080";
  /*useEffect(() => {
    const obtenerCartas = async () => {
      const res = await fetch('http://localhost:8080/cards/getAllCards/1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      const data = await res.json();
      console.log(data)
      setCardList([...data.content]);

    }

    obtenerCartas();

  }, []); */

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
    { value: "mythic", label: "Mítica" },
    { value: "token", label: "Token" },
    { value: "land", label: "Tierra" },
  ];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    var form = event.currentTarget;
    var formData = new FormData(form);

    var name = formData.get("name");
    var pasive = formData.get("pasive");
    var typeLine = formData.get("typeLine");
    var setName = formData.get("setName");
    var rarity = formData.get("rarity");

    var colorIdentity = [];
    var checkboxes = form.querySelectorAll('input[name="colorIdentity"]');

    for (var i = 0; i < checkboxes.length; i++) {
      var checkbox = checkboxes[i];
      if ((checkbox as HTMLInputElement).checked) {
        colorIdentity.push((checkbox as HTMLInputElement).value);
      }
    }
    axios.post(api + "/cards/megaFilter",
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




  return (
    <div className="App">

      <Header />
      <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>

        {
          /*cardList.map((card, i) => {
            if ('image_uris' in card && card.image_uris !== null) {
              return <Card key={i} card={card}></Card>;
            } else {
              return <CardDoubleFace key={i} card={card}></CardDoubleFace>;
            }
           })
          */
        }
        <form className="formOnlyForFilters" onSubmit={handleSubmit} style={{ marginTop: "3rem" }}>
          <div className="input-group" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", alignItems: "center", width: "76%", margin: "0 auto", marginBottom: "3rem", textAlign: "justify" }}>
            <InputTextFilter id="name" name="name" label="Nombre de la carta" placeholder="Nombre" />
            <InputTextFilter id="pasive" name="pasive" label="Pasiva de la carta" placeholder="Pasiva" />
            <InputTextFilter id="typeLine" name="typeLine" label="Tipo de la carta" placeholder="Tipo" />
            <InputTextFilter id="setName" name="setName" label="Expansión" placeholder="Nombre de la expansión"/>
          </div>


          <div className="input-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", alignItems: "center", width: "70%", margin: "0 auto" }}>

            <div className='identity'>
              <label style={{ fontWeight: "600", marginBottom: "8px", display: "block", fontSize: "1.5rem" }}>
                Identidad del comandante
              </label>
              <div className="input-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                {colors.map(({ code, alt, src }) => (
                  <label
                    key={code}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      gap: "4px",
                    }}
                  >
                    <input type="checkbox" name="colorIdentity" value={code} />
                    <img
                      src={src}
                      alt={alt}
                      width={24}
                      height={24}
                      style={{ display: "block" }}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="rarity">
              <label htmlFor="rarity" style={{ color: "#fff", marginBottom: "6px", display: "block", fontSize: "1.5rem" }} >
                Rareza de la carta
              </label>
              <select
                name="rarity"
                id="rarity"
                style={{
                  color: "#fff",
                  backgroundColor: "#1e1e1e",
                  padding: "8px"
                }}
              >
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
            <button
              type="submit"
              className='btnPurple'
              style={{ padding: "10px 16px" }}
            >
              Buscar
            </button>
          </div>
        </form>
      </div>
       {cardList.map((card:any) => {
      if ('image_uris' in card && card.image_uris !== null) {
        return <Card key={card.id} card={card} />;
      } else {
        return <CardDoubleFace key={card.id} card={card} />;
      }
    })}
    </div>
  )

}
export default Cards;