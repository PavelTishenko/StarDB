import React from 'react';

import './error-indicator.css';
import icon from './star-wars.jpg';

const ErrorIndicator = () => {
  return(
    <div className = "error-indicator">
      <img src = {icon} alt = "error icon"/>
      <span className = "boom">
      </span>
      <span>
        something has gone wrong
      </span>
      <span>
        (but we already sent droids to fix it)
      </span>
    </div>
  );
};

export default ErrorIndicator;

