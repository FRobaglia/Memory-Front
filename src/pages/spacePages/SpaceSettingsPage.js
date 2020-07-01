import React, { useEffect, useContext } from 'react';
// import { useLocation, Redirect } from 'react-router-dom';
import SpaceContext from '../../context/SpaceContext';
import SpaceService from '../../services/SpaceService';
import SpaceSettingsGeneral from '../../components/settings/spaceSettings/SpaceSettingsGenerales';
import SpaceSettingsInvitations from '../../components/settings/spaceSettings/SpaceSettingsInvitations';
import SpaceSettingsReqAccess from '../../components/settings/spaceSettings/SpaceSettingsReqAccess';

function SpaceSettingsPage() {
  const { value, setValue } = useContext(SpaceContext);

  const spaceId = window.location.href
    .split('/')[4]
    .substring(window.location.href.split('/')[4].lastIndexOf('-') + 1);

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
