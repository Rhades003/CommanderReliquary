import './App.css';
import Cards from './views/Cards.tsx';
import Login from './views/Login';
import HomeDecks from './views/Deck';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function App() {

    
    return (
      <Router>
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/login" element={<Login />} />
        <Route path="/deck" element={<HomeDecks />} />
        
      </Routes>
      </Router>
    );
  }
  

export default App;
