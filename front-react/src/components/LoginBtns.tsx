import axios from 'axios';
import React from 'react';

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

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("nameUser");
    window.location.href = "/login";
  }

  const goLogin = () => (window.location.href = "/login");
  const goRegister = () => (window.location.href = "/register");
  //let nameUser:HTMLHeadingElement = document.getElementById("nameUserElement") as HTMLHeadingElement;


  if (token == null) {
    return (
      <div className="header-right" style={{ paddingRight: "2rem" }}>
        <button className="btnPurple" style={{ height: "3rem", width: "6rem", padding: "8px 16px" }} onClick={goLogin}>Sign In</button>
        <button className="btnGrey" style={{ height: "3rem", width: "6rem" }} onClick={goRegister}>Sign Up</button>
      </div>
    );
  }
  else {
    const name = localStorage.getItem("nameUser");
    return (
    <div style={{position: "relative"}}>
      <div style={{display: "flex",  paddingRight: "8rem", gap: "0.5rem"}} onMouseEnter={displayMenu} onMouseLeave={displayMenu}>
        <h1 style={{color:"white"}} id='nameUserElement'>{name}</h1>
        <img src={downArrow} alt="logoMenu" style={{height:"2rem", paddingTop: "2rem"}} id='imgArrow'/>
      </div>
      <div id="menu" style={{
            position: "absolute",
            backgroundColor: "rgb(29, 29, 29)",
            color: "#fff",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingBottom: "1rem",
            textAlign: "center",
            display: "none",
            flexDirection: "column",
            gap: "0.5rem",
            zIndex: 777,
            minWidth: "10rem",
          }} onMouseEnter={displayMenu} onMouseLeave={displayMenu}>
        <a href="/" style={{ color: "white", textDecoration: "none" }}>Inicio</a>
        <a href="/decks" style={{ color: "white", textDecoration: "none" }}>Decks</a>
        <a href="random" style={{ color: "white", textDecoration: "none" }}>Carta Aleatoria</a>
        <a href="#" style={{ color: "white", textDecoration: "none" }} onClick={logout}>Cerrar Sesión</a>
    </div>
    </div>);
  }
}

export default LoginBtns;
