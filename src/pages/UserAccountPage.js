import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import SpacesContainer from '../components/space/SpacesContainer';

function UserAccountPage() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>{user.firstName}</h2>
      <h2>{user.roles}</h2>
      <SpacesContainer />
    </div>
  );
}

export default UserAccountPage;
