import React, { useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import SpaceService from '../services/SpaceService';

function SpaceSettingsPage() {
  const spaceLocation = useLocation();
  // const [deleteSuccess, setDeleteSuccess] = useState('succes');
  async function deleteSpace(id) {
    // setDeleteSuccess(await SpaceService.deleteSpace(id));
    console.log(`espace ${id} supprime`);
    // if (deleteSuccess === 'succes') return <Redirect to="/" />;
  }
  console.log(spaceLocation);
  return (
    <div>
      <button type="button" onClick={() => deleteSpace(spaceLocation.state.id)}>
        Supprimer l'espace
      </button>
    </div>
  );
}

export default SpaceSettingsPage;
