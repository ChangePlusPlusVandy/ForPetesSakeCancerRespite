import React from "react";
import { View } from "react-native";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
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
import EditProfile from "./Components/EditProfile"
//import PrivateRoute from "./Components/PrivateRoute";
import ExploreScreen from "./Components/BlogPosts/FunctionalExplorer";
import { GatewayProvider } from "./Gateway";

const CustomRouter = () => {
	const Stack = createStackNavigator();

	return (
		<AuthProvider>
			<GatewayProvider>
				<Stack.Navigator>
					<Stack.Screen name="AccountSetup" component={AccountSetup} />
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Logout" component={Logout} />
					<Stack.Screen name="Register" component={Register} />
					<Stack.Screen name="Profile" component={Profile} />
					<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
					<Stack.Screen name="CreatePost" component={CreatePost} />
					<Stack.Screen name="Messaging" component={Messaging} />
					<Stack.Screen name="Explore" component={ExploreScreen} />
					<Stack.Screen name="EditProfile" component={EditProfile} />
					<Stack.Screen name="Chat" component={MessagesPanel} />
				</Stack.Navigator>
			</GatewayProvider>
		</AuthProvider>
	);
};

export default CustomRouter;
