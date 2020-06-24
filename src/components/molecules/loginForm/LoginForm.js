import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import SessionService from '../../../services/SessionService';
import UserContext from '../../../context/UserContext';
import useForm from '../../../utils/useForm';
import Loading from '../loading/Loading';

function LoginForm({ location }) {
  const [values, handleChange] = useForm();
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <Loading />;

  const redirectAfterLogin = location.state
    ? location.state.from.pathname
    : '/'; // si l'utilisateur a été redirigé vers login en essaynt d'accéder à une RestrictedRoute, on la garde en mémoire pour le rediriger après le login. Sinon, on le redirgie vers la home après le login.

  if (user) return <Redirect to={redirectAfterLogin} />; // Si l'utilisateur est connecté, il ne peut pas voir la route /login (sans se déconnecter), on le redirige donc vers la page depuis laquelle il a essayé d'accéder à Login

  async function persistSession() {
    await SessionService.requestTokens(values.email, values.password);
    setUser(await SessionService.fetchUserData());
    setIsLoading(false); // fin du loading
  }

  const handleLogin = (event) => {
    event.preventDefault(); // Empêcher le refresh de la page lors de l'envoi du formulaire
    setIsLoading(true); // début du loading
    persistSession();
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">
          Adresse e-mail
          <input
            type="email"
            name="email"
            id="email"
            placeholder="test@example.com"
            value={values.email || ''}
            onChange={handleChange}
          />
        </label>
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
        <input type="submit" value="Me connecter" />
        <Link to="/">Home</Link>
        <Link to="/register">S'inscrire</Link>
      </form>
    </div>
  );
}

export default LoginForm;
