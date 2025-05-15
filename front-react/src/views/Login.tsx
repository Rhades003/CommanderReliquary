import React, { useState, useEffect, FormEvent  } from "react";
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import axios from "axios";

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const api:string = "http://localhost:8080";
    // Validar si ambos campos están correctos para habilitar el botón
    useEffect(() => {
        setDisabled(!(emailValid && passwordValid));
    }, [emailValid, passwordValid]);

    const handleEmailChange = (isValid: boolean) => {
        setEmailValid(isValid);
    };

    const handlePasswordChange = (isValid: boolean) => {
        setPasswordValid(isValid);
    };
    function login(ev:FormEvent){
        ev.preventDefault();

        axios.post(api+"/users/login",
            {
                "email":"ruben@gmail.com",
                "password":"ruben1234"
            })
            .then((response:any) => {
                if(response.status == 200) {
                    console.log(response.data);
                    if(response.data.status == "200"){
                        let token:string = response.data.token;
                        let name:string = response.data.name;

                        localStorage.setItem("token", token);
                        localStorage.setItem("nameUser", name);

                        window.location.href = "/decks";
                    }
                    else {
                        console.log("status: " + response.data.status);
                        console.log("message: " + response.data.message);
                    }
                   
                }
            });
    }
    return (
        <div id="root" style={{ height: "100%", width: "100%", backgroundColor: "#1D1D1D"}}>
            <div style={{display:"flex", alignItems: "center",  justifyContent: "center", paddingTop:"3rem"}}>
                <img src="./logo/ReliquarySanctuaryLogo.svg" alt="logo" style={{ height: "8rem" }} />
                <h1 style={{color:"white"}}>
                    <span style={{ display: 'block' }}>COMMANDER</span>
                    <span style={{ display: 'block' }}>RELIQUARY</span>
                </h1>
            </div>
        <form method="post" onSubmit={ev => { login(ev) }} className="form">
            <EmailInput onEmailChange={handleEmailChange} />
            <PasswordInput onPasswordChange={handlePasswordChange} />
            <button type="submit" disabled={disabled} className="btnPurple" style={{ padding: "8px 16px", margin: "1rem auto 0 auto", display: "block", }}>Iniciar Sesión</button>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <a href="/register" className="linkForms"><p>¿Todavía no tienes cuenta?</p></a>
            </div>
      </form>
      </div>
    );


}

export default Login;