import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export class Message extends Component {
  render() {
    return (
      <View>
        <View style={styles.messageWrapper}>
            <View style={styles.message}>
              <Text>{this.props.m.message}</Text>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageWrapper: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  messageWrapper2: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 15,
  },
  message: {
    borderRadius: 10,
    maxWidth: "100%",
    backgroundColor: "#2F80ED",
    padding: 15,
    marginBottom: 2,
  },
});

export default Message;