import React from 'react'
import './App.css'
import Routes from './Pages/Routes'
import AuthService from './services/AuthService'

AuthService.setInterceptors()

function App() {
  return (
    <div className="App">
      <Routes/>
    </div>
  )
}

export default App
