import React, { useState } from 'react';
import './App.css';
import Routes from './pages/Routes'
import AuthService from './services/AuthService'
// import UserService from './services/UserService';

AuthService.setInterceptors()

function App() {

  // const [ isLoggedIn, setIsLoggedIn ] = useState('not logged in');

  return (
    <div className="App">
      {/* <Routes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> */}
      <Routes />
    </div>
  )
}

export default App
