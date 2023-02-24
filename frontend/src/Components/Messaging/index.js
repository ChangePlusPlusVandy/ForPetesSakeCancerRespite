import React, { Component, useEffect } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import Message from "./Message";
import MessagesPanel from "./MessagesPanel";
import Groupchat from "./Groupchat";
import { useNavigation, Link } from "@react-navigation/native";
import CONFIG from "../../Config";
import {getAuthHeader, useAuth} from "../../AuthContext"
import { useGateway } from "../../Gateway";

class _ChatApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			groupchats: [],
		};
		this.socket = props.socket;
		this.auth = props.auth;
	}

	componentDidMount() {
		//loading channels
		this.getGroupchats();
	}

	getGroupchats = async () => {
		//api request to get all the users
		var headers = await this.auth.getAuthHeader();
		fetch(CONFIG.URL + "/api/messaging/get_groupchats", {headers}).then(async (response) => {
			let data = await response.json();
			this.setState({ groupchats: data });
		});
	};

	render() {
		//navigate to messaging panel
		return (
			<View>
				<View>
					{/* <MessagesPanel /> */}
					<FlatList
						data={this.state.groupchats}
						renderItem={({ item }) => (
							<Link to={{ screen: "Chat", params: { item } }}>
								<Groupchat item={item} />
							</Link>
						)}
					/>
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

const styles = StyleSheet.create({});

export default function ChatApp (props) {
	const { socket } = useGateway();
	const auth = useAuth();
	return <_ChatApp {...props} socket={socket} auth={auth} />;
};

// export default _ChatApp;
