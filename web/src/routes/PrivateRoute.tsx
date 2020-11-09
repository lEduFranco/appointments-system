import React from 'react';
import {
  Route as ReactDomRoute,
  RouteProps as ReactDomRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDomRouteProps {
  roles?: Array<string>;
  component: React.ComponentType;
}

const PrivateRoute: React.FC<RouteProps> = ({
  roles = [],
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDomRoute
      {...rest}
      render={(props) => {
        if (!user) {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          );
        }

        if (!roles.includes(user.role)) {
          return <Redirect to={{ pathname: '/' }} />;
        }

        return <Component />;
      }}
    />
  );
};

export default PrivateRoute;
