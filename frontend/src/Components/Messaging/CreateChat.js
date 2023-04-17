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
import { useNavigation, Link } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ListItem, SearchBar } from "react-native-elements";
import { Feather, Entypo } from "@expo/vector-icons";

class _CreateChat extends Component {
	constructor(props) {
		super(props);
		this.createChat.bind(this);
		this.searchUser.bind(this);
		this.addUser.bind(this);
		this.socket = props.socket;
		this.auth = props.auth;
		this.state = {
			currentUser: "",
			groupName: "",
			searchUsers: [],
			users: [this.auth.currentUser._id],
		};
	}

	createChat = async () => {
		var headers = await this.auth.getAuthHeader();
		headers["Content-Type"] = "application/json";
		if (this.state.users && this.state.groupName) {
			debugger
			fetch(CONFIG.URL + "/api/messaging/create_groupchat", {
				method: "POST",
				headers: headers,
				body: JSON.stringify({
					users: this.state.users,
					name: this.state.groupName,
				}),
			}).then((response) => response.json());
		}
		this.setState({groupName: ""});
	};

	addUser(user) {
		this.setState({ users: [...this.state.users, user._id] });
		//this.setState({searchUsers: this.state.searchUsers.filter((item) => )})
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

	//add keyboard avoiding view
	render() {
		return (
			<View style={{flex: 0.7, width: "100%", height: "50%", flexDirection: "column"}}>
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
				<View>
				{this.state.searchUsers.length > 0 && (
				<FlatList style={styles.list__container}
				data = {this.state.searchUsers}
				renderItem = {({item}) => (
					<Pressable style={styles.item} onPress={() => this.addUser(item)}>
						<Text style={styles.itemTitle} >{item.name}</Text>
					</Pressable>
				)}
				/>
				)}
				</View>
				<View style={styles.container}>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.searchInput}
						value={this.state.groupName}
						placeholder="Enter the group name..."
						onChangeText={(text) => {
							this.setState({ groupName: text });
						}}
					/>
				</View>
				<View style={styles.createContainer}>
					<Pressable
						style={styles.createButton}
						onPress={() => this.createChat()}
					>
						<Text style={{ color: "#FFFFFF", fontSize: 15, padding: 5}}>CREATE</Text>
					</Pressable>
				</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputContainer: {
		padding: 10,
		flexDirection: "row",
		width: "60%",
		height: "20%",
		backgroundColor: "#d9dbda",
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "space-evenly",
		shadowColor: "#171717",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	input: {
		borderWidth: 0,
		borderColor: "#2F80ED",
		padding: 10,
		flex: 1,
		marginRight: 10,
		borderRadius: 20,
	},
	createButton: {
		width: "30%",
		height: "50%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#088DA9",
		borderRadius: 20,
		shadowColor: "#171717",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	createContainer: {
		paddingLeft: 30,
		paddingTop: 5,
		width: "85%",
		height: "40%",
		justifyContent: "flex-start",
	},
	addButton: {
		width: "30%",
		height: "50%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#088DA9",
		borderRadius: 20,
		shadowColor: "#171717",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	buttonContainer: {
		paddingLeft: 30,
		paddingTop: 5,
		width: "85%",
		height: "40%",
		justifyContent: "flex-start",
	},
	container: {
		paddingLeft: 20,
		paddingTop: 20,
		flexDirection: "row",
		justifyContent: "flex-start",
		width: "100%",
		height: "40%"
	},
	searchBar__clicked: {
		padding: 10,
		flexDirection: "row",
		height: "20%",
		width: "60%",
		backgroundColor: "#d9dbda",
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "space-evenly",
		shadowColor: "#171717",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	searchInput: {
		fontSize: 15,
		marginLeft: 10,
		width: "90%",
	},
	list__container: {
		margin: 10,
		height: "20%",
		width: "80%",
	},
	item: {
		width: "80%",
		backgroundColor: "lightgrey",
		margin: 5,
		borderBottomWidth: 2,
		borderBottomColor: "lightgrey",
	},
	itemTitle: {
		fontSize: 15,
		fontWeight: "bold",
		marginBottom: 5,
	},
});

export default function CreateChat(props) {
	const { socket } = useGateway();
	const auth = useAuth();
	return <_CreateChat {...props} socket={socket} auth={auth} />;
}
