import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Routes from './pages/routes/Routes'
import { UserContext } from './context/UserContext'
import AuthService from './services/AuthService';
import AxiosService from './services/AxiosService';

AxiosService.setInterceptors()

function App() {

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const value = useMemo(() => ({user, setUser}), [user, setUser])

  useEffect(() => {
    if (AuthService.getRefreshToken() !== null) {
      setIsLoading(true)

      async function persistSession() {
        await AuthService.refreshTokens()
        setUser(await AuthService.fetchUserData())
        setIsLoading(false)
      }

      persistSession()
    } else {
      console.log("Aucun refresh token trouvé, pas d'autologin possible.")
    }
  }, [])

  if (isLoading) return 'Fetching user data... (ici, on devrait render un component Loading)'

  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <Routes />
      </UserContext.Provider>
    </div>
  )
}

export default App
