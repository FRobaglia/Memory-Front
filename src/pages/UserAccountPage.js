import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';
import UserContext from '../context/UserContext';
import SpacesContainer from '../components/space/SpacesContainer';
import UserInvitationContainer from '../components/space/UserInvitationsContainer';
import RequestAccessContainer from '../components/space/RequestAccessContainer';

function UserAccountPage() {
  const { user } = useContext(UserContext);

  // const cn = (...args) => args.filter(Boolean).join(' ');

  const Tab = ({ children }) => {
    const { isActive, onClick } = useTabState();

    return (
      <button
        type="button"
        // className={cn('tab', isActive && 'active')}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  return (
    <div>
      <div>
        <h2>{user.firstName}</h2>
        <h2>{user.roles}</h2>
        <Link to="/account/modify">
          <button type="button">Modifier mon compte</button>
        </Link>
      </div>
      <Tabs>
        <div>
          <Tab>Espaces</Tab>
          <Tab>Invitations</Tab>
          <Tab>Demandes d'acces</Tab>
        </div>
        <Panel>
          <SpacesContainer />
        </Panel>
        <Panel>
          <UserInvitationContainer />
        </Panel>
        <Panel>
          <RequestAccessContainer />
        </Panel>
      </Tabs>
    </div>
  );
}

export default UserAccountPage;
