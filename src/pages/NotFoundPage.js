import React from 'react';
import EndPartContainer from '../components/utilsTemplates/endPartContainer/EndPartContainer';
import ErrorImage from '../assets/svg/door-guy.svg';

function NotFoundPage() {
  return (
    <EndPartContainer
      endMessage="Page non trouvée (erreur 404)."
      endImage={ErrorImage}
      endButtonLink="/"
      endButtonText="Retourner à la page d'accueil"
    />
  );
}

export default NotFoundPage;
