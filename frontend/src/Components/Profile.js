import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../AuthContext";

const ProfileScreen = () => {
	const { currentUserIn } = useAuth();

	return (
		<View style={styles.container}>
			<Text>Profile Page</Text>
			<Link to="/">Home</Link>
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

export default ProfileScreen;
