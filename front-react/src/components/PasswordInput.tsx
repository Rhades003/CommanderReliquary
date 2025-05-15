import React, { useState } from "react";

const PasswordInput = ({ onPasswordChange }: { onPasswordChange: (isValid: boolean, value: string) => void }) => {
    const [password, setPassword] = useState('');
    const [errorPasswordMessage, setErrorPasswordMessage] = useState(validatePassword(password));
    let isValid = false;
    const handleInputChange = (ev: any) => {
        const { value } = ev.target;
        setPassword(value);
        const error = validatePassword(value);
        setErrorPasswordMessage(error);
        if (validatePassword(value) == "") isValid = true;
        else isValid = false;

        onPasswordChange(isValid, value);
    };

    return (
        <div className="input-group">
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

    function validatePassword(password: string) {
        if (password.length < 8 && password.trim().length > 0) return "La contraseña ha de tener al menos 8 caracteres.";

        else if (!/[A-Z]/.test(password) && password.trim().length > 0) return "La contraseña debe incluir al menos una letra mayúscula.";

        else if (!/[0-9]/.test(password) && password.trim() !== "") return "La contraseña debe incluir al menos un número.";

        else return "";
    }
}
export default PasswordInput;