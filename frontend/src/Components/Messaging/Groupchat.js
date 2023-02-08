import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class Groupchat extends Component{
    render(){

        debugger
        return(
            <View>
                <Text>{this.props.item.name}</Text>
                <Text>{this.props.item.last_message.message}</Text>
            </View>
        )
    }
}

export default Groupchat;