import React, { useState, useMemo } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import UserAccountPage from './UserAccountPage';
import RegisterPage from './RegisterPage'
import { UserContext } from '../context/UserContext'

function Routes() {
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({user, setUser}), [user, setUser])

  return (
    <Switch>
      <UserContext.Provider value={value}>
        <Route path='/' exact component={HomePage}/>
        <Route path='/login' exact component={LoginPage}/>
        <Route path='/register' exact component={RegisterPage}/>
        <Route path='/account' exact component={UserAccountPage}/>
      </UserContext.Provider>
    </Switch>
  )
}

export default withRouter(Routes)