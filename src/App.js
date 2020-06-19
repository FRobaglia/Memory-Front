import React, { useState } from 'react';
import './App.css';
import Routes from './Pages/Routes'
import AuthService from './services/AuthService'
import UserService from './services/UserService';

AuthService.setInterceptors()

function App() {

  const [ isLoggedIn, setIsLoggedIn ] = useState('not logged in');

  return (
    <div className="App">
      <Routes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    </div>
  )
}

export default App
