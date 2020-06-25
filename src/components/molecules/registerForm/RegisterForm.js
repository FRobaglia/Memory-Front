import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from '../../../utils/forms';
import validateAuth from '../../../utils/validateAuth';
import SessionService from '../../../services/SessionService';
import UserContext from '../../../context/UserContext';

function RegisterForm() {
  // Custom hook useForm
  const [values, handleChange] = useForm();
  const [errorMessage, setErrorMessage] = useState({});
  const { user } = useContext(UserContext);

  if (user) return <Redirect to="/" />; // Si l'utilisateur est connecté, il ne peut pas voir la route /login (sans se déconnecter)

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(validateAuth(values)).length === 0) {
      setErrorMessage({});
      SessionService.createAccount(
        values.firstname,
        values.lastname,
        values.email,
        values.password,
        values.confirmPassword,
        errorMessage,
        setErrorMessage
      );
    } else {
      setErrorMessage(validateAuth(values));
    }
  };

  return (
    <div>
      <p>ceci est le register 2 : Se créer un compte utilisateur</p>

      <form action="/register" method="post" onSubmit={handleSubmit}>
        <label htmlFor="lastname">
          Nom
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={values.lastname || ''}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="firstname">
          Prénom
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={values.firstname || ''}
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

        <label htmlFor="password">
          Mot de passe
          <input
            type="password"
            name="password"
            id="password"
            value={values.password || ''}
            onChange={handleChange}
          />
        </label>
        {errorMessage && <p>{errorMessage.password}</p>}
        <label htmlFor="confirmpassword">
          Confirmer le mot de passe
          <input
            type="password"
            name="confirmPassword"
            id="confirmpassword"
            value={values.confirmPassword || ''}
            onChange={handleChange}
          />
        </label>
        {errorMessage && <p>{errorMessage.confirmPassword}</p>}
        <button type="submit">S'inscrire</button>
      </form>

      <Link to="/">Go back Home</Link>
      <Link to="/login">Se connecter</Link>
    </div>
  );
}

export default RegisterForm;
