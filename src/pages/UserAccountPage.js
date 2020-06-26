import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

function UserAccountPage() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <h2>{user.firstName}</h2>
      <h2>{user.roles}</h2>
    </div>
  );
}

export default UserAccountPage;
