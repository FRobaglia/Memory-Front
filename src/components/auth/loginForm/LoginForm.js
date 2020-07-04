import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import SessionService from '../../../services/SessionService';
import UserContext from '../../../context/UserContext';
import { useForm } from '../../../utils/forms';
import Loading from '../../utilsTemplates/loading/Loading';
import './_loginForm.scss';

function LoginForm({ location }) {
  const [values, handleChange] = useForm();
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <Loading />;

  const redirectAfterLogin = location.state
    ? location.state.from.pathname
    : '/account'; // si l'utilisateur a été redirigé vers login en essaynt d'accéder à une RestrictedRoute, on la garde en mémoire pour le rediriger après le login. Sinon, on le redirgie vers la home après le login.

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
    <div className="wrapper--flex">
      <section>
        <form onSubmit={handleLogin} className="section__content">
          <Link to="/register" className="link">
            Pas encore de compte ?
          </Link>
          <h2>Se Connecter:</h2>
          <div className="input">
            <label htmlFor="email" className="input__label">
              Adresse e-mail
            </label>
            <input
              className="input__field"
              type="email"
              name="email"
              id="email"
              placeholder="test@example.com"
              value={values.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label htmlFor="password" className="input__label">
              Mot de passe
            </label>
            <input
              className="input__field"
              type="password"
              name="password"
              id="password"
              value={values.password || ''}
              onChange={handleChange}
            />
          </div>

          <input
            type="submit"
            className="button button--full--noPadding"
            value="Se connecter"
          />
          {/* <Link to="/">Home</Link> */}
        </form>
      </section>
    </div>
  );
}

export default LoginForm;
