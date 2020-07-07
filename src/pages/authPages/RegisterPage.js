import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/auth/registerForm/RegisterForm';
import '../../styles/pages/_registerPage.scss';

function RegisterPage() {
  const [registered, setIsRegistered] = useState(false);
  return (
    <div className="register">
      {registered ? (
        <div className="registered">
          <div className="header header--puzzle" />
          <div className="wrapper--flex">
            <h1 className="registered--text">Ton compte a bien été crée</h1>
            <div className="registered--image" />
            <Link to="/login" className="button button--full">
              Me connecter
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="header header--sitting" />
          <RegisterForm setIsRegistered={setIsRegistered} />
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
