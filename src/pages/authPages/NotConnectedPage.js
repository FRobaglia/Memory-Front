import React from 'react';
import EndPartContainer from '../../components/utilsTemplates/endPartContainer/EndPartContainer';
import DoorGuyImage from '../../assets/svg/door-guy.svg';

function NotConnectedPage({ location }) {
  return (
    <div>
      <EndPartContainer
        notConnected
        endImage={DoorGuyImage}
        endButtonLink="/register"
        endButtonText="Créer un compte"
        location={location}
      />
    </div>
  );
}

export default NotConnectedPage;
