import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface SearchBarProps {
  resultForParent?: (cards: CardProps[]) => void;
}
interface CardProps {
  id:string;
  name:string;
  mana_cost:string;
  rarity:string;
  type_line:string;
  image_uris: {
    small:string;
    normal:string;
    large:string;
    png:string;
  };
};

const SearchBar: React.FC<SearchBarProps> = ({ resultForParent }) => {
  const [inputValue, setInputValue] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const api: string = "http://localhost:8080";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if(resultForParent){
      if (timer) {
        clearTimeout(timer);
      }
  
      const count = setTimeout(() => {
        console.log(value);
        //resultForParent();
        axios.get(api+"/cards/card?name="+value)
        .then(response => {
          if(response.status == 200){
            console.log(response.data)
            resultForParent(response.data);
          }
        }
        );
      }, 1000);
  
      setTimer(count);
    }
    
  };
  if(resultForParent){
    return (
      <input
        type="text"
        placeholder="Jodah, The Unifier"
        className="search-input"
        value={inputValue}
        onChange={handleChange}
        style={{backgroundColor:"#323232", height:"2rem", marginTop:"1rem"}}
      />
    );
  }
  else {
    return (
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        value={inputValue}
        onChange={handleChange}
        style={{backgroundColor:"#323232", height:"4rem", width:"30rem", fontSize:"2.5rem"}}
      />
    );
  }
  
};

export default SearchBar;

