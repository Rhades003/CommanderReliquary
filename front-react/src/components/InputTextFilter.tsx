import React from 'react';

interface InputProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
}

function InputTextFilter({ id, name, label, placeholder = '' }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor={id} style={{ marginBottom: '6px', fontWeight: '600', fontSize: '1.5rem' }}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        style={{ padding: '6px 8px', fontSize: '1rem' }}
      />
    </div>
  );
}

export default InputTextFilter;
