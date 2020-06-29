import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import SessionService from '../services/SessionService';

function Home() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <h1>Homepage</h1>
      <p>{user ? `Bonjour, ${user.firstName}` : ''}</p>
      <Link to="/login">
        <button type="button">Log in</button>
      </Link>
      <Link to="/register">
        <button type="button">Register</button>
      </Link>
      <button
        type="button"
        onClick={() => {
          SessionService.clearTokens();
          setUser(null);
        }}
      >
        logout
      </button>
      <Link to="/account">
        <button type="button">Mes espaces</button>
      </Link>
      {user && user.roles.includes('ROLE_BACK_MANAGER') ? (
        <Link to="/admin">
          <button type="button">Back Office</button>
        </Link>
      ) : (
        ''
      )}
    </div>
  );
}

export default Home;
