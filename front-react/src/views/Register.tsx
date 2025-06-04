import React, { useState, useEffect, FormEvent } from "react";
import NameInput from "../components/NameInput";
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import axios from "axios";
import bcrypt from "bcryptjs-react";

const Register = () => {
    document.title = "Register";
    const [disabled, setDisabled] = useState(true);
    const [nameValid, setNameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const api: string = "http://localhost:8080";

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

    async function register(ev: FormEvent) {
        ev.preventDefault();
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
        if (password == confirmPassword && name != "") {
            const hashedPassword = bcrypt.hashSync(password, 11);

            axios.post(api + "/users/register",
                {
                    "name": name,
                    "email": email,
                    "password": password,
                })
                .then((response: any) => {
                    if (response.status == 200) {
                        console.log(response.data);
                        if (response.data.status == "200") {
                            let token: string = response.data.token;
                            let name: string = response.data.name;

                            localStorage.setItem("token", token);
                            localStorage.setItem("nameUser", name);
                            console.log(response.data);
                            window.location.href = "/decks";


                        }
                        else {
                            console.log("status: " + response.data.status);
                            console.log("message: " + response.data.message);
                        }

                    }
                });
        }
        else {
            let errorPassword: HTMLParagraphElement = document.getElementById("errorPassword") as HTMLParagraphElement;
            errorPassword.innerText = "Las contraseñas deben coincidir"
        }
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
            <form method="post" onSubmit={ev => { register(ev) }} className="form">
                <NameInput onNameChange={handleNameChange} />
                <EmailInput onEmailChange={handleEmailChange} />
                <PasswordInput onPasswordChange={handlePasswordChange} />
                <PasswordInput onPasswordChange={handleConfirmPasswordChange} />
                <p id="errorPassword" />
                <button type="submit" disabled={disabled} className="btnPurple" style={{ padding: "8px 16px", margin: "1rem auto 0 auto", display: "block", }}>Registrarse</button>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <a href="/login" className="linkForms"><p>¿Ya tienes cuenta?</p></a>
                </div>
            </form>
        </div>
    );


}

export default Register;