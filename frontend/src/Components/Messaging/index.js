import React, { Component, useEffect } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import Message from "./Message";
import MessagesPanel from "./MessagesPanel";
import Groupchat from "./Groupchat";
import { useNavigation, Link } from "@react-navigation/native";
import CONFIG from "../../Config";

class ChatApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			groupchats: [],
		};
	}

	componentDidMount() {
		//loading channels
		this.getGroupchats();
	}

	getGroupchats = async () => {
		//api request to get all the users
		fetch(CONFIG.URL + "/get_groupchats").then(async (response) => {
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

export default ChatApp;
