import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import SpaceSettingsContainer from '../../components/settings/SpaceSettings/SpaceSettingsContainer';
import NavSettings from '../../components/nav/NavSettings';
import SpaceService from '../../services/SpaceService';

function SpaceSettingsPage() {
  const spaceLocation = useLocation();
  const [spaceData, setSpaceData] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState();

  async function deleteSpace(id) {
    setDeleteSuccess(await SpaceService.deleteSpace(id));
  }

  useEffect(() => {
    SpaceService.focusSpace(spaceLocation.state.id).then((response) =>
      setSpaceData(response)
    );
  }, []);

  if (deleteSuccess) return <Redirect to="/" />;

  return (
    <div>
      <NavSettings space={spaceData} />
      {console.log(spaceLocation.state.id)}
      {console.log(spaceData)}
      <h1>Générales</h1>
      <button type="button" onClick={() => deleteSpace(spaceLocation.state.id)}>
        Supprimer l'espace
      </button>
      <SpaceSettingsContainer space={spaceData} />
    </div>
  );
}

export default SpaceSettingsPage;
