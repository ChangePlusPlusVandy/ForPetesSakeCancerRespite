import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export class Message extends Component {
  render() {
    return (
      <View>
        <View style={{flexDirection: "row"}}>
        <Ionicons style={{paddingTop: 10}} name="person-circle" size={40} color="black" />
        <View style={styles.messageWrapper}>
            <View style={styles.message}>
              <Text>Message 1</Text>
            </View>
        </View>
        </View>
        <View style={{flexDirection: "row"}}>
        <View style={styles.messageWrapper2}>
            <View style={styles.message2}>
              <Text>Message 2</Text>
            </View>
        </View>
        <Ionicons style={{paddingTop: 10}} name="person-circle" size={40} color="black" />
        </View>
      </View>
    );
  }
}

// <Text>{this.props.m.message}</Text> instead of message
// give a property to see if the message is from them or not

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