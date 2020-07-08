import React, { useState, useMemo } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import SpaceContext from '../../context/SpaceContext';
import RestrictedRoute from './RestrictedRoute';
import HomePage from '../HomePage';
import LoginPage from '../authPages/LoginPage';
import UserAccountPage from '../userAccountPages/UserAccountPage';
import UserModifyPage from '../userAccountPages/UserModifyPage';
import RegisterPage from '../authPages/RegisterPage';
// import SpacesListPage from '../SpacesListPage';
import SpaceMemoryPage from '../spacePages/SpaceMemoryPage';
import NotFoundPage from '../NotFoundPage';
import BackOfficePage from '../BackOfficePage';
import SpaceSettingsPage from '../spacePages/SpaceSettingsPage';
import SpaceMembersPage from '../spacePages/SpaceMembersPage';
import CreateSpace from '../spacePages/CreateSpace';
import CreatePost from '../spacePages/CreatePost';

function Routes() {
  const [value, setValue] = useState({});
  const spaceID = useMemo(() => ({ value, setValue }), [value, setValue]);

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/register" exact component={RegisterPage} />
      <RestrictedRoute path="/account" exact component={UserAccountPage} />
      <RestrictedRoute path="/create" exact component={CreateSpace} />
      <RestrictedRoute
        path="/space/:slug/createPost"
        exact
        component={CreatePost}
      />
      <RestrictedRoute
        path="/account/modify"
        exact
        component={UserModifyPage}
      />
      <SpaceContext.Provider value={spaceID}>
        {/* <RestrictedRoute path="/spaces" exact component={SpacesListPage} /> */}
        <RestrictedRoute
          path="/space/:slug"
          exact
          component={SpaceMemoryPage}
        />
        <RestrictedRoute path="/admin" exact component={BackOfficePage} />
        <RestrictedRoute
          path="/space/:slug/settings/"
          exact
          component={SpaceSettingsPage}
        />
        <RestrictedRoute
          path="/space/:slug/members"
          exact
          component={SpaceMembersPage}
        />
      </SpaceContext.Provider>
      <Route component={NotFoundPage} /> {/* PageNotFound / 404 */}
    </Switch>
  );
}

export default withRouter(Routes);
