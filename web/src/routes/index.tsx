import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import SignIn from '../pages/Signin';
import SigninRestricted from '../pages/SigninRestricted';
import CreateAppointment from '../pages/CreateAppointment';
import CreateProvider from '../pages/CreateProvider';
import CreateClient from '../pages/CreateClient';
import Profile from '../pages/Profile';

import ListAppointments from '../pages/ListAppointments';
import ListProviders from '../pages/ListProviders';
import ListClient from '../pages/ListClient';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/restricted" exact component={SigninRestricted} />
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
    <PrivateRoute
      path="/list-providers"
      component={ListProviders}
      roles={['admin', 'secretary', 'rh']}
    />
    <PrivateRoute
      path="/list-client"
      component={ListClient}
      roles={['admin', 'secretary']}
    />
  </Switch>
);

export default Routes;
