import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types"

export default class HomeScreen extends Component {

	componentDidMount() {
		setTimeout(() => {
			this.props.navigation.navigate("Profile");
		}, 5000);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>For Pete's Sake Cancer Respite App</Text>
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

HomeScreen.propTypes = {
	navigation: PropTypes.any.isRequired
};