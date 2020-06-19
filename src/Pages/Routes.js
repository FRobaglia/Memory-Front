import React, { useState, useMemo } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register'
import { UserContext } from './../UserContext'

function Routes() {
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({user, setUser}), [user, setUser])

  return (
    <Switch>
      <UserContext.Provider value={value}>
        <Route path='/' exact component={Home}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
      </UserContext.Provider>
    </Switch>
  )
}

export default withRouter(Routes)