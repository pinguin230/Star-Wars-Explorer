import React, { FC } from 'react';
import './ErrorPage.scss';

const ErrorPage: FC = () => {
  return (
      <div className="error-container">
        <div className="error-content">
          <h1>500</h1>
          <p>Something Went Wrong</p>
          <a href="/" className="back-home">Back to Home</a>
        </div>
      </div>
  );
};

export default ErrorPage;
