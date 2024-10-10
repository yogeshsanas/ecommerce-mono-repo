import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  const baseStyle = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors';
  const normalStyle = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
  const errorStyle = 'border-red-500 focus:border-red-500 focus:ring-red-500';
  
  const inputStyle = `${baseStyle} ${error ? errorStyle : normalStyle} ${className}`;
  
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input className={inputStyle} {...props} />
      {error && <p className="mt-1 text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default Input;