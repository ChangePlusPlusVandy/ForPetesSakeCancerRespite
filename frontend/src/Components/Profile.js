import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types"
import { useAuth } from "../AuthContext";
import { useNavigation, Link } from "@react-navigation/native";

const ProfileScreen = () => {
	const { currentUser } = useAuth();

	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text>Profile Page</Text>
			<Link to={{screen: "Home"}}>Home</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ProfileScreen;