import React from 'react';
import { Link } from 'react-router-dom';

function Forbidden({ message }) {
  return (
    <div>
      {message}
      <Link to="/">Retourner à la page d'accueil</Link>
    </div>
  );
}

export default Forbidden;
