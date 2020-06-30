import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import SpacesContainer from '../components/space/SpacesContainer';
import Nav from '../utils/nav';

function UserAccountPage() {
  const { user } = useContext(UserContext);
  const [spacesTab, setSpacesTab] = useState(true);
  const [invitationsTab, setInvitationsTab] = useState(false);
  const [accessTab, setaccessTab] = useState(false);

  return (
    <div>
      <div>
        <h2>{user.firstName}</h2>
        <h2>{user.roles}</h2>
      </div>
      <Nav
        firstTabName="Espaces"
        setFirstTab={setSpacesTab}
        secondTabName="invitations"
        setSecondTab={setInvitationsTab}
        thirdTabName="demande acces"
        setThirdTab={setaccessTab}
      />
      {spacesTab && <SpacesContainer />}
      {invitationsTab && <h1>Invitations</h1>}
      {accessTab && <h1>Demandes d'access</h1>}
    </div>
  );
}

export default UserAccountPage;
