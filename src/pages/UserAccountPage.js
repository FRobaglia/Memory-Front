import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';
import UserContext from '../context/UserContext';
import SpacesContainer from '../components/space/SpacesContainer';
import UserInvitationContainer from '../components/space/UserInvitationsContainer';
import RequestAccessContainer from '../components/utilsTemplates/requestAccessContainer/RequestAccessContainer';
import SessionService from '../services/SessionService';

function UserAccountPage() {
  const { user, setUser } = useContext(UserContext);

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
      <button
        type="button"
        onClick={() => {
          SessionService.clearTokens();
          setUser(null);
        }}
      >
        logout
      </button>
      {user && user.roles.includes('ROLE_BACK_MANAGER') ? (
        <Link to="/admin">
          <button type="button">Back Office</button>
        </Link>
      ) : (
        ''
      )}
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
          <RequestAccessContainer account />
        </Panel>
      </Tabs>
    </div>
  );
}

export default UserAccountPage;
