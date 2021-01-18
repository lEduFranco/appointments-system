import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import SignIn from '../pages/SignIn';
import CreateAppointment from '../pages/CreateAppointment';
import CreateProvider from '../pages/CreateProvider';
import CreateClient from '../pages/CreateClient';
import Profile from '../pages/Profile';

import ListAppointments from '../pages/ListAppointments';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <PrivateRoute
      path="/create-clients"
      component={CreateClient}
      roles={['admin', 'secretary']}
    />
    <PrivateRoute
      path="/create-providers"
      component={CreateProvider}
      roles={['admin', 'rh']}
    />
    <PrivateRoute
      path="/create-appointments"
      component={CreateAppointment}
      roles={['admin', 'secretary']}
    />
    <PrivateRoute
      path="/profile"
      component={Profile}
      roles={['admin', 'provider', 'secretary', 'rh', 'client']}
    />

    <PrivateRoute
      path="/list-appointments"
      component={ListAppointments}
      roles={['admin', 'provider', 'secretary', 'client']}
    />
  </Switch>
);

export default Routes;
