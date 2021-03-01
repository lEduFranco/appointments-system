import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import CreateAppointment from '../pages/CreateAppointment';
import CreateProvider from '../pages/CreateProvider';
import ListProviders from '../pages/ListProviders';
import CreateClient from '../pages/CreateClient';
import ListClient from '../pages/ListClient';
import Reports from '../pages/Reports';

import ListAppointments from '../pages/ListAppointments';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <PrivateRoute
      path="/dashboard"
      component={Dashboard}
      roles={['admin', 'secretary', 'rh']}
    />

    <PrivateRoute
      path="/create-clients"
      component={CreateClient}
      roles={['admin', 'secretary']}
    />

    <PrivateRoute
      path="/list-clients"
      component={ListClient}
      roles={['admin', 'secretary']}
    />

    <PrivateRoute
      path="/create-providers"
      component={CreateProvider}
      roles={['admin', 'rh']}
    />

    <PrivateRoute
      path="/list-providers"
      component={ListProviders}
      roles={['admin', 'rh']}
    />

    <PrivateRoute
      path="/create-appointments"
      component={CreateAppointment}
      roles={['admin', 'secretary']}
    />

    <PrivateRoute
      path="/list-appointments"
      component={ListAppointments}
      roles={['admin', 'secretary']}
    />

    <PrivateRoute
      path="/reports"
      component={Reports}
      roles={['admin', 'secretary']}
    />
  </Switch>
);

export default Routes;
