import React, { useState } from "react";

const NameInput = ({ onNameChange }: { onNameChange: (isValid: boolean, value: string) => void }) => {
    const [name, setName] = useState('');
    const [errorNameMessage, setErrorNameMessage] = useState(validateName(name));
    let isValid = false;
    const handleInputChange = (ev: any) => {
        const { value } = ev.target;
        setName(value);
        const error = validateName(value);
        setErrorNameMessage(error);
        if(validateName(value) == "") isValid = true;
        else isValid = false;
        
        onNameChange(isValid, value);
    };

    return (
        <div>
        <label htmlFor="name">Nombre de usuario</label>
            <input
                type="name"
                name="name"
                placeholder="Introduce tu nombre de usuario aquí"
                value={name}
                onChange={handleInputChange} 
            />
            <p>{errorNameMessage}</p>

            </div>
    );
    
    function validateName(name:string){
        if (name.length < 4 || name.length > 10) return "El nombre de usuario ha de tener entre 4 y 8 caracteres.";

        else  if(name.trim().length > 0) return "El nombre de usuario no ha de tener espacios en blanco";

        else return "";
    }
}
export default NameInput;