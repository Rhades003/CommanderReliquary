import './App.css';
import Cards from './views/Cards.tsx';
import Login from './views/Login';
import HomeDecks from './views/Deck';
import Register from './views/Register';
import SearchCard from './views/SearchCard';
import CardRandom from './views/CardRandom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { StrictMode } from 'react';
import Card from './views/Card';



function App() {

    
    return (
      <StrictMode>
      <Router>
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchCard />} />
        <Route path="/decks" element={<HomeDecks />} />
        <Route path="/random" element={<CardRandom />} />
        <Route path="/card/:id" element={<Card />} />
      </Routes>
      </Router>
      </StrictMode>
    );
  }
  

export default App;
