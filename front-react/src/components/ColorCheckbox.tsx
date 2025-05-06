import React from 'react';

interface ColorCheckboxProps {
  color: string;
}

const ColorCheckbox: React.FC<ColorCheckboxProps> = ({ color }) => (
  <label className="flex items-center space-x-1">
    <input type="checkbox" />
    <span>{color}</span> {}
  </label>
);

export default ColorCheckbox;
