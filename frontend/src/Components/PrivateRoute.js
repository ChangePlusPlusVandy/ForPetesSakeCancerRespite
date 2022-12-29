import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUserIn } = useAuth();

  // If the user is logged in, render the component. Otherwise, redirect to main account setup page
  return (
    <Route 
      {...rest}
      render={(props) => {
        return currentUserIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/account-setup" />
        );
      }}
    ></Route>
  );
}