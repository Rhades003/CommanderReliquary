import React, { useState } from "react";

const FormRegister = () => {
    
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmailMessage, setErrorEmailMessage] = useState(validateEmail(email));
    const [errorPasswordMessage, setErrorPasswordMessage] = useState(validatePassword(password));

    // Función genérica para manejar cambios en los inputs
    const handleInputChange = (ev) => {
        const { name, value } = ev.target;
        if (name === "email") {
            setEmail(value);
            setErrorEmailMessage(validateEmail(value)); // Validar el email al cambiarlo
        } else if (name === "password") {
            setPassword(value);
            setErrorPasswordMessage(validatePassword(value));
        }
    };

    return (
        <form method="post" onSubmit={ev => { ev.preventDefault(); }}>
            <input
                type="text"
                name="email"
                placeholder="Introduce tu email aquí"
                value={email}
                onChange={handleInputChange} 
            />
            <p>{errorEmailMessage}</p>

            <input
                type="password"
                name="password"
                placeholder="Introduce tu contraseña aquí"
                value={password}
                onChange={handleInputChange} 
            />
            <p>{errorPasswordMessage}</p>
            <button type="submit">Registrarse</button>
        </form>
    )
    function validateEmail(email){
        if (!email.includes("@gmail.com")
            && !email.includes("@hotmail.com")
            && !email.includes("@yahoo.com")) return "Email no válido";
        else return "";
    }

    function validatePassword(password){
        if (!password.includes("@gmail.com")
            && !password.includes("@hotmail.com")
            && !password.includes("@yahoo.com")) return "Contraseña no válida";
        else return "";
    }
}

export default FormRegister;