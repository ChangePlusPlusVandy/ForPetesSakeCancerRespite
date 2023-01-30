import React from "react";
import { View } from "react-native";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./AuthContext"; 
import { createStackNavigator } from '@react-navigation/stack';
//import PrivateRoute from "./Components/PrivateRoute";

// Routes
import Home from "./Components/Home";
import Login from "./Components/Auth/Login";
import Logout from "./Components/Auth/Logout";
import Register from "./Components/Auth/Register";
import AccountSetup from "./Components/Auth/AccountSetup";
import Profile from "./Components/Profile";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import CreatePost from "./Components/BlogPosts/CreatePost";
import Messaging from "./Components/Messaging";

const CustomRouter = () => {
  const Stack = createStackNavigator();
  // use PrivateRoute for protected routes
  return (
    <AuthProvider>
      <Stack.Navigator>
        { /*<Stack.Screen name="AccountSetup" component={<AccountSetup />} />*/ }
        <Stack.Screen name="AccountSetup" component={AccountSetup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="Messaging" component={Messaging} />
      </Stack.Navigator>
    </AuthProvider>
  );
};

export default CustomRouter;
