import React from 'react';
import SearchBar from './SearchBar';
import AuthButtons from './LoginBtns';

const Header: React.FC = () => (
  <header className="flex justify-between items-center p-4 bg-black text-white">
    <h1 className="text-xl font-bold">COMMANDER RELIQUARY</h1>
    <SearchBar />
    <AuthButtons />
  </header>
);

export default Header;
