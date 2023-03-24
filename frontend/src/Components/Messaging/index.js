import React, { Component, useEffect } from "react";
import {
	View,
	FlatList,
	Text,
	StyleSheet,
	TextInput,
	Pressable,
} from "react-native";
import Message from "./Message";
import MessagesPanel from "./MessagesPanel";
import Groupchat from "./Groupchat";
import { useNavigation, Link } from "@react-navigation/native";
import CONFIG from "../../Config";
import { getAuthHeader, useAuth } from "../../AuthContext";
import { useGateway } from "../../Gateway";
import { AntDesign, Ionicons } from "@expo/vector-icons";

class _ChatApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			groupchats: [],
			createChatUsername: "",
			createChatMessage: "",
		};
		this.socket = props.socket;
		this.auth = props.auth;
	}

	componentDidMount() {
		//loading channels
		this.getGroupchats();
	}

	componentDidUpdate() {
		this.getGroupchats();
	}

	getGroupchats = async () => {
		//api request to get the groupchats
		var headers = await this.auth.getAuthHeader();
		fetch(CONFIG.URL + "/api/messaging/get_groupchats", { headers }).then(
			async (response) => {
				let data = await response.json();
				this.setState({ groupchats: data.groupchats });
			}
		);
	};

	render() {
		//navigate to messaging panel
		return (
			<View style={styles.container}>
				<View style={styles.chatTop}>
					<Text style={styles.recentChats}>Recent Chats</Text>
					<AntDesign name="search1" size={24} color="black" />
				</View>

				<View style={styles.chats}>
					<FlatList
						data={this.state.groupchats}
						renderItem={({ item }) => (
							<Link to={{ screen: "Chat", params: { item } }}>
								<Groupchat item={item} />
							</Link>
						)}
					/>
				</View>
					<View style={styles.createContainer}>
						<View style={styles.createButtonContainer}>
						<Link to={{screen: "CreateChat"}}>
						<Text style={{ color: "#FFFFFF", fontSize: 15 }}>Create Group</Text>
						</Link>
						</View>
					</View>

			</View>
			
		);
	}
}

function User({ user }) {
	console.log("USER");
	console.log(user);
	return (
		<div>
			<h1>
				{user.username} {user.self ? "(yourself)" : ""}
			</h1>
			{user.connected ? <p>online</p> : <p>offline</p>}
			<p></p>
		</div>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E5E5E5",
	},
	chatTop: {
		top: 29,
		left: 15,
		paddingRight: 40,
		justifyContent: "space-between",
		flexDirection: "row",
	},
	recentChats: {
		color: "#088DA9",
		fontWeight: "bold",
		fontSize: 32,
	},
	chats: {
		marginTop: 60,
		backgroundColor: "#BDBDBD",
	},
	newChat: {
		paddingLeft: "50%",
	},
	createContainer: {
		paddingTop: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	createButtonContainer: {
		width: "30%",
		height: "150%",
		backgroundColor: "#2F80ED",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default function ChatApp(props) {
	const { socket } = useGateway();
	const auth = useAuth();
	return <_ChatApp {...props} socket={socket} auth={auth} />;
}

// export default _ChatApp;
