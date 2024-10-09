import React from 'react'
import classes from './Input.module.css'

interface Props {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
}

export default function Input({
  placeholder,
  onChange,
  value = '',
  type = 'text',  
  name,
  id,
  disabled = false,
}: Props) {
  return (
    <input
      type={type}
      className={classes.input}
      autoComplete='on'
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
      id={id}
      disabled={disabled}
    />
  );
}
