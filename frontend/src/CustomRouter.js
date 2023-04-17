import React from "react";
import { View } from "react-native";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./AuthContext";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
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
import MessagesPanel from "./Components/Messaging/MessagesPanel";
import EditProfile from "./Components/EditProfile";
//import PrivateRoute from "./Components/PrivateRoute";
import ExploreScreen from "./Components/BlogPosts/FunctionalExplorer";
import BlogPage from "./Components/BlogPosts/BlogPage";
import { GatewayProvider } from "./Gateway";
import SearchUsers from "./Components/SearchUsers";

const CustomRouter = () => {
  const Stack = createStackNavigator();

  return (
    <AuthProvider>
      <GatewayProvider>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#ffff",
              borderBottomWidth: 0,
            },
            headerShadowVisible: false,
            headerTintColor: "#088DA9",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            title: "",
            headerBackTitle: " ",
          }}
        >
          <Stack.Screen name="AccountSetup" component={AccountSetup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Logout" component={Logout} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={({ route }) => ({
              title: route.params ? "@" + route.params.username : "",
            })}
          />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          <Stack.Screen name="Messaging" component={Messaging} />
          <Stack.Screen name="Explore" component={ExploreScreen} />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerStyle: {
                backgroundColor: "#088DA9",
                borderBottomColor: "#088DA9",
              },
              headerBackVisible: false,
              headerBackTitle: "Cancel",
              headerBackTitleStyle: {
                color: "#fff",
                fontSize: 17,
              },
              headerTintColor: "#088DA9",
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              gestureDirection: "vertical",
            }}
          />
          <Stack.Screen name="Chat" component={MessagesPanel} />
          <Stack.Screen name="BlogPage" component={BlogPage} />
          <Stack.Screen name="SearchUsers" component={SearchUsers} />
        </Stack.Navigator>
      </GatewayProvider>
    </AuthProvider>
  );
};

export default CustomRouter;
