import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TextInput,
	Pressable,
	ScrollView,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	SafeAreaView
} from "react-native";
import Message from "./Message";
import CONFIG from "../../Config";
import { useGateway } from "../../Gateway";
import { useAuth } from "../../AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {useHeaderHeight} from "@react-navigation/elements"

class _MessagesPanel extends Component {
	constructor(props) {
		super(props);
		this.submitChatMessage.bind(this);
		this.getMessages.bind(this);
		this.receiveMessage.bind(this);
		this.socket = props.socket;
		this.auth = props.auth;
		this.state = {
			chatMessage: "",
			messages: [],
			messageNum: 0,
			groupid: this.props.route.params.item._id,
			groupname: "",
		};
	}

	//socket.io get messages
	componentDidMount() {
		this.getMessages();
		this.receiveMessage();
	}

	getMessages = async () => {
		//api request
		var headers = await this.auth.getAuthHeader();
		var response = await fetch(
			CONFIG.URL +
				"/api/messaging/get_groupchat?id=" +
				this.props.route.params.item._id,
			{ headers }
		)
		let data = await response.json();
		this.setState({
				messages: data.groupchat.messages,
				groupid: data.groupchat._id,
				groupname: data.groupchat.name,
				messageNum: data.groupchat.messages.length
		});
	};

	//update it when a message is sent
	submitChatMessage = async () => {
		if (this.state.chatMessage) {
			this.socket.emit(
				"send_groupchat_message",
				{
					message: this.state.chatMessage,
					groupchat: this.state.groupid,
					timestamp: Date.now(),
				},(response) => {this.getMessages()}
			);

			this.setState({chatMessage: ""});
			//await this.getMessages();
		}
	};

	receiveMessage = async () => {
		this.socket.on("received-message-user", ((response) => {
			console.log("receives", this.auth.currentUser._id, response);
			console.log(this.state.groupid)
			// if (response.groupchat_id == this.state.groupid) {
			// 	this.setState({ messages: [...this.state.messages, response.message] });
			// }
			this.getMessages();
		}).bind(this));
	};

	//this.auth.currentUser._id == messages[i].user
	//add scroll feature
	render() {
		// this.socket.send("hello world!");
		var messages = [];
		for (var i = 0; i < this.state.messageNum; i++) {
			messages.push(<Message message={this.state.messages[i]} />);
		}

		return (
			<View style={styles.messagingscreen}>
				<View style={styles.header}>
					<Ionicons
						style={{paddingLeft: 5, 
							shadowColor: "#171717",
							shadowOffset: { width: -2, height: 4 },
							shadowOpacity: 0.2,
							shadowRadius: 3,}}
						name="person-circle"
						size={60}
						color="black"
					/>
					<View style={styles.headerRight}>
						<Text
							style={{ fontWeight: "bold", fontSize: 15, color: "#1B1A57" }}
						>
							{this.state.groupname}
						</Text>
						<Text style={{ fontSize: 12, color: "#4F5E7B" }}>Active</Text>
					</View>
				</View>

				{this.state.messages.length > 0 && (
					<>
					<SafeAreaView style={styles.chatbodyContainer}>
					<FlatList 
					style={styles.chatbody}
					data={this.state.messages}
					renderItem={({item}) => (
						<Message message={item} />
					)}
					/>
					</SafeAreaView>
					</>
				)}
				<View style={styles.messaginginputContainer}>
					<TextInput
						style={styles.messaginginput}
						value={this.state.chatMessage}
						placeholder="Write a message..."
						onChangeText={(text) => {
							this.setState({ chatMessage: text });
						}}
						onSubmitEditing={() => this.submitChatMessage()}
					></TextInput>
					<Pressable
						style={styles.messagingbuttonContainer}
						onPress={() => this.submitChatMessage()}
					>
						<View>
							<Text style={{ color: "#FFFFFF", fontSize: 20 }}>SEND</Text>
						</View>
					</Pressable>
				</View>
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	messagingscreen: {
		flex: 1,
		height: "100%",
	},
	header: {
		flexDirection: "row",
		height: "8%",
		backgroundColor: "#FFFFFF",
		borderBottomWidth: 2,
		borderBottomColor: "#EDEDED",
	},
	headerRight: {
		flexDirection: "column",
		paddingTop: 15,
		paddingLeft: 12,
	},
	chatbodyContainer: {
		height: "80%",
		backgroundColor: "#FFFFFF",
		paddingVertical: 5,
		borderBottomWidth: 2,
		borderBottomColor: "#EDEDED",
	},
	chatbody: {
		paddingHorizontal: 10,
	},
	messaginginputContainer: {
		width: "100%",
		height: "12%",
		backgroundColor: "white",
		paddingVertical: 20,
		paddingHorizontal: 15,
		justifyContent: "flex-end",
		flexDirection: "row",
		position: "absolute",
		bottom: 0
	},
	messaginginput: {
		borderWidth: 0,
		padding: 15,
		flex: 1,
		marginRight: 10,
		borderRadius: 20,
	},
	messagingbuttonContainer: {
		width: "30%",
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

export default function MessagesPanel(props) {
	const { socket } = useGateway();
	const auth = useAuth();
	return <_MessagesPanel {...props} socket={socket} auth={auth} />;
}
