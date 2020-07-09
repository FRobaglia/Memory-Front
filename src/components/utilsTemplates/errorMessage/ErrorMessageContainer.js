import React from 'react';
import './_errorMessage.scss';

function ErrorMessageContainer({ errorText }) {
  return (
    <p className={errorText ? 'error-message active' : 'error-message'}>
      {errorText}
    </p>
  );
}

export default ErrorMessageContainer;
