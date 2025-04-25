import './App.css';
import Cards from './views/Cards.tsx';
import FormRegister from './views/Login';
import HomeDecks from './views/HomeDecks';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function App() {

    
    return (
      <Router>
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/register" element={<FormRegister />} />
        <Route path="/deckPrueba" element={<HomeDecks />} />
        
      </Routes>
      </Router>
    );
  }
  

export default App;
