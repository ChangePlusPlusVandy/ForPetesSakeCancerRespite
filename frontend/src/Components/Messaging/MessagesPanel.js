import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import Message from './Message';
import io from "socket.io-client";
import CONFIG from "../../Config";

const socket = io(CONFIG.URL, {
  transports: ["websocket", "polling", "flashsocket"],
});

class MessagesPanel extends Component {

  constructor(props) {
    super(props);
    this.submitChatMessage.bind(this);
    this.state = {
      chatMessage: '', 
      messages: [this.props.item.messages],
      id: this.props.item._id
    };
  }



  submitChatMessage = (msg, id) => {
    /*
    socket.emit('send-message', {msg, id});
    */
  }

    render(){
      
        return (
          <View style={styles.messagingscreen}>
            <View style={styles.chatbody}>
            <FlatList
                data={this.state.messages}
                renderItem={({ m }) =><Message message={m} />}
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
                onSubmitEditing={() => this.submitChatMessage(this.state.chatMessage, this.state.id)}
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
      };
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

    export default MessagesPanel;