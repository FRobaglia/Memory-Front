import React, { useState } from 'react';
import './App.css';
import Routes from './Pages/Routes';
import UserService from './services/UserService';

function App() {

  const [ isLoggedIn, setIsLoggedIn ] = useState('not logged in');

  return (
    <div className="App">
      <Routes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    </div>
  );
}

export default App;
