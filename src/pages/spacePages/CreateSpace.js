import React, { useState, useRef, useEffect, createRef } from 'react';
import moment from 'moment';
import { useForm, toFormData } from '../../utils/forms';
import SpaceService from '../../services/SpaceService';
import UploadInput from '../../components/utilsTemplates/UploadInput/UploadInput';
import './createSpace.scss';
import '../../styles/layout/container.scss';
import NavBar from '../../components/nav/NavBar';
// import NavBarPrevStep from '../../components/nav/NavBarPrevStep';
import iconReturn from '../../assets/icons/icon--return.svg';

function CreateSpace() {
  const [values, handleChange] = useForm();
  const [errorMessage, setErrorMessage] = useState();
  // const [nextBtnText, setNextBtnText] = useState('Étape suivante');
  const [count, setCount] = useState(0);
  const [wrapper, setWrapper] = useState(null);
  const [isLastStep, setIsLastStep] = useState(false);
  const [changeNavBar, setChangeNavBar] = useState(false);
  const wrapperScroll = useRef(null);

  useEffect(() => {
    setWrapper(wrapperScroll.current);
    if (wrapper) {
      setChangeNavBar(count !== 0);
      setIsLastStep(count === 4);
      wrapper.style.transform = `translateX(${count * -100}vw)`;
    }
  }, [count]);

  async function createSpace(event) {
    event.preventDefault();
    if (moment(values.dateBirth).isBefore(values.dateDeath)) {
      setErrorMessage();
      const data = toFormData(values); // Nécessaire de créer une instance de FormData quand on a un formulaire avec des images
      await SpaceService.createNewSpace(data);
      // getSpaces();
    } else {
      setErrorMessage(
        'La date de naissance ne peut pas etre avant la date décès'
      );
    }
  }

  return (
    <div className="body--slider scroll--no body--creeEspace">
      {changeNavBar && (
        <nav className="userAccount__navContainer header__main">
          <ul className="userAccount__nav">
            <li>
              <img
                src={iconReturn}
                alt="return"
                className="userAccount__nav--logo"
                onClick={() => setCount(count - 1)}
              />
            </li>
          </ul>
        </nav>
      )}
      {!changeNavBar && <NavBar />}
      <header className="header header--30vh header--sitting"></header>
      {!isLastStep && (
        <button
          // ref={nextStepBtn}
          type="button"
          className="button button--strong button--full button--end button--next"
          onClick={() => setCount(count + 1)}
        >
          Étape suivante
        </button>
      )}
      {/* {isLastStep && (
        <button
          type="submit"
          className="button button--strong button--full button--end button--next"
        >
          Creer un espace
        </button>
      )} */}
      <main className="main__createSpace">
        <div className="wrapper--flex" ref={wrapperScroll}>
          {/* {isLastStep && (
            <button type="submit" className="button button--end button--next">
              Creer un espace
            </button>
          )} */}
          <form
            action="/spaces"
            method="post"
            className="wrapper--flex createSpace__wrapper"
            onSubmit={createSpace}
          >
            <section className="section">
              <div className="section__content">
                <h2>Créer un espace pour :</h2>
                <div className="input">
                  <label htmlFor="lastName" className="input__label">
                    Nom
                  </label>
                  <input
                    className="input__field"
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={values.lastName || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="firstName" className="input__label">
                    Prénom
                  </label>
                  <input
                    className="input__field"
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={values.firstName || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>
            <section className="section">
              <div className="section__content">
                <h2>Sélectionner une image:</h2>
                <div className="">
                  {values.userImage && (
                    <div>
                      <img
                        src={URL.createObjectURL(values.spaceImage)}
                        alt="spacePic"
                        width="100"
                        height="100"
                        className=""
                      />
                    </div>
                  )}
                  <UploadInput
                    className="button button--ajoute--link createSpace__button--img"
                    specificFieldName="spaceImage"
                    handleChange={handleChange}
                    // imgSelected={selected}
                  />
                </div>
              </div>
            </section>
            <section className="section">
              <div className="section__content">
                <h2>Ajouter des dates :</h2>
                <div className="input">
                  <label htmlFor="dateBirth" className="input__label">
                    Date de naissance
                  </label>
                  <input
                    className="input__field"
                    type="date"
                    name="dateBirth"
                    id="dateBirth"
                    value={values.dateBirth || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="dateDeath" className="input__label">
                    Date de décès
                  </label>
                  <input
                    className="input__field"
                    type="date"
                    name="dateDeath"
                    id="dateDeath"
                    value={values.dateDeath || ''}
                    onChange={handleChange}
                  />
                </div>
                {errorMessage && <p>{errorMessage}</p>}
              </div>
            </section>
            <section className="section">
              <div className="section__content">
                <h2>Description de la relation :</h2>
                <div className="input">
                  <label htmlFor="relationDefunctText" className="input__label">
                    Je suis son/sa...
                  </label>
                  <textarea
                    className="input__field"
                    name="relationDefunctText"
                    id="relationDefunctText"
                    placeholder="ami depuis 20 ans / petit-fils / voisine..."
                    cols="30"
                    rows="10"
                    value={values.relationDefunctText || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="description" className="input__label">
                    Qui etait ce ? (facultatif, pourra être renseigné
                    ultérieurement)
                  </label>
                  <textarea
                    className="input__field"
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    value={values.description || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>
            <section className="section">
              <div className="section__content">
                <h2>
                  Document attestant de la prise en charge des obsèques du
                  défunt :
                </h2>
                <p className="text text--center">
                  Pour créer un espace, une attestation rédigé par les pompes
                  funèbres déclarant le décès et la prise en charge par le
                  créateur/manager de l'espace est requise. Dans le cas
                  contraire, nous vous invitons à vous rapprocher de la famille
                  du défunt ou de toute personne faisant autorité pour créer cet
                  espace.
                </p>
                <UploadInput
                  specificFieldName="spaceProof"
                  restrictedFileTypes="application/pdf"
                  handleChange={handleChange}
                />
              </div>
            </section>
            {/* {isLastStep && (
              <button
                type="submit"
                className="button button--strong button--full button--end button--next"
              >
                Creer un espace
              </button>
            )} */}

            <button type="submit">Creer un espace</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateSpace;
