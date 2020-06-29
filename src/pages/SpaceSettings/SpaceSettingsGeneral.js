import React, { useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import moment from 'moment';
import SpaceService from '../../services/SpaceService';

function SpaceSettingsGeneral({ space }) {
  const spaceLocation = useLocation();

  const [deleteSuccess, setDeleteSuccess] = useState();

  async function deleteSpace(id) {
    setDeleteSuccess(await SpaceService.deleteSpace(id));
  }
  if (deleteSuccess) return <Redirect to="/" />;
  return (
    <div>
      <h1>
        tok {space.firstName} {space.lastName}
      </h1>
      <p>
        {moment(space.dateBirth).format('D MMMM YYYY')} -
        {moment(space.dateDeath).format('D MMMM YYYY')}
      </p>

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

export default SpaceSettingsGeneral;
