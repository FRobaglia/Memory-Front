import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import SpacesContainer from '../components/space/SpacesContainer';

function UserAccountPage() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>{user.firstName}</h2>
      <h2>{user.roles}</h2>
      <Link to="/account/modify">
        <button type="button">Modifier mon compte</button>
      </Link>
      <hr />
      <SpacesContainer />
    </div>
  );
}

export default UserAccountPage;
