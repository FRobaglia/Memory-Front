import React, { useEffect, useContext } from 'react';
// import moment from 'moment';
// import { useLocation, Redirect } from 'react-router-dom';
import SpaceContext from '../../context/SpaceContext';
import SpaceService from '../../services/SpaceService';
// import StorageService from '../../services/StorageService';
import spaceId from '../../utils/getSpaceID';
import SpaceSettingsGeneral from '../../components/settings/spaceSettings/SpaceSettingsGenerales';
import SpaceSettingsInvitations from '../../components/settings/spaceSettings/SpaceSettingsInvitations';
import SpaceSettingsReqAccess from '../../components/settings/spaceSettings/SpaceSettingsReqAccess';

function SpaceSettingsPage() {
  const { value, setValue } = useContext(SpaceContext);

  useEffect(() => {
    getFocusedSpace();
  }, []);

  async function getFocusedSpace() {
    const result = await SpaceService.focusSpace(spaceId);
    setValue(result.space);
  }

  return (
    <div>
      {value && (
        <>
          <SpaceSettingsGeneral />
          <SpaceSettingsInvitations />
          <SpaceSettingsReqAccess />
        </>
      )}
    </div>
  );
}

export default SpaceSettingsPage;
