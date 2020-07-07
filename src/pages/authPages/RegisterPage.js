import React, { useState } from 'react';
import RegisterForm from '../../components/auth/registerForm/RegisterForm';
import EndPartContainer from '../../components/utilsTemplates/endPartContainer/EndPartContainer';
import '../../styles/pages/_registerPage.scss';

function RegisterPage() {
  const [registered, setIsRegistered] = useState(false);
  return (
    <div className="register">
      {registered ? (
        <EndPartContainer
          endMessage="Votre compte a bien été crée"
          endButtonLink="/login"
          endButtonText="Me connecter"
        />
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
