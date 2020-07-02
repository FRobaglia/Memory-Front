import React, { useState, useContext } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useForm, toFormData } from '../../../utils/forms';
import validateAuth from '../../../utils/validateAuth';
import SessionService from '../../../services/SessionService';
import UserContext from '../../../context/UserContext';
import UploadInput from '../../utilsTemplates/UploadInput/UploadInput';

function RegisterForm() {
  // Custom hook useForm
  const [values, handleChange] = useForm();
  const [errorMessage, setErrorMessage] = useState({});
  const { user } = useContext(UserContext);
  const history = useHistory();

  if (user) return <Redirect to="/" />; // Si l'utilisateur est connecté, il ne peut pas voir la route /login (sans se déconnecter)

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.keys(validateAuth(values)).length === 0) {
      setErrorMessage({});
      const data = toFormData(values);
      await SessionService.createAccount(data, errorMessage, setErrorMessage);
      history.push('/account');
    } else {
      setErrorMessage(validateAuth(values));
    }
  };

  return (
    <div>
      <p>Créer un compte</p>

      <form action="/register" method="post" onSubmit={handleSubmit}>
        <UploadInput
          labelText="Photo de profil"
          specificFieldName="userImage"
          handleChange={handleChange}
        />
        <label htmlFor="lastName">
          Nom
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={values.lastName || ''}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="firstName">
          Prénom
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={values.firstName || ''}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            value={values.email || ''}
            onChange={handleChange}
            placeholder="test@example.com"
          />
        </label>
        {errorMessage && <p>{errorMessage.err401}</p>}
        {errorMessage && <p>{errorMessage.email}</p>}

        <label htmlFor="passwordInitial">
          Mot de passe
          <input
            type="password"
            name="passwordInitial"
            id="passwordInitial"
            value={values.passwordInitial || ''}
            onChange={handleChange}
          />
        </label>
        {errorMessage && <p>{errorMessage.passwordInitial}</p>}
        <label htmlFor="passwordFinal">
          Confirmer le mot de passe
          <input
            type="password"
            name="passwordFinal"
            id="passwordFinal"
            value={values.passwordFinal || ''}
            onChange={handleChange}
          />
        </label>
        {errorMessage && <p>{errorMessage.passwordFinal}</p>}
        <button type="submit">S'inscrire</button>
      </form>

      <Link to="/">Go back Home</Link>
      <Link to="/login">Se connecter</Link>
    </div>
  );
}

export default RegisterForm;
