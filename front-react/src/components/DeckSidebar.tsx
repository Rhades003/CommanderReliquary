import React from 'react';
import ColorCheckbox from './ColorCheckbox';
import DeckItem from './DeckItem';
import axios from 'axios';
import Swal from 'sweetalert2';

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


const DeckSidebar: React.FC<DeckSidebarProps> = ({ decks, onSelect }) => {
  if (!decks) return null;
  let commandersList: CardProps[] = [];
  const token = localStorage.getItem("token")!;
  const api: string = "http://localhost:8080";
  function createDeck() {
    Swal.fire({
      title: 'Editar Deck',
      html: `<div id="swal-form-container" style="display: flex; flex-direction: column; gap: 1rem; text-align: left;">
              <label>Nombre del deck</label>
              <input className='swal2-input' id='deck-name'/>
              <label>Nombre del comandante</label>
              <input list="commander-list" className='swal2-input' id='commander-name'/>
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
 
        return {};
      }
    })
  }

  return (
    <aside className="w-1/5 bg-gray-900 text-white p-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold mb-2">Decks</h2>
        <button className="bg-purple-600 px-3 py-1 rounded text-white mb-4" onClick={() => createDeck()}>Create</button>
      </div>
      <div className="space-y-2">
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
