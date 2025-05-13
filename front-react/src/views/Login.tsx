import React, { useState, useEffect, FormEvent  } from "react";
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import axios from "axios";

const Register = () => {
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
        <form method="post" onSubmit={ev => { login(ev) }}>
            <EmailInput onEmailChange={handleEmailChange} />
            <PasswordInput onPasswordChange={handlePasswordChange} />
            <button type="submit" disabled={disabled}>Login</button>
      </form>
    );


}

export default Register;