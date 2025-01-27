import React, { useState } from "react";

const EmailInput = ({ onEmailChange }: { onEmailChange: (isValid: boolean) => void }) => {
    const [email, setEmail] = useState('');
    const [errorEmailMessage, setErrorEmailMessage] = useState(validateEmail(email));

    const handleInputChange = (ev: any) => {
        const { value } = ev.target;
        setEmail(value);
        const error = validateEmail(value);
        setErrorEmailMessage(error);
        onEmailChange(error === "");
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

    function validateEmail(email:string){
        if (!email.includes("@gmail.com")
            && !email.includes("@hotmail.com")
            && !email.includes("@yahoo.com")
            && email.trim() !== "") return "Email no válido.";
        else return "";
    }

}
export default EmailInput;