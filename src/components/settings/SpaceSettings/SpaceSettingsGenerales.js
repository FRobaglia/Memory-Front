import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import SpaceService from '../../../services/SpaceService';

function SpaceSettingsGenerales({ space }) {
  // const spaceLocation = useLocation();
  console.log('fromGeneral', space);
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
        <button type="button" onClick={() => deleteSpace(space.id)}>
          Supprimer l'espace
        </button>
      </div>
    </div>
  );
}

export default SpaceSettingsGenerales;
