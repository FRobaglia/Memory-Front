import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import RestrictedRoute from './RestrictedRoute'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import UserAccountPage from './UserAccountPage'
import RegisterPage from './RegisterPage'
import SpacesListPage from './SpacesListPage'
import NotFoundPage from './NotFoundPage'
import { UserContext } from '../context/UserContext'

function Routes() {
  return (
    <Switch>
      <RestrictedRoute path='/' exact component={HomePage}/>
      <Route path='/login' exact component={LoginPage}/>
      <Route path='/register' exact component={RegisterPage}/>
      <RestrictedRoute path='/account' exact component={UserAccountPage}/>
      <RestrictedRoute path='/spaces' exact component={SpacesListPage}/>
      <Route component={NotFoundPage} /> {/* PageNotFound / 404 */}
    </Switch>
  )
}

export default withRouter(Routes)