import React from 'react';
import LoginForm from '../../components/auth/loginForm/LoginForm';
import '../../styles/pages/_loginPage.scss';

function LoginPage({ location }) {
  return (
    <div className="login">
      <div className="header header--puzzle header__img" />
      <LoginForm location={location} />
    </div>
  );
}

export default LoginPage;
