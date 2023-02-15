import React, { Component } from "react";
import { Route, Redirect } from "react-router-native";
import { useAuth } from "../AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUserIn } = useAuth();
  const navigation = useNavigation();

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
    <Stack.Screen
      {...rest}
      render={props => {
        if(currentUserIn) {
          return <Component {...props} />
        } else {
          navigation.navigate("AccountSetup");
        }
      }}
    />
  );
}