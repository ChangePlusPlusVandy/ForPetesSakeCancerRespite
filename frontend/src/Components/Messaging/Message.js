import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CONFIG from "../../Config";
import { useAuth } from "../../AuthContext";
import { useGateway } from "../../Gateway";

class _Message extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.message,
			profile: "",
		};
		this.socket = props.socket;
		this.auth = props.auth;
	}

	componentDidMount() {
		//loading channels
		this.getProfilePic();
	}

	getProfilePic = async () => {
		let user = this.state.data.user;
		var headers = await this.auth.getAuthHeader();

		var response = await fetch(
			CONFIG.URL + "/api/users//profile_picture?id=" + user,
			{ method: "GET", mode: "no-cors", headers: headers }
		);
		let data = response;

		this.setState({ profile: data.url });
	};

	render() {
		return (
			<View>
				{this.auth.currentUser._id != this.state.data.user && (
					<View style={{ flexDirection: "row" }}>
						{this.state.profile == "" && (
							<Ionicons
								style={{ paddingTop: 10 }}
								name="person-circle"
								size={40}
								color="black"
							/>
						)}
						{this.state.profile != "" && (
							<Image source={{ uri: this.state.profile }} />
						)}
						<View style={styles.messageWrapper}>
							<View style={styles.message}>
								{this.state.data && (
									<>
										<Text>{this.state.data.message}</Text>
									</>
								)}
							</View>
						</View>
					</View>
				)}
				{this.auth.currentUser._id == this.state.data.user && (
					<View style={{ flexDirection: "row" }}>
						<View style={styles.messageWrapper2}>
							<View style={styles.message2}>
								<Text>{this.state.data.message}</Text>
							</View>
						</View>
						{this.state.profile == "" && (
							<Ionicons
								style={{ paddingTop: 10 }}
								name="person-circle"
								size={40}
								color="black"
							/>
						)}
						{this.state.profile != "" && (
							<Image source={{ uri: this.state.profile }} />
						)}
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	messageWrapper: {
		width: "92%",
		alignItems: "flex-start",
		marginBottom: 15,
	},
	messageWrapper2: {
		width: "92%",
		alignItems: "flex-end",
	},
	message: {
		borderRadius: 10,
		maxWidth: "100%",
		backgroundColor: "#F7F7F7",
		padding: 15,
		marginBottom: 2,
		shadowColor: "#171717",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	message2: {
		borderRadius: 10,
		maxWidth: "100%",
		backgroundColor: "#2F80ED",
		padding: 15,
		marginBottom: 2,
		shadowColor: "#171717",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
});

export default function Message(props) {
	const { socket } = useGateway();
	const auth = useAuth();
	return <_Message {...props} socket={socket} auth={auth} />;
}
