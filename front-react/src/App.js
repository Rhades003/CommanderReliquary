import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Card from './components/Card.tsx';
import CardDoubleFace from './components/CardDoubleFace.tsx';
import FormRegister from './components/FormRegister.tsx';
function App() {
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
      const obtenerCartas = async () => {
        const res = await fetch('http://192.168.1.137:8080/getAllCard/2', {mode:'cors'});
        const data = await res.json();
        console.log(data)
        setCardList([...data.content]);
        
      }

      obtenerCartas();

    }, []);
    
    return (
      /*<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
  
        <div style={{display:'flex', width:'100%', flexWrap:'wrap'}}>

        {
        cardList.map((card, i) => {
          if(card.image_uris != null){
            return <Card key={i} card={card}></Card>
          }
          else {
            return <CardDoubleFace key={i} card={card}></CardDoubleFace>
          }
         })
        
        }
        </div>
      </div>*/

      <FormRegister></FormRegister>
    );
   
  }

export default App;
