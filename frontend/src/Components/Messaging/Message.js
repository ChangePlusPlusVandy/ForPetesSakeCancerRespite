import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export class Message extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: this.props.message
    }
  }

  render() {
    return (
      <View>
        <View style={{flexDirection: "row"}}>
        <Ionicons style={{paddingTop: 10}} name="person-circle" size={40} color="black" />
        <View style={styles.messageWrapper}>
            <View style={styles.message}>
              {this.state.data && (
                <>
                  <Text>{this.state.data.message}</Text>
                </>
              )}
            </View>
        </View>
        </View>
      </View>
    );
  }
}

// give a property to see if the message is from the user or not
// <Text>{this.props.message.message}</Text>
/* 
<View style={{flexDirection: "row"}}>
        <View style={styles.messageWrapper2}>
            <View style={styles.message2}>
              <Text>Message 2</Text>
            </View>
        </View>
        <Ionicons style={{paddingTop: 10}} name="person-circle" size={40} color="black" />
        </View>
*/

const styles = StyleSheet.create({
  messageWrapper: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  messageWrapper2: {
    width: "92%",
    alignItems: "flex-end",
  },
  message: {
    borderRadius: 10,
    maxWidth: "100%",
    backgroundColor: "#F7F7F7",
    padding: 15,
    marginBottom: 2,
  },
  message2: {
    borderRadius: 10,
    maxWidth: "100%",
    backgroundColor: "#2F80ED",
    padding: 15,
    marginBottom: 2,
  },
});

export default Message;