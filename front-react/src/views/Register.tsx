import React, { useState, useEffect  } from "react";
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';

const Register = () => {
    const [disabled, setDisabled] = useState(true);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

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

    return (
        <form method="post" onSubmit={ev => { ev.preventDefault(); }}>
            <EmailInput onEmailChange={handleEmailChange} />
            <PasswordInput onPasswordChange={handlePasswordChange} />
            <button type="submit" disabled={disabled}>Registrarse</button>
      </form>
    );


}

export default Register;