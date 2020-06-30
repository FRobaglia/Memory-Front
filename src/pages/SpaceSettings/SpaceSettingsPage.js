import React, { useState, useEffect } from 'react';
// import moment from 'moment';
// import { useLocation, Redirect } from 'react-router-dom';
import SpaceService from '../../services/SpaceService';
import StorageService from '../../services/StorageService';
// import spaceID from '../../utils/getSpaceID';
import SpaceSettingsGeneral from './SpaceSettingsGeneral';
import SpaceSettingsInvitations from './SpaceSettingsInvitations';

function SpaceSettingsPage() {
  // const spaceLocation = useLocation();
  const [space, setSpace] = useState({});

  useEffect(() => {
    const result = SpaceService.spaceInfosFromStorage(
      StorageService.getObjectStorage('spaceInfos'),
      'space'
    );
    setSpace(result);
  }, []);

  return (
    <div>
      {space && (
        <>
          {console.log('plu', space.id)}
          <SpaceSettingsGeneral space={space} />
          <SpaceSettingsInvitations space={space} />
        </>
      )}
    </div>
  );
}

export default SpaceSettingsPage;
