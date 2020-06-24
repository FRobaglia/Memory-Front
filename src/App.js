import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Routes from './pages/routes/Routes';
import UserContext from './context/UserContext';
import SessionService from './services/SessionService';
import AxiosService from './services/AxiosService';
import Loading from './components/molecules/loading/Loading';
import 'moment/locale/fr';

AxiosService.setInterceptors();

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  async function persistSession() {
    await SessionService.refreshTokens();
    setUser(await SessionService.fetchUserData());
    setIsLoading(false);
  }

  useEffect(() => {
    if (SessionService.getRefreshToken() !== null) {
      persistSession();
    } else {
      console.log("Aucun refresh token trouvé, pas d'autologin possible.");
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <Routes />
      </UserContext.Provider>
    </div>
  );
}

export default App;
