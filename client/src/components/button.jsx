import React from 'react';

export default function Button({ text, color = 'bg-transparent', onClick }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`b ph3 pv2 input-reset ${color} ba b--black grow pointer f6 mr2 mv2`}
    >
      {text}
    </button>
  );
}
