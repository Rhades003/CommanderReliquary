import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Deck from '../views/Deck';

interface DeckItemProps {
  id: number;
  name: string;
  colors: string;
  commander: CardProps;
  isPublic: boolean;
  onClick: () => void;
}

interface CardProps {
  id: string;
  name: string;
  mana_cost: string;
};

const DeckItem: React.FC<DeckItemProps> = ({ id, name, colors, commander, isPublic, onClick }) => {
  let identity: string[] = [];
  const token = localStorage.getItem("token")!;
  const api: string = "http://localhost:8080";

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
      customClass: {
        popup: 'swal-dark',
        confirmButton: 'btnPurple'
      },
      html: `<div id="swal-form-container" style="display: flex; flex-direction: column; gap: 1rem; text-align: left;">
              <label>Nombre del deck</label>
              <input class='search-input swal-input' id='deck-name' value='${name}'
              <label>Nombre del comandante</label>
              <input list="commander-list" class='search-input swal-input' id='commander-name' value='${commander.name}'/>
              <datalist id="commander-list"></datalist>
              <label for="public-checkbox">¿Es público?</label>
              <input type="checkbox" id="public-checkbox" ${isPublic ? 'checked' : ''} />
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
        const publicCheckbox: HTMLInputElement = (document.getElementById('public-checkbox') as HTMLInputElement);
        let checkIsPublic: boolean;
        if (publicCheckbox.checked) checkIsPublic = true;
        else checkIsPublic = false;
        const commanderInput: HTMLInputElement = document.getElementById('commander-name') as HTMLInputElement;

        const selectedName = commanderInput.value;
        const commanderCard = commandersList.find(card => card.name === selectedName);
        //const commanderCard = commandersList.find(card => card.name == commanderInput.value);
        console.log("IsPublic value??"+checkIsPublic);
        if (!commanderInput.value || !nameInput) {
          Swal.showValidationMessage('Ambos campos son obligatorios');
          return false;
        }
        return { name: nameInput, commander: commanderCard, isPublic: checkIsPublic };
      }
    }).then((result) => {
      if (result.isConfirmed) {

        console.log("------------------------");
        console.log(result.value);
        console.log("------------------------");

        let newIdentity: String = setInversIdentity(result.value.commander.color_identity);

        console.log("Enviando estos datos: ", {
          id: id,
          name: result.value.name,
          commander: result.value.commander.id,
          isPublic: result.value.checkIsPublic,
          identity: newIdentity
        });
        axios.put(api + "/decks/edit/" + id + "?isPublic=" + result.value.isPublic, {
          id: id,
          name: result.value.name,
          commander: result.value.commander.id,
          isPublic: result.value.isPublic,
          identity: newIdentity
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(response => {
          if (response.status == 200) window.location.reload();
        }
        );
        console.log("confirm");
      }
    });
  }

  function showAlertToDelete(id: number) {
    Swal.fire({
      title: "Estas seguro de elimiar el mazo?",
      customClass: {
        popup: 'swal-dark',
        confirmButton: 'btnPurple'
      },
      text: "No podrás revertir los cambos!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(api + "/decks/deleteDeck/" + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(response => {
          if (response.status == 200) {
            console.log(response.data);
            Swal.fire({
              title: "Eliminado!",
              customClass: {
                popup: 'swal-dark',
                confirmButton: 'btnPurple'
              },
              text: "Tu mazo ha sido elimino.",
              icon: "success"
            });
            window.location.reload();
          }
          else {
            Swal.fire({
              title: "Error!",
              customClass: {
                popup: 'swal-dark',
                confirmButton: 'btnPurple'
              },
              text: response.data,
              icon: "error"
            })
          }
        });

      }
    });
  }
  identity = setIdentity(colors);
  return (
    <>
      <div className="bg-gray-800 p-2 rounded cursor-pointer" onClick={onClick}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h4 style={{ color: "#BEBEBE", margin: "0" }} className='header-left'>{name}</h4>
          <div className='header-right' style={{ display: "flex", gap: "0" }}>
            <button className="btnPurple" style={{ marginTop: "0.3rem" }} onClick={() => showFormToEdit()} ><img src='/imgs/edit.svg' height="24rem" /></button>
            <button className="btnRed" style={{ marginTop: "0.3rem" }} onClick={() => showAlertToDelete(id)} ><img src='/imgs/trash.svg' height="24rem" /></button>
          </div>
        </div>
        <div className='identityColor'>
          {identity.map(color =>
            <img src={color} height={"30rem"} key={color} />
          )}

        </div>
      </div>

    </>
  );
}

export default DeckItem;
