import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Deck from '../views/Deck';

interface DeckItemProps {
  id: number;
  name: string;
  colors: string;
  commander: CardProps;
  onClick: () => void;
}

interface CardProps {
  id: string;
  name: string;
  mana_cost: string;
};

const DeckItem: React.FC<DeckItemProps> = ({ id, name, colors, commander, onClick }) => {
  let identity: string[] = [];
  const token = localStorage.getItem("token")!;
  const api: string = "http://localhost:8080";

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

  function showFormToEdit() {
    let commandersList: CardProps[] = [];
    Swal.fire({
      title: 'Editar Deck',
      html: `<div id="swal-form-container" style="display: flex; flex-direction: column; gap: 1rem; text-align: left;">
              <label>Nombre del deck</label>
              <input className='swal2-input' id='deck-name' placeholder='${name}'
              <label>Nombre del comandante</label>
              <input list="commander-list" className='swal2-input' id='commander-name' placeholder='${commander.name}'/>
              <datalist id="commander-list"></datalist>
              <p style="color: red; font-size:14">⚠️ Advertencia: Al cambiar de comandante, se eliminarán automáticamente todas las cartas que no compartan la identidad de color del nuevo comandante.</p>
            </div>`,
      didOpen: () => {
        const input: HTMLInputElement = document.getElementById("commander-name") as HTMLInputElement;
        const datalist: HTMLDataListElement = document.getElementById("commander-list") as HTMLDataListElement;
        let timer: ReturnType<typeof setTimeout>;

        input?.addEventListener("input", (e: Event) => {
          const target = e.target as HTMLInputElement;
          const value = target.value;

          if (timer) clearTimeout(timer);

          timer = setTimeout(() => {
            console.log(value);

            axios.get(api + "/cards/legendary/card?name=" + value)
              .then((response: any) => {

                if (response.status == 200) {
                  datalist.innerHTML = "";
                  const newCards = response.data as CardProps[];
                  //setCommandersList(newCards);
                  commandersList = response.data as CardProps[];
                  response.data.map((card: CardProps) => {
                    let data = document.createElement("option");
                    data.value = card.name;
                    data.id = card.id;
                    console.log(card);
                    datalist.appendChild(data);
                  });

                }
              });
          }, 100);
        });
        console.log("diossssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
        console.log(commandersList);
      },
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',

      preConfirm: () => {
        const nameInput = (document.getElementById('deck-name') as HTMLInputElement).value;
        const commanderInput: HTMLInputElement = document.getElementById('commander-name') as HTMLInputElement;

        const selectedName = commanderInput.value;
        const commanderCard = commandersList.find(card => card.name === selectedName);
        //const commanderCard = commandersList.find(card => card.name == commanderInput.value);
        console.log("commander card: "+commanderCard);
        console.log(commandersList);
        if (!commanderInput.value || !nameInput) {
          Swal.showValidationMessage('Ambos campos son obligatorios');
          return false;
        }
        return { name: nameInput, commander: commanderCard };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("cosassssssssssssss");
        console.log(result.value.name);
        console.log(result.value);

        let newIdentity:String = setInversIdentity(result.value.commander.color_identity);
        console.log(newIdentity)
        axios.put(api + "/decks/edit/" + id, {
          id: id,
          name: result.value.name,
          commander: result.value.commander.id,
          identity: newIdentity
        }, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }).then(response => {
            if(response.status == 200) window.location.reload();
          }
          );
        console.log("confirm");
      }
    });
  }


  identity = setIdentity(colors);
  return (
    <>
      <div className="bg-gray-800 p-2 rounded cursor-pointer" onClick={onClick}>
        <p>{name}</p>
        <div className='identityColor'>
          {identity.map(color =>
            <img src={color} height={"30rem"} key={color} />
          )}

        </div>
      </div>
      <button onClick={() => showFormToEdit()}>Edit</button>
    </>
  );
}

export default DeckItem;
