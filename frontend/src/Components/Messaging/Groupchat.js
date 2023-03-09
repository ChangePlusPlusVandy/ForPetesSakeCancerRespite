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
					{this.props.item.last_message && (
						<>
							<Text>{this.props.item.last_message.message}</Text>
						</>
					)}
				</View>
				<Text style={styles.chatDate}>Date</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	chatComponent: {
	  height: 75,
	  flexDirection: "row",
	  flex: "center",
	},
	chatContent: {
	  height:100,
	  paddingLeft: 20,
	  paddingTop: 15
	},
	chatName: {
	  paddingBottom: 5,
	  fontSize: 14,
	  fontWeight: "bold",
  
	},
	chatDate: {
	  paddingLeft: 90,
	  paddingTop: 15,
	}
  });
  

export default Groupchat;
