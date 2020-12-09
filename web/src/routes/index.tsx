import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import SignIn from '../pages/Signin';
import SigninRestricted from '../pages/SigninRestricted';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import CreateAppointment from '../pages/CreateAppointment';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import ListAppointments from '../pages/ListAppointments';
import ListProviders from '../pages/ListProviders';
import ListClient from '../pages/ListClient';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/restricted" exact component={SigninRestricted} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <PrivateRoute
      path="/signup"
      component={SignUp}
      roles={['admin', 'secretary', 'rh']}
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
      path="/dashboard"
      component={Dashboard}
      roles={['admin', 'provider', 'secretary', 'client']}
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
