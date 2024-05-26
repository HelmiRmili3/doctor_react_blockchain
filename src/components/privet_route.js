import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../contexts/auth_context";

function PrivateRoute({ children, userType, ...rest }) {
  const { userAuthenticated, user } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userAuthenticated && user.type === userType ? (
          children
        ) : (
          <redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
