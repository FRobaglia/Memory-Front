import React, { useState, useMemo } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import RestrictedRoute from './RestrictedRoute';
import HomePage from '../HomePage';
import LoginPage from '../authPages/LoginPage';
import UserAccountPage from '../UserAccountPage';
import RegisterPage from '../authPages/RegisterPage';
// import SpacesListPage from '../SpacesListPage';
import SpaceMemoryPage from '../spacePages/SpaceMemoryPage';
import NotFoundPage from '../NotFoundPage';
import BackOfficePage from '../BackOfficePage';
import SpaceContext from '../../context/SpaceContext';
import SpaceSettingsPage from '../SpaceSettings/SpaceSettingsPage';
import SpaceSettingsReqAccess from '../SpaceSettings/SpaceSettingsReqAccess';
import SpaceSettingsInvitations from '../SpaceSettings/SpaceSettingsInvitations';
// import SpaceSettingsMembers from '../SpaceSettings/SpaceSettingsMembers';

function Routes() {
  const [value, setValue] = useState({});
  const spaceID = useMemo(() => ({ value, setValue }), [value, setValue]);

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/register" exact component={RegisterPage} />
      <RestrictedRoute path="/account" exact component={UserAccountPage} />
      <SpaceContext.Provider value={spaceID}>
        {/* <RestrictedRoute path="/spaces" exact component={SpacesListPage} /> */}
        <RestrictedRoute
          path="/space/:slug"
          exact
          component={SpaceMemoryPage}
        />
        <RestrictedRoute path="/admin" exact component={BackOfficePage} />
        <RestrictedRoute
          path="/space/:slug/settings/:slug"
          exact
          component={SpaceSettingsPage}
        />
        {/* <RestrictedRoute
          path="/space/:slug/settings/invitation"
          exact
          component={SpaceSettingsInvitations}
        />
        <RestrictedRoute
          path="/space/:slug/settings/request"
          exact
          component={SpaceSettingsReqAccess}
        /> */}
      </SpaceContext.Provider>
      <Route component={NotFoundPage} /> {/* PageNotFound / 404 */}
    </Switch>
  );
}

export default withRouter(Routes);
