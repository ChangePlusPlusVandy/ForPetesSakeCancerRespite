import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

class Groupchat extends Component {
	render() {
		return (
			<View style={styles.chatComponent}>
				<Ionicons name="person-circle" size={60} color="black" />
				<View style={styles.chatContent}>
					<Text style={styles.chatName}>{this.props.item.name}</Text>
					<View style={styles.message}>
				{this.props.item.last_message && (
						<>
							<Text>{this.props.item.last_message.message}</Text>
						</>
				)}
				</View>
				</View>
				<Text style={styles.chatDate}>Date</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	chatComponent: {
	  height: 75,
	  width: "100%",
	  flexDirection: "row",
	  flex: "center",
	  backgroundColor: "#F7F7F7",
	},
	chatRight: {
		flexDirection: "column",
	},
	chatContent: {
	  height: 100,
	  paddingLeft: 20,
	  paddingTop: 15,
	  width: "50%",
	  flexDirection: "column",
	},
	chatName: {
	  paddingBottom: 5,
	  fontSize: 14,
	  fontWeight: "bold",
	  color: "#1B1A57",
	},
	chatDate: {
	  paddingTop: 15,
	  paddingLeft: 75,
	  color: "#333333",
	},
	message: {
		color: "#4F5E7B",
	}
  });
  

export default Groupchat;
