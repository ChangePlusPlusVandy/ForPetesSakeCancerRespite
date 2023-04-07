import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TextInput,
	Pressable,
} from "react-native";
import CONFIG from "../../Config";
import { useGateway } from "../../Gateway";
import { useAuth } from "../../AuthContext";
import { AntDesign, Ionicons } from "@expo/vector-icons";

class _CreateChat extends Component{
    constructor(props) {
		super(props);
		this.createChat.bind(this);
		this.searchUser.bind(this);
		this.state = {
			currentUser: "",
            groupName: "",
			users: []
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
				})
			}).then((response) => response.json());
		}
	};

	addUser() {
		this.setState({users: [...this.state.users, this.state.currentUser]});
	}

	searchUser = async (text) => {
		const data = [
			{
				id: 1,
				name: "Doga"
			},
			{
				id: 2,
				name: "Do"
			},
			{
				id: 3,
				name: "Aryan"
			}
		]

		this.setState({users: data})
		console.log(data);
		console.log(this.state.users);
		/*
		var headers = await this.auth.getAuthHeader();
		fetch(CONFIG.URL + "/api/users/search?searchString=" + text).then(
			async (response) => {
				let data = await response.json();
				
			}
		);
		*/
	};

	/*
	addUser = async () => {
		//api request to get the groupchats
		var headers = await this.auth.getAuthHeader();
		fetch(CONFIG.URL + "/api/messaging/get_users", { headers }).then(
			async (response) => {
				let data = await response.json();
				this.setState({users: [...this.state.users, this.state.currentUser]});
			}
		);
	};
	*/


    render(){
        return(
            <View>
				<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					value={this.state.currentUser}
					placeholder="Enter username..."
					onChangeText={(text) => {
						this.setState({currentUser: text})
					}}
				></TextInput>
				<Pressable style={styles.addButton} onPress={() => this.searchUser(this.state.currentUser)}>
                <Text style={{ color: "#FFFFFF", fontSize: 20 }}>ADD</Text>
                </Pressable>
				<FlatList>
					data={this.state.users}
          			renderItem={({m}) => <Text>Hello</Text>}
					keyExtractor={(item) => item.id}
				</FlatList>

				</View>
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
				<View style={styles.createContainer}>
					<Pressable  style={styles.createButton} onPress={() => this.createChat()}>
                	<Text style={{ color: "#FFFFFF", fontSize: 20 }}>CREATE</Text>
                	</Pressable>
				</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
	inputContainer: {
		width: "100%",
		minHeight: 50,
		backgroundColor: "white",
		paddingVertical: 30,
		paddingHorizontal: 15,
		justifyContent: "center",
		flexDirection: "row",
	},
	input: {
		borderWidth: 0,
		borderColor: "#2F80ED",
		padding: 15,
		flex: 1,
		marginRight: 10,
		borderRadius: 20
	},
	createButton: {
		width: "30%",
		height: "150%",
		backgroundColor: "#088DA9",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	createContainer: {
		paddingTop: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	addButton: {
		width: "30%",
		height: "60%",
		backgroundColor: "#088DA9",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
})

export default function CreateChat(props) {
	const { socket } = useGateway();
	const auth = useAuth();
	return <_CreateChat {...props} socket={socket} auth={auth} />;
}