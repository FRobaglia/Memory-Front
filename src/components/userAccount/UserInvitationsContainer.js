import React, { useState, useEffect } from 'react';
import SpaceService from '../../services/SpaceService';
import SpaceCard from '../space/spaceCard/SpaceCard';

function UserInvitationContainer() {
  const [userInvitation, setUserInvitations] = useState([]);

  useEffect(() => {
    getInvitations();
  }, []);
  async function getInvitations() {
    const data = await SpaceService.getUserSpaces();
    setUserInvitations(data.invitations);
  }
  return (
    <section className="section section--invitationEspace invitationEspace">
      <h2>Invitations</h2>
      {userInvitation &&
        userInvitation.map((space) => (
          <SpaceCard key={space.id} space={space.space} />
        ))}
    </section>
  );
}

export default UserInvitationContainer;
