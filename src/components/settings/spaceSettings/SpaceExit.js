import React, { useState } from 'react';

function SpaceExit() {
  const [toggleBtn, setToggleBtn] = useState(false);
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
          <button type="submit" className="button spaceExit__button">
            Quitter l'espace
          </button>
        )}
      </div>
    </section>
  );
}

export default SpaceExit;
