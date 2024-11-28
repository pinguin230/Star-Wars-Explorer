import {FC} from 'react';
import "./NotFoundPage.scss";
import {Link} from "react-router-dom";

const NotFoundPage: FC = () => {
  return (
      <div className="not-found-container">
        <div className="not-found-content">
          <h1>404</h1>
          <p>Page Not Found</p>
          <Link to="/" className="back-home">Go Back Home</Link>
        </div>
      </div>
  );
};

export default NotFoundPage;