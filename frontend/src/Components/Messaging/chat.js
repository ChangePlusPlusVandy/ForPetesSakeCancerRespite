import React, { Component, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import Message from "./Message";
import io from "socket.io-client";
import CONFIG from "../../Config";

const socket = io(CONFIG.URL, {
  transports: ["websocket", "polling", "flashsocket"],
});
class Chat extends Component {
  constructor(props) {
    super(props);
    this.submitChatMessage.bind(this);
    this.state = {
      chatMessage: "",
      messages: [],
    };
  }

  componentDidMount() {
    socket.on("output-messages", (data) => {
      data.forEach((message) => {
        this.setState({ messages: [...this.state.messages, message.msg] });
      });
    });

    socket.on("message", (data) =>
      this.setState({ messages: [...this.state.messages, data] })
    );
  }

  submitChatMessage() {
    socket.emit("message", this.state.chatMessage);
    this.setState({ chatMessage: "" });
  }

  render() {
    return (
      <View style={styles.messagingscreen}>
        <View style={styles.chatbody}>
          <FlatList
            data={this.state.messages}
            renderItem={({ item }) => <Message item={item} />}
          />
        </View>

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
              <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
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
  chatbody: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  messaginginputContainer: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  messaginginput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
  },
  messagingbuttonContainer: {
    width: "30%",
    backgroundColor: "green",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});

export default ChatApp;
