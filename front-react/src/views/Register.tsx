import React from "react";
import EmailInput from '../components/EmailInput.tsx';
import PasswordInput from '../components/PasswordInput.tsx';

const Register = () => {
    
    
    return (
        <form method="post" onSubmit={ev => { ev.preventDefault(); }}>
            <EmailInput></EmailInput>
            <PasswordInput></PasswordInput>
            <button type="submit">Registrarse</button>
        </form>
    );
    
    
}

export default Register;