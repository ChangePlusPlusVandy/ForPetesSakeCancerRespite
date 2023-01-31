import React, { Component, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  Alert,
  Button,
} from "react-native";
import Message from "./Message";
import { io } from "socket.io-client";
import CONFIG from "../../Config";

const socket = io(CONFIG.URL, {
  transports: ["websocket", "polling", "flashsocket"],
});
class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.submitChatMessage.bind(this);
    this.state = {
      userNameSelected: false,
      userName: "",
      chatMessage: "",
      messages: [],
      users: [],
      selectedUser: null,
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
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        this.usernameAlreadySelected = false;
      }
    });
    const initReactiveProperties = (user) => {
      user.connected = true;
      user.messages = [];
      user.hasNewMessages = false;
    };

    socket.on("users", (users) => {
      console.log(users);
      users.forEach((user) => {
        user.self = user.userID === socket.id;
        initReactiveProperties(user);
        console.log(users);
      });
      // put the current user first, and then sort by username
      this.users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });

      socket.on("user connected", (user) => {
        initReactiveProperties(user);
        this.setState({ users: [...this.state.users, user] });
        console.log(users);
      });
    });
  }

  submitChatMessage() {
    socket.emit("message", this.state.chatMessage);
    this.setState({ chatMessage: "" });
  }
  onUsernameSelection(username) {
    this.usernameAlreadySelected = true;
    socket.auth = { username };
    socket.connect();
  }

  onClick() {
    if (this.state.userName === "") {
      Alert("Your username should not be blank!");
    } else {
      this.setState({ userNameSelected: true });
      // Connect to Socket here and continue on from here
      this.onUsernameSelection(this.state.userName);
    }
  }
  /*
{this.state.userNameSelected ? (
          <div>
            <View style={styles.messagingscreen}>
            {this.state.users.map((user, i) => {
                  return(
                    <div key={i}>
                      <User user={user}/>
                    </div>
                  )
                })}
                
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
          </div>
        ) : (
          <div></div>
        )}

*/
  // TO-DO
  // DISPLAY ALL USERS POSSIBLE TO MESSAGE TO
  // CREATE A PAGE FOR USERS TO CLICK ON
  // THEN CHAT FOR IT AND THE USERS

  render() {
    return (
      <>
        {!this.state.userNameSelected ? (
          <div>
            <TextInput
              placeholder="Your username..."
              value={this.state.userName}
              onChangeText={(text) => {
                this.setState({ userName: text });
              }}
            ></TextInput>
            <Button title="Press me" onPress={() => this.onClick()} />
          </div>
        ) : (
          <div>USERNAME SENT</div>
        )}

        <View>
          {this.state.users.length > 0 ? (
            <FlatList
              data={this.state.users}
              renderItem={({ item }) => <User user={item} />}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <h1>No rooms available</h1>
          )}
        </View>
      </>
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
