import React from 'react';

const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  required,
  ...props
}) => {
  const id = `${name}-input`;
  const errorId = `${name}-error`;

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label} {required && <span aria-label="required">*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-input ${error ? 'error' : ''}`}
        required={required}
        {...props}
      />
      {error && (
        <div 
          id={errorId} 
          className="error-message" 
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;