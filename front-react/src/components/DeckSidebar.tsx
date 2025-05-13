import React from 'react';
import ColorCheckbox from './ColorCheckbox';
import DeckItem from './DeckItem';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ax } from 'react-router/dist/development/route-data-Cw8htKcF';

interface DeckSidebarProps {
  decks: {
    id: number;
    name: string;
    identity: string;
    commander: CardProps;
  }[];
  onSelect: (deckId: number) => void;
}

interface CardProps {
  id: string;
  name: string;
  mana_cost: string;
};

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

const DeckSidebar: React.FC<DeckSidebarProps> = ({ decks, onSelect }) => {
  if (!decks) return null;
  let commandersList: CardProps[] = [];
  const token = localStorage.getItem("token")!;
  const api: string = "http://localhost:8080";
  function createDeck() {
    Swal.fire({

      title: 'Crear Deck',
      customClass: {
        popup: 'swal-dark',
        confirmButton: 'btnPurple',
      },
      html: `<div id="" style="display: flex; flex-direction: column; gap: 1rem; text-align: left;">
              <label>Nombre del deck</label>
              <input class='search-input swal-input' id='deck-name'/>
              <label>Nombre del comandante</label>
              <input list="commander-list" class='search-input swal-input' id='commander-name'/>
              <datalist id="commander-list"></datalist>
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
        console.log("commander card: ");
        console.log(commanderCard);
        if (!commanderInput.value || !nameInput) {
          Swal.showValidationMessage('Ambos campos son obligatorios');
          return false;
        }
        return { name: nameInput, commander: commanderCard };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.value.name);
        console.log(result.value.commander);

        let newIdentity: String = setInversIdentity(result.value.commander.color_identity);
        axios.post(api + "/decks/createDeck", {
          name: result.value.name,
          commander: result.value.commander.id,
          identity: newIdentity,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(response => {
          if (response.status == 200) window.location.reload();
        })
      }
      //window.location.reload();
    });

  }

  return (
    <aside style={{ paddingLeft: "2rem", paddingRight: "1.5rem", minWidth: "14rem"}}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ color: " #ffffff" }}>Decks</h2>
        <button className="btnPurple" onClick={() => createDeck() } style={{padding: "8px 16px"}}>Create</button>
      </div>
      <div style={{ width: "90%", border: "solid 1px #858585", alignSelf: "center" }}></div>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "1rem" }}>
        {decks.map((deck, i) => (
          <DeckItem
            key={i}
            name={deck.name}
            colors={deck.identity}
            commander={deck.commander}
            id={deck.id}
            onClick={() => onSelect(deck.id)}
          />
        ))}

      </div>
    </aside>
  );
};

export default DeckSidebar;
