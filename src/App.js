import React from 'react';
import './App.css';
import Routes from './Pages/Routes'
import AuthService from './services/AuthService'

AuthService.init()

function App() {
  return (
    <div className="App">
      <Routes/>
    </div>
  );
}

export default App;
