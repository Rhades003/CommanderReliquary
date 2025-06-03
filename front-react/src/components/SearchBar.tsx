import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface SearchBarProps {
  resultForParent?: (cards: CardProps[]) => void;
}
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
};

const SearchBar: React.FC<SearchBarProps> = ({ resultForParent }) => {
  const [inputValue, setInputValue] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [options, setOptions] = useState<CardProps[]>([]);
  const api: string = "http://localhost:8080";

  const handleChangeResultForParent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (resultForParent) {
      if (timer) {
        clearTimeout(timer);
      }

      const count = setTimeout(() => {
        console.log(value);
        axios.get(api + "/cards/card?name=" + value)
          .then(response => {
            if (response.status == 200) {
              console.log(response.data)
              resultForParent(response.data);
            }
          });
      }, 1000);

      setTimer(count);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.trim()) {
        axios.get(api + "/cards/card?name=" + inputValue).then((response) => {
          if (response.status === 200) {
            setOptions(response.data.slice(0, 5));
          }
        });
      } else {
        setOptions([]);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedName = e.target.value;
    const selectedCard = options.find(card => card.name === selectedName);
    
    if (selectedCard) {
      if (resultForParent) {
        resultForParent([selectedCard]);
      } else {
        window.location.href = "/card/" + selectedCard.id;
      }
    }
  };

  if (resultForParent) {
    return (
      <input
        type="text"
        placeholder="Jodah, The Unifier"
        className="search-input"
        value={inputValue}
        onChange={handleChangeResultForParent}
        style={{ backgroundColor: "#323232", height: "2rem", marginTop: "1rem", marginLeft: "1rem", paddingLeft: "1rem" }}
      />
    );
  }
  else {
    return (
      <>
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          id='card-name'
          list="card-list"
          value={inputValue}
          onChange={(e) => {
            handleInputChange(e);
            handleSelect(e);
          }}
          style={{ backgroundColor: "#323232", height: "4rem", width: "30rem", fontSize: "2.5rem", marginLeft: "2rem", paddingLeft: "1rem" }}
        />
        <datalist id="card-list">
          {options.map((card) => (
            <option key={card.id} value={card.name}/>
          ))}
        </datalist>
      </>
    );
  }
};

export default SearchBar;