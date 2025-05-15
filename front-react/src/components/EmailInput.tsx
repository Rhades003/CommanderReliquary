import React, { useState } from "react";

const EmailInput = ({ onEmailChange }: { onEmailChange: (isValid: boolean, value: string) => void }) => {
    const [email, setEmail] = useState('');
    const [errorEmailMessage, setErrorEmailMessage] = useState(validateEmail(email));
    let isValid = false;
    const handleInputChange = (ev: any) => {
        const { value } = ev.target;
        setEmail(value);
        const error = validateEmail(value);
        setErrorEmailMessage(error);
        if (validateEmail(value) == "") isValid = true;
        else isValid = false;
        onEmailChange(isValid, value);
    };

    return (

        <div className="input-group">
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

    function validateEmail(email: string) {
        if (!email.includes("@gmail.com")
            && !email.includes("@hotmail.com")
            && !email.includes("@yahoo.com")
            && email.trim().length > 0) return "Email no válido.";
        else return "";
    }

}
export default EmailInput;