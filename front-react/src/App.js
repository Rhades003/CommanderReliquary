import './App.css';
import Cards from './views/Cards.tsx';
import FormRegister from './views/Register.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function App() {

    
    return (
      <Router>
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/register" element={<FormRegister />} />
        
      </Routes>
      </Router>
    );
  }
  

export default App;
