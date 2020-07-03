import React from 'react';
import LoginForm from '../../components/auth/loginForm/LoginForm';

function LoginPage({ location }) {
  return (
    <div>
      <div className="header header--puzzle header__img" />
      <LoginForm location={location} />;
    </div>
  );
}

export default LoginPage;
