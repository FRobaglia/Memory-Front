import React from 'react';
import SpaceSettingsGenerales from './SpaceSettingsGenerales';
import SpaceSettingsInvite from './SpaceSettingsInvite';

function SpaceSettingsContainer({ space }) {
  return (
    <div>
      <SpaceSettingsGenerales space={space} />
    </div>
  );
}

export default SpaceSettingsContainer;
