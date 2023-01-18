import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
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
				{/* switch to newsletter display */}
				<Button title="Newsletters" onPress={()=> {this.props.navigation.navigate("Newsletter");}}></Button>
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