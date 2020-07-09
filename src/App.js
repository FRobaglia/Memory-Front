import React, { useState, useEffect, useMemo } from 'react';
import { Route } from 'react-router-dom';
import './styles/main.scss';
import Routes from './pages/routes/Routes';
import UserContext from './context/UserContext';
import SessionService from './services/SessionService';
import AxiosService from './services/AxiosService';
import StorageService from './services/StorageService';
import Loading from './components/utilsTemplates/loading/Loading';
import Disclaimer from './components/utilsTemplates/disclaimer/Disclaimer';
import NotFoundPage from './pages/NotFoundPage';
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
      <Disclaimer />
      <UserContext.Provider value={value}>
        <Routes />
      </UserContext.Provider>
    </div>
  );
}

export default App;
