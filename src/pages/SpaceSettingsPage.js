import React, { useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import SpaceService from '../services/SpaceService';

function SpaceSettingsPage() {
  const spaceLocation = useLocation();
  const [deleteSuccess, setDeleteSuccess] = useState();
  async function deleteSpace(id) {
    setDeleteSuccess(await SpaceService.deleteSpace(id));
  }
  if (deleteSuccess) return <Redirect to="/" />;
  return (
    <div>
      <h1>Générales</h1>
      <button type="button" onClick={() => deleteSpace(spaceLocation.state.id)}>
        Supprimer l'espace
      </button>
    </div>
  );
}

export default SpaceSettingsPage;
