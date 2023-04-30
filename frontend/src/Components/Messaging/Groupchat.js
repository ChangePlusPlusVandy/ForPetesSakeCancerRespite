import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CONFIG from "../../Config";
import { useAuth } from "../../AuthContext";
import { useGateway } from "../../Gateway";

class _Groupchat extends Component {
	constructor(props) {
		super(props);
		this.getProfilePic.bind(this);
		this.socket = props.socket;
		this.auth = props.auth;
		this.state = {
			profile: "",
		};
	}

	componentDidMount() {
		//loading channels
		this.getProfilePic();
	}

	getProfilePic = async () => {
		if (this.props.item.last_message) {
			let user = this.props.item.last_message.user;
			var headers = await this.auth.getAuthHeader();

			var response = await fetch(
				CONFIG.URL + "/api/users//profile_picture?id=" + user,
				{ method: "GET", mode: "no-cors", headers: headers }
			);
			let data = response;

			this.setState({ profile: data.url });
		}
	};

	render() {
		if (this.props.item.last_message) {
			var date = new Date(this.props.item.last_message.timestamp);
			var today = new Date().getDay();
			var dateString;
			if (date.getDay() == today) {
				dateString = date.getHours() + ":" + date.getMinutes();
			}
			//check date
			else if (date.getDate() == today - 1) {
				dateString = "Yesterday";
			} else {
				var year = date.getFullYear();
				var month = date.getMonth();
				var day = date.getDay() + 1;
				dateString = month + "/" + day + "/" + year;
			}
		}

		return (
			<View style={styles.chatComponent}>
				<View style={{ justifyContent: "center", paddingLeft: 10 }}>
					{this.state.profile == "" && (
						<Ionicons name="person-circle" size={60} color="black" />
					)}
					{this.state.profile != "" && (
						<Image source={{ uri: this.state.profile }} />
					)}
				</View>
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
				<View
					style={{
						flexDirection: "row",
						justifyContent: "flex-end",
						width: "60%",
						paddingRight: 90,
					}}
				>
					{this.props.item.last_message && (
						<>
							<Text style={styles.chatDate}>{dateString}</Text>
						</>
					)}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	chatComponent: {
		height: 75,
		width: "100%",
		flexDirection: "row",
		flex: "space-evenly",
		borderRadius: 15,
		backgroundColor: "#FCFCFC",
		shadowColor: "#171717",
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 20,
	},
	chatRight: {
		flexDirection: "column",
	},
	chatContent: {
		height: "100%",
		paddingLeft: 20,
		paddingTop: 15,
		width: "40%",
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

export default function Groupchat(props) {
	const { socket } = useGateway();
	const auth = useAuth();
	return <_Groupchat {...props} socket={socket} auth={auth} />;
}
