import React from 'react';
import { Link } from 'react-router-dom';
// import UserContext from '../../context/UserContext';
import logoPuzzle from '../../assets/svg/puzzle-logo.svg';

function NavBar() {
  // const { user } = useContext(UserContext);

  return (
    <nav className="userAccount__navContainer header__main">
      <ul className="userAccount__nav">
        <li>
          <Link to="/">
            <img
              src={logoPuzzle}
              alt="memory-logo"
              className="userAccount__nav--logo"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
