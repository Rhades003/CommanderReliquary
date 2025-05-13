import React from 'react';

const LoginBtns: React.FC = () => {
  const token = localStorage.getItem("token");

  if (token == null) {
    return (
      <div className="header-right" style={{ paddingRight: "2rem" }}>
        <button className="btnPurple" style={{ height: "3rem", width: "6rem", padding: "8px 16px" }}>Sign In</button>
        <button className="btnGrey" style={{ height: "3rem", width: "6rem" }}>Sign Up</button>
      </div>
    );
  }
  else {
    const name = localStorage.getItem("nameUser");
    return (
    <>
      <h1 style={{color:"white", paddingRight: "8rem"}}>{name}</h1>
    </>);
  }
}

export default LoginBtns;
