import React, { FC } from 'react';
import './Header.scss';
import {Link} from "react-router-dom";

const Header: FC = () => {
  return (
      <header className="header">
        <div className="header__logo">Star Wars Heroes</div>
        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__item"><Link to="/" className="header__link">Home</Link></li>
          </ul>
        </nav>
      </header>
  );
};

export default Header;
