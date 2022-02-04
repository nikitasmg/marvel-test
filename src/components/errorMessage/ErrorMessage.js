import React from 'react';
import error from './error.gif';

const ErrorMessage = () => {
  return (
    <img
      alt=''
      style={{
        display: 'block',
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        margin: '0 auto',
      }}
      src={error}
    />
  );
};

export default ErrorMessage;
