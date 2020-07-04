import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';
import UserContext from '../context/UserContext';
import SpacesContainer from '../components/space/SpacesContainer';
import UserInvitationContainer from '../components/space/UserInvitationsContainer';
import RequestAccessContainer from '../components/space/RequestAccessContainer';
import UserAccountHeaederBg from '../components/userAccount/UserAccountHeaederBg';
import logoPuzzle from '../assets/icons/logo-puzzle.svg';
import '../components/nav/navbar-userAccount.scss';

function UserAccountPage() {
  const { user } = useContext(UserContext);
  const [navPosition, setNavPosition] = useState('top');
  // Changing backgroundcolor navbar
  const listener = document.addEventListener('scroll', () => {
    const scrolled = document.scrollingElement.scrollTop;
    if (scrolled > 100) {
      if (navPosition !== 'violet') {
        setNavPosition('violet');
      }
    } else if (navPosition !== 'top') {
      setNavPosition('top');
    }
  });
  useEffect(() => {}, [listener]);

  return (
    <div className="body--espace">
      <nav
        className="userAccount__navContainer header__main"
        style={{
          backgroundColor: navPosition === 'top' ? 'transparent' : '#EDE7F2',
        }}
      >
        <ul className="userAccount__nav">
          <li>
            <Link to="/">
              <img
                src={logoPuzzle}
                alt="memory-logo"
                className="userAccount__nav--logo"
              />
            </Link>
          </li>
          <li>
            <Link to="account/modify">
              <img
                src={user.image.url}
                alt={user.firstName}
                className="userAccount__nav--photo"
              />
            </Link>
          </li>
        </ul>
      </nav>
      <UserAccountHeaederBg />

      <main className="main--scroll">
        {/* <Tabs>
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
        </Tabs> */}
        <SpacesContainer />
        <UserInvitationContainer />
        <RequestAccessContainer />
      </main>
    </div>
  );
}

export default UserAccountPage;
