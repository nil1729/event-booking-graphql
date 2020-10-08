import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function PrivateRoute({ component: Component, ...rest }) {
  const authContext = useContext(AuthContext);
  const { isAuth, authLoading } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth && !authLoading ? (
          <Redirect to="/auth" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default PrivateRoute;
