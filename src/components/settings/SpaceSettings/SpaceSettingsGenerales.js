import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import SpaceService from '../../../services/SpaceService';
import SpaceContext from '../../../context/SpaceContext';

function SpaceSettingsGenerales() {
  // const spaceLocation = useLocation();
  const { value } = useContext(SpaceContext);

  // console.log('fromGeneral', space);
  const [deleteSuccess, setDeleteSuccess] = useState();

  async function deleteSpace(id) {
    setDeleteSuccess(await SpaceService.deleteSpace(id));
  }
  if (deleteSuccess) return <Redirect to="/" />;
  return (
    <div>
      <h1>
        tok {value.firstName} {value.lastName}
      </h1>
      <p>
        {moment(value.dateBirth).format('D MMMM YYYY')} -
        {moment(value.dateDeath).format('D MMMM YYYY')}
      </p>

      <div>
        <button type="button" onClick={() => deleteSpace(value.id)}>
          Supprimer l'espace
        </button>
      </div>
    </div>
  );
}

export default SpaceSettingsGenerales;
