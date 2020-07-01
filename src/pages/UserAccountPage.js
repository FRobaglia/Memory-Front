import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import SpacesContainer from '../components/space/SpacesContainer';
import TabNav from '../components/TabNav/TabNav';
// import TabNavButton from '../components/TabNav/TabNavButton';
import UserInvitationContainer from '../components/space/UserInvitationsContainer';
import RequestAccessContainer from '../components/space/RequestAccessContainer';

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
      <TabNav
        firstTabLabel="Espaces"
        setFirstTab={setSpacesTab}
        secondTabLabel="invitations"
        setSecondTab={setInvitationsTab}
        thirdTabLabel="demande acces"
        setThirdTab={setaccessTab}
        tabNumber="3"
      />
      {spacesTab && <SpacesContainer />}
      {invitationsTab && <UserInvitationContainer />}
      {accessTab && <RequestAccessContainer />}
    </div>
  );
}

export default UserAccountPage;
