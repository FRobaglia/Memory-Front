// Ce component est utilisé pour rediriger un utilisateur non connecté
// Si l'utilisateur est connecté : l'utilisateur arrive sur la page demandée
// Sinon : l'utilisateur est redirigé vers la page de login

import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: `/login`, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default RestrictedRoute;
