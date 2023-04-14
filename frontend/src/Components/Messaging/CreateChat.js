import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TextInput,
	Pressable,
	SafeAreaView,
} from "react-native";
import CONFIG from "../../Config";
import { useGateway } from "../../Gateway";
import { useAuth } from "../../AuthContext";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ListItem, SearchBar } from "react-native-elements";
import { Feather, Entypo } from "@expo/vector-icons";

class _CreateChat extends Component {
	constructor(props) {
		super(props);
		this.createChat.bind(this);
		this.searchUser.bind(this);
		this.state = {
			currentUser: "",
			groupName: "",
			searchUsers: [],
			users: [],
		};
		this.socket = props.socket;
		this.auth = props.auth;
	}

	createChat = async () => {
		var headers = await this.auth.getAuthHeader();
		headers["Content-Type"] = "application/json";
		if (this.state.users && this.state.groupName) {
			fetch(CONFIG.URL + "/api/messaging/create_groupchat", {
				method: "POST",
				headers: headers,
				body: JSON.stringify({
					users: [this.state.users],
					name: this.state.groupName,
				}),
			}).then((response) => response.json());
		}
	};

	addUser(user) {
		this.setState({ users: [...this.state.users, user._id] });
	}

	searchUser = async (text) => {
		var headers = await this.auth.getAuthHeader();
		console.log(text);
		fetch(CONFIG.URL + "/api/users/search?searchString=" + text, {
			headers,
		}).then(async (response) => {
			let data = await response.json();
			this.setState({ searchUsers: data });
		});
	};

	render() {
		var userSearch = [];
		for (var i = 0; i < this.state.searchUsers.length; i++) {
			userSearch.push(
				<Pressable styles={{
					paddingLeft: 15,
					margin: 30,
					backgroundColor: "#088DA9",
					borderBottomWidth: 2,
					borderBottomColor: "lightgrey"
				}}
					onPress={((i) => {
						return this.addUser(this.state.searchUsers[i]);
					}).bind(this, i)}
				>
					<Text styles={styles.itemTitle}>{this.state.searchUsers[i].name}</Text>
				</Pressable>
			);
		}

		return (
			<View>
				<View style={styles.container}>
					<View style={styles.searchBar__clicked}>
						<Feather
							name="search"
							size={20}
							color="black"
							style={{ marginLeft: 1 }}
						/>
						<TextInput
							style={styles.searchInput}
							placeholder="Search"
							value={this.state.currentUser}
							onChangeText={(text) => {
								this.setState({ currentUser: text });
							}}
						/>
						{
							<Entypo
								name="cross"
								size={20}
								color="black"
								style={{ padding: 1 }}
								onPress={() => {
									this.setState({ currentUser: "" });
								}}
							/>
						}
					</View>
					<View style={styles.buttonContainer}>
						<Pressable
							style={styles.addButton}
							onPress={() => this.searchUser(this.state.currentUser)}
						>
							<Text style={{ color: "#FFFFFF", fontSize: 17 }}>Search</Text>
						</Pressable>
					</View>
				</View>
				<FlatList style={styles.list__container}
				data = {this.state.searchUsers}
				renderItem = {({item}) => (
					<Pressable style={styles.item} onPress={() => this.addUser(item)}>
						<Text style={styles.itemTitle} >{item.name}</Text>
					</Pressable>
				)}
				/>
				<View style={styles.container}>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						value={this.state.groupName}
						placeholder="Enter the group name..."
						onChangeText={(text) => {
							this.setState({ groupName: text });
						}}
					></TextInput>
				</View>
				</View>
				<View style={styles.createContainer}>
					<Pressable
						style={styles.createButton}
						onPress={() => this.createChat()}
					>
						<Text style={{ color: "#FFFFFF", fontSize: 20 }}>CREATE</Text>
					</Pressable>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputContainer: {
		padding: 10,
		flexDirection: "row",
		width: "80%",
		height: "75%",
		backgroundColor: "#d9dbda",
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "space-evenly",
		shadowColor: '#171717',
		shadowOffset: {width: -2, height: 4},
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	input: {
		borderWidth: 0,
		borderColor: "#2F80ED",
		padding: 15,
		flex: 1,
		marginRight: 10,
		borderRadius: 20,
	},
	createButton: {
		width: "30%",
		height: "150%",
		backgroundColor: "#088DA9",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: '#171717',
		shadowOffset: {width: -2, height: 4},
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	createContainer: {
		paddingTop: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	addButton: {
		width: "30%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#088DA9",
		borderRadius: 20,
		shadowColor: '#171717',
		shadowOffset: {width: -2, height: 4},
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	buttonContainer: {
		paddingLeft: 25,
		width: "100%",
		height: "100%",
	},
	container: {
		margin: 15,
		justifyContent: "flex-start",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		width: "80%",
	},
	searchBar__clicked: {
		padding: 10,
		flexDirection: "row",
		width: "80%",
		backgroundColor: "#d9dbda",
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "space-evenly",
		shadowColor: '#171717',
		shadowOffset: {width: -2, height: 4},
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	searchInput: {
		fontSize: 20,
		marginLeft: 10,
		width: "90%",
	},
	list__container: {
		margin: 10,
		height: "10%",
		width: "80%",
	  },
	item: {
		margin: 10,
    	borderBottomWidth: 2,
    	borderBottomColor: "lightgrey"
	},
	itemTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 5
	}
});

export default function CreateChat(props) {
	const { socket } = useGateway();
	const auth = useAuth();
	return <_CreateChat {...props} socket={socket} auth={auth} />;
}
