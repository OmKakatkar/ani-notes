import React from 'react';

type InputProps = {
  type: string;
  label: string;
  name: string;
  autoComplete?: string;
  value: string | string[];
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  classNames?: string;
  required?: boolean;
};

function Input({
  type,
  label,
  name,
  autoComplete,
  value,
  handleChange,
  classNames,
  required,
}: InputProps) {
  return (
    <div className='input-container'>
      <label htmlFor={name}> {label}</label>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        className={`input text-md ${classNames}`}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
}

export default Input;
