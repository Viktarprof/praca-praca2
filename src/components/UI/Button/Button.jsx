import React from 'react';
import s from './Button.module.css';

function Button({ text, styles, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={`${s[styles]}`}>
      {text}
    </button>
  )
}

export default Button