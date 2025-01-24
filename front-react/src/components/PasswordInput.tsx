import React, { useState } from "react";

const PasswordInput = () => {

    const [password, setPassword] = useState('');
    const [errorPasswordMessage, setErrorPasswordMessage] = useState(validatePassword(password));

    // Función genérica para manejar cambios en los inputs
    const handleInputChange = (ev:any) => {
        const { value } = ev.target;
            setPassword(value);
            setErrorPasswordMessage(validatePassword(value));
    };

    return (
        <div>
        <label htmlFor="password">Contraseña</label>
            <input
                type="password"
                name="password"
                placeholder="Introduce tu contraseña aquí"
                value={password}
                onChange={handleInputChange} 
            />
            <p>{errorPasswordMessage}</p>

            </div>
    );
    
    function validatePassword(password:string){
        if (password.length < 8 && password.trim() !== "") return "La contraseña ha de tener al menos 8 caracteres.";

        else  if (!/[A-Z]/.test(password) && password.trim() !== "") return "La contraseña debe incluir al menos una letra mayúscula.";
        
        else if (!/[0-9]/.test(password) && password.trim() !== "") return "La contraseña debe incluir al menos un número.";
        
        else  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password) && password.trim() !== "") return "La contraseña debe incluir al menos un carácter especial.";    
        
        else return "";
    }
}
export default PasswordInput;