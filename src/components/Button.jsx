import React from 'react';

function Button({ children, onClick, className = '', ...props }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

