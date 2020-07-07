import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import SpaceService from '../../../services/SpaceService';
import SpaceContext from '../../../context/SpaceContext';
import '../../../styles/layout/_button.scss';

function SpaceSettingsGenerales() {
  const { value } = useContext(SpaceContext);
  // console.log('fromGeneral', space);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  async function deleteSpace(id) {
    await SpaceService.deleteSpace(id);
    setDeleteSuccess(true);
  }
  if (deleteSuccess) return <Redirect to="/account" />;
  return (
    <section className="section section--info info">
      <div className="section__content">
        {value.space && (
          <>
            <h2 className="">Informations</h2>
            <div className="info__intro">
              <img
                className="info__intro__image"
                src={value.space.image.url}
                alt={`${value.space.firstName}-${value.space.lastName}`}
              />
              <div className="info__intro__textBox">
                <p className="info__intro__textBox__headline">
                  {value.space.firstName} {value.space.lastName}
                </p>
                <p className="info__intro__textBox__subheadline">
                  {moment(value.space.dateBirth).format('D MMMM YYYY')} -
                  {moment(value.space.dateDeath).format('D MMMM YYYY')}
                </p>
              </div>
            </div>

            <div className="textGroup">
              <h3>Supprimer l'espace</h3>
              <p className="text">
                En supprimant l'espace, vous décidez de perdre pour toujours les
                souvenirs rassemblés.
              </p>
            </div>
            <div className="switchGroup">
              <div className="toggle-btn">
                <input type="checkbox" checked className="cb-value" />
                <span className="round-btn"></span>
              </div>
              <p className="text">
                Je suis sûr(e) de vouloir supprimer cet espace et toutes les
                données liées à celui-ci.
              </p>
            </div>
            <button
              type="button"
              className="button button--strong button--full"
              onClick={() => deleteSpace(value.space.id)}
            >
              Supprimer l'espace
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default SpaceSettingsGenerales;
