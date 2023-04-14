import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//Date object
class Groupchat extends Component {
	render() {
		//do hour if today, yesterday or the day of the week
		if(this.props.item.last_message){
			var date = new Date(this.props.item.last_message.timestamp);
			var today = new Date().getDay();
			var dateString;
			if(date.getDay() == today){
				dateString = date.getHours() + ":" + date.getMinutes();
			}
			else{
				var year = date.getFullYear();
				var month = date.getMonth();
				var day = date.getDay();
				dateString = month + "/" + day + "/" + year;
			}
		}

		return (
			<View style={styles.chatComponent}>
				<Ionicons
					name="person-circle"
					size={60}
					color="black"
				/>
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
				{this.props.item.last_message && (
							<>
							<Text style={styles.chatDate}>{dateString}</Text>
							</>
						)}
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
		backgroundColor: "#FCFCFC",
		shadowColor: "#171717",
		borderRadius: "10px",
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 7,
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
		paddingLeft: 40,
		color: "#333333",
	},
	message: {
		color: "#4F5E7B",
	},
});

export default Groupchat;
