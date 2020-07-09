import React, { useState } from 'react';
import StorageService from '../../../services/StorageService';
import './_disclaimer.scss';

function Disclaimer() {
  const [showDisclaimer, setShowDisclaimer] = useState(
    StorageService.getStorage('showDisclaimer') || true
  );

  const handleClick = () => {
    setShowDisclaimer(false);
    StorageService.setStorage('showDisclaimer', 'false');
  };

  return (
    <div
      className={`disclaimer ${JSON.parse(showDisclaimer) ? 'is-visible' : ''}`}
    >
      <div className="disclaimer__wrapper">
        <p className="disclaimer__text">
          Ce site a été réalisé à des fins pédagogiques dans le cadre du cursus
          Bachelor de l’école HETIC. Les contenus présentés n'ont pas fait
          l'objet d'une demande de droit d'utilisation. Ce site ne sera en aucun
          cas exploité à des fins commerciales et ne sera pas publié.
        </p>
        <button
          onClick={handleClick}
          type="button"
          className="button disclaimer__button"
        >
          Je comprends
        </button>
      </div>
    </div>
  );
}

export default Disclaimer;
