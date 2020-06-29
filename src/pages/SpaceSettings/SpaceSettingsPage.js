import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useLocation, Redirect } from 'react-router-dom';
import SpaceService from '../../services/SpaceService';
import StorageService from '../../services/StorageService';
// import spaceID from '../../utils/getSpaceID';

function SpaceSettingsPage() {
  const spaceLocation = useLocation();
  const [space, setSpace] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState();

  useEffect(() => {
    const result = SpaceService.spaceInfosFromStorage(
      StorageService.getObjectStorage('spaceInfos'),
      'space'
    );
    setSpace(result);
  }, []);

  async function deleteSpace(id) {
    setDeleteSuccess(await SpaceService.deleteSpace(id));
  }

  if (deleteSuccess) return <Redirect to="/" />;
  return (
    <div>
      {space && (
        <>
          <h1>
            Salut {space.firstName} {space.lastName}
          </h1>
          <p>
            {moment(space.dateBirth).format('D MMMM YYYY')} -
            {moment(space.dateDeath).format('D MMMM YYYY')}
          </p>
        </>
      )}
      <div>
        <button
          type="button"
          onClick={() => deleteSpace(spaceLocation.state.id)}
        >
          Supprimer l'espace
        </button>
      </div>
    </div>
  );
}

export default SpaceSettingsPage;
