import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { useAuth } from "../AuthContext";
import CONFIG from "../Config";
import { useNavigation, Link } from "@react-navigation/native";

const Home = () => {
	const authObj = useAuth();
	const navigation = useNavigation();

	let userDisplayObject = authObj.currentUser;
	if(!userDisplayObject){
		navigation.navigate("AccountSetup")
	}
	// userDisplayObject.firebase = JSON.stringify(authObj.currentUser.firebase);
	userDisplayObject.firebase = "Field Removed for condensed display";
	return (
		<View style={styles.container}>
			<Text>Welcome {authObj.currentUser.name}!</Text>
			<Text>
				Current User JSON Data: {JSON.stringify(userDisplayObject, null, 4)}
			</Text>
			<Link to={{ screen: "Profile" }}>Profile</Link>
			<Link to={{ screen: "EditProfile" }}>Edit Profile</Link>
			<Link to={{ screen: "Logout" }}>Logout</Link>
			<Link to={{ screen: "CreatePost" }}>Create Post</Link>
			<Link to={{ screen: "Messaging" }}>Messaging</Link>
			<Link to={{ screen: "Explore" }}>Explore</Link>
			<Link to={{ screen: "SearchUsers" }}>Search Users</Link>
			<Link to={{ screen: "Following" }}>Following</Link>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Home;
