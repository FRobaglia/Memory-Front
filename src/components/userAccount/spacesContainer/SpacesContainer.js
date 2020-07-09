import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './spacesContainer.scss';
import SpaceCategoryList from '../../space/spaceCategoryList/SpaceCategoryList';

function SpacesContainer() {
  const [showManagerSpaces, setShowManagerSpaces] = useState(true);
  const [showSubscriberSpaces, setShowSubscriberSpaces] = useState(true);
  const [showNotValidatedSpaces, setShowNotValidatedSpaces] = useState(true);

  return (
    <section className="section section--espaces">
      <h2>Tous mes espaces</h2>
      <Link
        to="/create"
        className="button button--full button--full--noPadding button--creEspace--top button-link button__link--create"
      >
        + Créer un espace
      </Link>
      <SpaceCategoryList
        showSpaces={showManagerSpaces}
        setShowSpaces={setShowManagerSpaces}
        spaceCategoryTitle="Vous êtes manager de ces espaces."
        spaceCategoryName="manager"
      />
      <SpaceCategoryList
        showSpaces={showSubscriberSpaces}
        setShowSpaces={setShowSubscriberSpaces}
        spaceCategoryTitle="Vous êtes membre de ces espaces."
        spaceCategoryName="subscriber"
      />
      <SpaceCategoryList
        showSpaces={showNotValidatedSpaces}
        setShowSpaces={setShowNotValidatedSpaces}
        spaceCategoryTitle="Espaces en attente de validation."
        spaceCategoryName="waiting"
      />
    </section>
  );
}

export default SpacesContainer;
