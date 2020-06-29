import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundComponent() {
  return (
    <div>
      Page non trouvée (erreur 404).
      <Link to="/">Retourner à la page d'accueil</Link>
    </div>
  );
}

export default NotFoundComponent;
