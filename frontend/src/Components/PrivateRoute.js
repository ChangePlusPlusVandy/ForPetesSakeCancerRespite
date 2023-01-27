import React, { Component } from "react";
import { Route, Redirect } from "react-router-native";
import { useAuth } from "../AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUserIn } = useAuth();

  /* former code using old dom router
  <Scene 
      {...rest}
      render={(props) => {
        return currentUserIn ? (
          <Component {...props} />
        ) : (
          Actions.accountSetup()
        );
      }}
    ></Scene>
  */

  // If the user is logged in, render the component. Otherwise, redirect to main account setup page
  return (
    <Route
      {...rest}
      render={props =>
        currentUserIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/account-setup",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}