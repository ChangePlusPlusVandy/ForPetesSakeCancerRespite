import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TextInput,
	Pressable,
} from "react-native";
import Message from "./Message";
import CONFIG from "../../Config";
import { useGateway } from "../../Gateway";
import { useAuth } from "../../AuthContext";
import { Ionicons } from '@expo/vector-icons'; 

class _MessagesPanel extends Component {
	constructor(props) {
		super(props);
		this.submitChatMessage.bind(this);
		this.getMessages.bind(this);
		this.state = {
			chatMessage: "",
			messages: [],
			messageNum: 0,
			groupid: "",
			groupname: ""
		};
		this.socket = props.socket;
		this.auth = props.auth;
	}

	componentDidMount() {
		this.getMessages();
	}

	getMessages = async () => {
		//api request
		var headers = await this.auth.getAuthHeader();
		fetch(
			CONFIG.URL + "/api/messaging/get_groupchat?id=" + this.props.route.params.item._id, {headers}
		).then(async (response) => {
			let data = await response.json();
			this.setState({ messages: data.groupchat.messages, groupid: data.groupchat._id, groupname: data.groupchat.name });
			this.setState({messageNum: data.groupchat.messages.length});
			this.forceUpdate();
		});

	};

	//update it when a message is sent
	submitChatMessage() {
		if(this.state.chatMessage){
			this.socket.emit("send_groupchat_message", {message: this.state.chatMessage, groupchat: this.state.groupid, timestamp: Date.now()});
		}
		this.getMessages();
	}

	//this.auth.currentUser._id

	render() {

		// this.socket.send("hello world!");
		var messages = [];
		for(var i = 0; i < this.state.messageNum; i++){
			messages.push(
				<Message message={this.state.messages[i]}/>
			)
		}

		return (
			<View style={styles.messagingscreen}>
				<View style={styles.header}>
        			<Ionicons style={{paddingTop: 10}} name="person-circle" size={60} color="black" />
					<View style={styles.headerRight}>
						<Text style={{fontWeight:"bold", fontSize: 15, color:  "#1B1A57"}}>{this.state.groupname}</Text>
						<Text style={{fontSize: 12, color: "#4F5E7B"}}>Active</Text>
					</View>
      			</View>

				  {this.state.messages.length > 0 && (
						<>
						<View style={styles.chatbody}>
						{messages}
						</View>
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
						onSubmitEditing={() =>
							this.submitChatMessage()
						}></TextInput>
					<Pressable
						style={styles.messagingbuttonContainer}
						onPress={() => this.submitChatMessage()}>
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
	},
	header: {
	  flexDirection: "row",
	  height: 80,
	  backgroundColor: "#FFFFFF",
	},
	headerRight: {
		flexDirection: "column",
		paddingTop: 30,
		paddingLeft: 10,
	},
	  chatbody: {
		  flex: 1,
	  backgroundColor: '#E5E5E5',
		  paddingHorizontal: 10,
	  paddingTop: 15,
	  },
	  messaginginputContainer: {
		  width: "100%",
		  minHeight: 75,
		  backgroundColor: "white",
		  paddingVertical: 30,
		  paddingHorizontal: 15,
		  justifyContent: "center",
		  flexDirection: "row",
	  },
	  messaginginput: {
		  borderWidth: 0,
	  	  padding: 15,
		  flex: 1,
		  marginRight: 10,
		  borderRadius: 20
	  },
	  messagingbuttonContainer: {
		  width: "30%",
		  backgroundColor: "#088DA9",
		  borderRadius: 20,
		  alignItems: "center",
		  justifyContent: "center",
	  },
  });



export default function MessagesPanel (props) {
	const { socket } = useGateway();
	const auth = useAuth();
	return <_MessagesPanel {...props} socket={socket} auth={auth} />;
};
