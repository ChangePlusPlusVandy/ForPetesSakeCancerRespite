import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types"

export default class ProfileScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Profile Page</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

ProfileScreen.propTypes = {
	navigation: PropTypes.any.isRequired
};