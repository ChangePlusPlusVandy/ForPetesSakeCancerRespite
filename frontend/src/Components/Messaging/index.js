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
import BottomBar from "../BottomBar";
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
		this.props.navigation.addListener("focus", () => {
			this.getGroupchats();
		})
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
				</View>
				<View style={styles.chats}>
				<FlatList
					data={this.state.groupchats}
					renderItem={({ item }) => (
						<Link to={{ screen: "Chat", params: { item } }}>
							<View style={{width: "100%", paddingHorizontal: 10}}>
							<View style={{paddingTop: 7, width:"100%"}}></View>
							<Groupchat item={item} />
							<View/>
							</View>
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
		width: "100%",
		height: "100%",
		backgroundColor: "#FFFFFF",
	},
	chatTop: {
		top: 29,
		bottom: 20,
		left: 15,
		justifyContent: "space-between",
		flexDirection: "row",
	},
	recentChats: {
		color: "#088DA9",
		fontWeight: "bold",
		fontSize: 27,
	},
	chats: {
		marginTop: 50,
		width: "100%",
		height: "75%",
		backgroundColor: "#E4E4E4"
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
		height: 35,
		backgroundColor: "#088DA9",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: '#171717',
		shadowOffset: {width: -2, height: 4},
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
});

export default function ChatApp(props) {
	const { socket } = useGateway();
	const auth = useAuth();
	return <_ChatApp {...props} socket={socket} auth={auth} />;
}

// export default _ChatApp;
