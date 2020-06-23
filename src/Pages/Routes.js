import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import RestrictedRoute from './RestrictedRoute'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import UserAccountPage from './UserAccountPage'
import RegisterPage from './RegisterPage'

function Routes() {

  return (
    <Switch>
      <RestrictedRoute path='/' exact component={HomePage}/>
      <Route path='/login' exact component={LoginPage}/>
      <Route path='/register' exact component={RegisterPage}/>
      <RestrictedRoute path='/account' exact component={UserAccountPage}/>
    </Switch>
  )
}

export default withRouter(Routes)