import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class Groupchat extends Component {
	render() {
		return (
			<View>
				<Text>{this.props.item.name}</Text>
				{this.props.item.last_message && (
					<>
						<Text>{this.props.item.last_message.username}</Text>
						<Text>{this.props.item.last_message.message}</Text>
					</>
				)}
			</View>
		);
	}
}

export default Groupchat;
