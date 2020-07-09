import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import SpaceContext from '../../../context/SpaceContext';
import SpaceService from '../../../services/SpaceService';

function SpaceExit() {
  const { value } = useContext(SpaceContext);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [unsubscribeSuccess, setUnsubscribeSuccess] = useState(false);

  async function unsubscribe() {
    await SpaceService.unSubcribeSpace(value.space.id);
    setUnsubscribeSuccess(true);
  }

  if (unsubscribeSuccess) return <Redirect to="/account" />;

  return (
    <section className="section">
      <div className="section__content">
        <h2>Quitter l'espace</h2>
        <div className="switchGroup spaceExit__switchGroup">
          <div
            role="switch"
            aria-checked="false"
            aria-hidden="true"
            onClick={() => setToggleBtn(!toggleBtn)}
            className={`toggle-btn ${toggleBtn ? 'active' : ''}`}
          >
            <input type="checkbox" checked className="cb-value" />
            <span className="round-btn" />
          </div>
          <p className="text">
            Je suis sûr de vouloir quitter cet espace et ne plus participer au
            rassemblement de souvenirs
          </p>
        </div>
        {toggleBtn && (
          <button
            type="submit"
            onClick={unsubscribe}
            className="button spaceExit__button"
          >
            Quitter l'espace
          </button>
        )}
      </div>
    </section>
  );
}

export default SpaceExit;
