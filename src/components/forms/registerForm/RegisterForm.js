import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm, toFormData } from '../../../utils/forms';
import validateAuth from '../../../utils/validateAuth';
import SessionService from '../../../services/SessionService';
import UserContext from '../../../context/UserContext';
import UploadInput from '../../utilsTemplates/UploadInput/UploadInput';
import './_registerForm.scss';
import LabelImage from '../../../assets/svg/add-image.svg';
import ErrorMessageContainer from '../../utilsTemplates/errorMessage/ErrorMessageContainer';

function RegisterForm({ setIsRegistered }) {
  // Custom hook useForm
  const [values, handleChange] = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const { user } = useContext(UserContext);
  const [selected, setSelected] = useState(false);

  if (user) return <Redirect to="/" />; // Si l'utilisateur est connecté, il ne peut pas voir la route /login (sans se déconnecter)

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.keys(validateAuth(values)).length === 0) {
      setErrorMessage({});
      const data = toFormData(values);
      await SessionService.createAccount(data, errorMessage, setErrorMessage);
      setIsRegistered(true);
    } else {
      setErrorMessage(validateAuth(values));
    }
  };

  function hideLabel() {
    setSelected(true);
  }

  return (
    <div className="wrapper--flex slideContainer">
      <section>
        <form
          action="/register"
          method="post"
          onSubmit={handleSubmit}
          className="section__content"
        >
          <Link to="/login" className="link">
            Déjà un compte ?
          </Link>
          <h2>Créer un compte</h2>
          <div className="upload-image-preview">
            <UploadInput
              labelImg={LabelImage}
              specificFieldName="userImage"
              handleChange={(e) => {
                handleChange(e);
                hideLabel();
              }}
              labelImgSelected={selected}
            />
            {values.userImage && (
              <div
                className="image-preview"
                style={{
                  backgroundImage: `url(${URL.createObjectURL(
                    values.userImage
                  )})`,
                }}
              />
            )}
          </div>
          {errorMessage && (
            <ErrorMessageContainer errorText={errorMessage.userImage} />
          )}

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
            {errorMessage && (
              <ErrorMessageContainer errorText={errorMessage.lastName} />
            )}
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
            {errorMessage && (
              <ErrorMessageContainer errorText={errorMessage.firstName} />
            )}
          </div>
          <div className="input">
            <label htmlFor="email" className="input__label">
              Email
            </label>
            <input
              className="input__field"
              type="email"
              name="email"
              id="email"
              value={values.email || ''}
              onChange={handleChange}
              placeholder="test@example.com"
            />
            {errorMessage && (
              <ErrorMessageContainer errorText={errorMessage.err401} />
            )}
            {errorMessage && (
              <ErrorMessageContainer errorText={errorMessage.email} />
            )}
          </div>
          <div className="input">
            <label htmlFor="passwordInitial" className="input__label">
              Mot de passe
            </label>
            <input
              className="input__field"
              type="password"
              name="passwordInitial"
              id="passwordInitial"
              value={values.passwordInitial || ''}
              onChange={handleChange}
            />
            {errorMessage && (
              <ErrorMessageContainer errorText={errorMessage.passwordInitial} />
            )}
          </div>
          <div className="input">
            <label htmlFor="passwordFinal" className="input__label">
              Confirmer le mot de passe
            </label>
            <input
              className="input__field"
              type="password"
              name="passwordFinal"
              id="passwordFinal"
              value={values.passwordFinal || ''}
              onChange={handleChange}
            />
            {errorMessage && (
              <ErrorMessageContainer errorText={errorMessage.passwordFinal} />
            )}
          </div>
          <button type="submit" className="button button--full--noPadding">
            S'inscrire
          </button>
        </form>
      </section>
    </div>
  );
}

export default RegisterForm;
