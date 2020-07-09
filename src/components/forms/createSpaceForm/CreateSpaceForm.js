import React, { useState } from 'react';
import moment from 'moment';
import { useForm, toFormData } from '../../../utils/forms';
import SpaceService from '../../../services/SpaceService';
import UploadInput from '../../utilsTemplates/UploadInput/UploadInput';

function CreateSpaceForm({ count, setCount, setSpaceIsCreated }) {
  const [values, handleChange] = useForm();
  const [errorMessage, setErrorMessage] = useState();

  async function createSpace(event) {
    event.preventDefault();
    if (moment(values.dateBirth).isBefore(values.dateDeath)) {
      setErrorMessage();
      const data = toFormData(values); // Nécessaire de créer une instance de FormData quand on a un formulaire avec des images
      await SpaceService.createNewSpace(data);
      setSpaceIsCreated(true);
    } else {
      setErrorMessage(
        'La date de naissance ne peut pas etre avant la date décès'
      );
      setCount(2);
      showStepForm();
    }
  }

  function showStepForm() {
    let content = '';
    switch (count) {
      case 0:
        content = (
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
                  required
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
                  required
                />
              </div>
            </div>
          </section>
        );
        break;
      case 1:
        content = (
          <section className="section">
            <div className="section__content">
              <h2>Sélectionner une image:</h2>
              <div className="upload-image-preview">
                {values.spaceImage && (
                  <div
                    className="image-preview"
                    style={{
                      backgroundImage: `url(${URL.createObjectURL(
                        values.spaceImage
                      )})`,
                    }}
                  />
                )}
                <UploadInput
                  className="button button--ajoute--link createSpace__button--img"
                  specificFieldName="spaceImage"
                  handleChange={handleChange}
                />
              </div>
            </div>
          </section>
        );
        break;
      case 2:
        content = (
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
        );
        break;
      case 3:
        content = (
          <section className="section section-relation">
            <div className="section__content">
              <h2>Description de la relation :</h2>
              <div className="input">
                <label htmlFor="relationDefunctText" className="input__label">
                  Je suis son/sa...
                </label>
                <input
                  className="input__field"
                  name="relationDefunctText"
                  id="relationDefunctText"
                  placeholder="Ami / Petit-fils / Voisine..."
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
        );
        break;
      case 4:
        content = (
          <section className="section">
            <div className="section__content upload-proof">
              <h2>
                Document attestant de la prise en charge des obsèques du défunt
                :
              </h2>
              <p className="text text--center">
                Pour créer un espace, une attestation rédigé par les pompes
                funèbres déclarant le décès et la prise en charge par le
                créateur/manager de l'espace est requise. Dans le cas contraire,
                nous vous invitons à vous rapprocher de la famille du défunt ou
                de toute personne faisant autorité pour créer cet espace.
              </p>
              <UploadInput
                specificFieldName="spaceProof"
                restrictedFileTypes="application/pdf"
                handleChange={handleChange}
              />
              <button
                className="button button--strong button--full--noPadding"
                type="submit"
              >
                Creer un espace
              </button>
            </div>
          </section>
        );
        break;
      default:
        content = 'test';
    }
    return content;
  }
  return (
    <div>
      <main className="main__createSpace">
        <div className="step-indicator">
          <ul className="step-indicator--list">
            <li className={count === 0 && 'active'} />
            <li className={count === 1 && 'active'} />
            <li className={count === 2 && 'active'} />
            <li className={count === 3 && 'active'} />
            <li className={count === 4 && 'active'} />
          </ul>
        </div>
        <form
          action="/spaces"
          method="post"
          className="wrapper--flex"
          onSubmit={createSpace}
        >
          {showStepForm()}
        </form>
      </main>
    </div>
  );
}

export default CreateSpaceForm;