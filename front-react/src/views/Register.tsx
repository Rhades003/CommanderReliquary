import React, { useState, useEffect, FormEvent  } from "react";
import NameInput from "../components/NameInput";
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import axios from "axios";
import bcrypt from "bcryptjs-react";

const Register = () => {
    const [disabled, setDisabled] = useState(true);
    const [nameValid, setNameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const api:string = "http://localhost:8080";

    // Validar si ambos campos están correctos para habilitar el botón
    useEffect(() => {
        setDisabled(!(emailValid && passwordValid));
        
    }, [emailValid, passwordValid]);

    const handleNameChange = (isValid: boolean, value: string) => {
        setNameValid(isValid);
        setName(value);
        
    };

    const handleEmailChange = (isValid: boolean, value: string) => {
        setEmailValid(isValid);
        setEmail(value);
        
    };

    const handlePasswordChange = (isValid: boolean, value: string) => {
        setPasswordValid(isValid);
        setPassword(value);
    };

    const handleConfirmPasswordChange = (isValid: boolean, value: string) => {
        setConfirmPasswordValid(isValid);
        setConfirmPassword(value);
    };

    async function register(ev:FormEvent){
        ev.preventDefault();
        let name:HTMLInputElement = document.getElementById("nameInput") as HTMLInputElement;
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
        if(password == confirmPassword && name.value != "") {
            const hashedPassword = bcrypt.hashSync(password, 11)

            axios.post(api+"/users/register",
            {
                "name":name.value,
                "email":email,
                "password":hashedPassword,
            })
            .then((response:any) => {
                if(response.status == 200) {
                    console.log(response.data);
                    if(response.data.status == "200"){
                        /*let token:string = response.data.token;
                        let name:string = response.data.name;

                        localStorage.setItem("token", token);
                        localStorage.setItem("nameUser", name);

                        window.location.href = "/decks";*/
                        console.log(response.data);
                    }
                    else {
                        console.log("status: " + response.data.status);
                        console.log("message: " + response.data.message);
                    }
                   
                }
            });
        }
        else {
            let errorPassword:HTMLParagraphElement = document.getElementById("errorPassword") as HTMLParagraphElement;
            errorPassword.innerText = "Las contraseñas deben coincidir"
        }
        /*axios.post(api+"/users/register",
            {
                "name":"",
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
            });*/
    }
    return (
        <form method="post" onSubmit={ev => { register(ev) }}>
            <NameInput onNameChange={handleNameChange}/>
            <EmailInput onEmailChange={handleEmailChange}/>
            <PasswordInput onPasswordChange={handlePasswordChange} />
            <PasswordInput onPasswordChange={handleConfirmPasswordChange} />
            <p id="errorPassword"/>
            <button type="submit" disabled={disabled}>register</button>
      </form>
    );


}

export default Register;