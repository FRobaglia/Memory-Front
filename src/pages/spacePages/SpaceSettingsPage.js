import React, { useState, useEffect } from 'react';
// import moment from 'moment';
// import { useLocation, Redirect } from 'react-router-dom';
// import SpaceService from '../../services/SpaceService';
import StorageService from '../../services/StorageService';
// import spaceID from '../../utils/getSpaceID';
import SpaceSettingsGeneral from '../../components/settings/spaceSettings/SpaceSettingsGenerales';
import SpaceSettingsInvitations from '../../components/settings/spaceSettings/SpaceSettingsInvitations';
import SpaceSettingsReqAccess from '../../components/settings/spaceSettings/SpaceSettingsReqAccess';

function SpaceSettingsPage() {
  const [space, setSpace] = useState({});

  useEffect(() => {
    const result = StorageService.getObjectStorage('spaceInfos');
    setSpace(result);
  }, []);

  return (
    <div>
      {space && (
        <>
          {console.log('plug', space.id)}
          <SpaceSettingsGeneral space={space} />
          <SpaceSettingsInvitations space={space} />
          <SpaceSettingsReqAccess space={space} />
        </>
      )}
    </div>
  );
}

export default SpaceSettingsPage;
