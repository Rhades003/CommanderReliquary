import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const LoginBtns: React.FC = () => {
  const token = localStorage.getItem("token");
  const menu:HTMLHeadingElement = document.getElementById("menu") as HTMLHeadingElement;
  const arrow:HTMLImageElement = document.getElementById("imgArrow") as HTMLImageElement;

  const downArrow = "/imgs/down-arrow.svg";
  const upArrow = "/imgs/up-arrow.svg";
  function displayMenu() {
    
    if(menu){
      menu!.style.display = menu!.style.display === "flex" ? "none" : "flex";
      arrow.src = menu!.style.display === "flex" ? upArrow : downArrow;
    }
  }
  console.log("token");
  console.log(token);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("nameUser");
    window.location.href = "/login";
  }
   const name = localStorage.getItem("nameUser");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };

  const goLogin = () => (window.location.href = "/login");
  const goRegister = () => (window.location.href = "/register");


  const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

  if (token == null && token == undefined) {
    return (
      <div className="header-right" style={{ paddingRight: "2rem" }}>
        <div style={{position: "relative"}} ref={menuRef}>
        <div 
                style={{display: "flex", paddingRight: "2rem", gap: "0.5rem", cursor: "pointer"}} 
                onClick={toggleMenu}
            >
                <img 
                    src={isMenuOpen ? upArrow : downArrow} 
                    alt="logoMenu" 
                    style={{
                        height:"2rem", 
                        paddingTop: "0rem",
                    }} 
                    id='imgArrow'
                />
            </div>
            <div 
                id="menu" 
                style={{
                    position: "absolute",
                    backgroundColor: "rgb(29, 29, 29)",
                    color: "#fff",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    paddingBottom: "1rem",
                    textAlign: "center",
                    display: isMenuOpen ? "flex" : "none",
                    flexDirection: "column",
                    gap: "0.5rem",
                    zIndex: 777,
                    minWidth: "10rem",
                }}
            >
                <a href="/" style={{ color: "white", textDecoration: "none" }}>Inicio</a>
                <a href="/random" style={{ color: "white", textDecoration: "none" }}>Carta Aleatoria</a>
                <a href="/public/decks" style={{ color: "white", textDecoration: "none" }} >Mazos Públicos</a>
            </div>
        </div>
        <button className="btnPurple" style={{ height: "3rem", width: "6rem", padding: "8px 16px" }} onClick={goLogin}>Sign In</button>
        <button className="btnGrey" style={{ height: "3rem", width: "6rem" }} onClick={goRegister}>Sign Up</button>
        
      </div>
    );
  }
  else {


    return (
        <div style={{position: "relative"}} ref={menuRef}>
            <div 
                style={{display: "flex", paddingRight: "8rem", gap: "0.5rem", cursor: "pointer"}} 
                onClick={toggleMenu}
            >
                <h1 style={{color:"white"}} id='nameUserElement'>{name}</h1>
                <img 
                    src={isMenuOpen ? upArrow : downArrow} 
                    alt="logoMenu" 
                    style={{
                        height:"2rem", 
                        paddingTop: "2rem",
                    }} 
                    id='imgArrow'
                />
            </div>
            <div 
                id="menu" 
                style={{
                    position: "absolute",
                    backgroundColor: "rgb(29, 29, 29)",
                    color: "#fff",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    paddingBottom: "1rem",
                    textAlign: "center",
                    display: isMenuOpen ? "flex" : "none",
                    flexDirection: "column",
                    gap: "0.5rem",
                    zIndex: 777,
                    minWidth: "10rem",
                }}
            >
                <a href="/" style={{ color: "white", textDecoration: "none" }}>Inicio</a>
                <a href="/decks" style={{ color: "white", textDecoration: "none" }}>Mis Mazos</a>
                <a href="/public/decks" style={{ color: "white", textDecoration: "none" }} >Mazos Públicos</a>
                <a href="/random" style={{ color: "white", textDecoration: "none" }}>Carta Aleatoria</a>
                <a href="#" style={{ color: "white", textDecoration: "none" }} onClick={logout}>Cerrar Sesión</a>
            </div>
        </div>
    );
}
}

export default LoginBtns;
