import React, { useState } from 'react';
import '../../styles/pages/createSpace.scss';
import '../../styles/layout/container.scss';
import NavBar from '../../components/nav/NavBar';
import EndPartContainer from '../../components/utilsTemplates/endPartContainer/EndPartContainer';
import CreateSpaceForm from '../../components/forms/createSpaceForm/CreateSpaceForm';

function CreateSpace() {
  const [count, setCount] = useState(0);
  const [spaceIsCreated, setSpaceIsCreated] = useState(false);

  return (
    <>
      {spaceIsCreated && (
        <EndPartContainer
          endMessage="Votre espace a bien été créer"
          endButtonLink="/account"
          endButtonText="Revenir a mes espaces"
        />
      )}
      {!spaceIsCreated && (
        <div className="body--slider scroll--no body--creeEspace">
          {/* {changeNavBar && ( */}
          {count > 0 && (
            <nav className="userAccount__navContainer header__main">
              <ul className="userAccount__nav">
                <li>
                  <button
                    type="button"
                    aria-label="backButton"
                    className="button button--return userAccount__nav--logo "
                    onClick={() => setCount(count - 1)}
                  />
                </li>
              </ul>
            </nav>
          )}
          {/* {!changeNavBar && <NavBar />} */}
          {count === 0 && <NavBar />}
          <header className="header header--30vh header--sitting" />
          {count < 4 && !spaceIsCreated && (
            <button
              type="button"
              className="button button--strong button--full button--end button--next"
              onClick={() => setCount(count + 1)}
            >
              Étape suivante
            </button>
          )}
          <CreateSpaceForm
            count={count}
            setCount={setCount}
            setSpaceIsCreated={setSpaceIsCreated}
          />
        </div>
      )}
    </>
  );
}

export default CreateSpace;
