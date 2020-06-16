import React from 'react';
import './App.css';
import Routes from './Pages/Routes'
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Routes/>
      <Login />
    </div>
  );
}

export default App;
