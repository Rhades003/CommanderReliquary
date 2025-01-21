import React, { useState } from "react";

const EmailInput = () => {
    const [email, setEmail] = useState('');
    const [errorEmailMessage, setErrorEmailMessage] = useState(validateEmail(email));

    const handleInputChange = (ev) => {
        const { name, value } = ev.target;
        if (name === "email") {
            setEmail(value);
            setErrorEmailMessage(validateEmail(value)); // Validar el email al cambiarlo
        }
    };
    return(

        <div>
        <label htmlFor="email">Email</label>
        <input
            type="text"
            name="email"
            placeholder="Introduce tu email aquí"
            value={email}
            onChange={handleInputChange} 
        />
        <p>{errorEmailMessage}</p>
        </div>
    );

    function validateEmail(email){
        if (!email.includes("@gmail.com")
            && !email.includes("@hotmail.com")
            && !email.includes("@yahoo.com")
            && email.trim() !== "") return "Email no válido.";
        else return "";
    }

}
export default EmailInput;