import React from 'react';
import SearchBar from './SearchBar';
import AuthButtons from './LoginBtns';

const Header: React.FC = () => (
  <header className="header" style={{ display: "grid", gridTemplateColumns: "auto auto", backgroundColor: "#1D1D1D" }}>
    <div className="header-left">
      <img src="./logo/ReliquarySanctuaryLogo.svg" alt="logo" style={{height:"8rem"}} />
      <h1 className="logo">
        <span style={{ display: 'block' }}>COMMANDER</span>
        <span style={{ display: 'block' }}>RELIQUARY</span>
      </h1>
      <SearchBar />
    </div>
    
      <AuthButtons />
    
  </header>
);

export default Header;
