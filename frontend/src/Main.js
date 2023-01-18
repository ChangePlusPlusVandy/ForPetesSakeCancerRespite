import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Home";
import ProfileScreen from "./Profile";
import NewsletterScreen from "./Newsletter";

const Stack = createNativeStackNavigator();

export default class Main extends Component {
	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Home"
						component={HomeScreen}
					/>
					<Stack.Screen name="Profile" component={ProfileScreen} />
					<Stack.Screen name="Newsletter" component={NewsletterScreen}/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

