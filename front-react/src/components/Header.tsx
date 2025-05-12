import React from 'react';
import SearchBar from './SearchBar';
import AuthButtons from './LoginBtns';

const Header: React.FC = () => (
  <header className="flex justify-between items-center p-4 bg-black text-white" style={{display: "grid", gridTemplateColumns:"auto auto auto auto", backgroundColor:"#1D1D1D"}}>
    <h1 className="text-xl font-bold">COMMANDER RELIQUARY</h1>
    <SearchBar />
    <AuthButtons />
  </header>
);

export default Header;
