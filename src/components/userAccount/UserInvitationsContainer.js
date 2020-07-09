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
      <h2 className="userAccount__tabTitle">
        Invitations à rejoindre l'espace de :
      </h2>
      {userInvitation && userInvitation.length !== 0 ? (
        userInvitation.map((space) => (
          <SpaceCard key={space.id} space={space.space} />
        ))
      ) : (
        <p className="text text__noContent">
          Vous n'êtes invité à aucun espace.
        </p>
      )}
    </section>
  );
}

export default UserInvitationContainer;
