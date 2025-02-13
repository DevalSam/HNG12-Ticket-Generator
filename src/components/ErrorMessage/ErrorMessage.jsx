import React from 'react';

const ErrorMessage = ({ id, message }) => {
  return (
    <div 
      id={id}
      className="error-message" 
      role="alert"
      style={{
        color: '#dc3545',
        fontSize: '0.875rem',
        marginTop: '0.25rem',
      }}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;