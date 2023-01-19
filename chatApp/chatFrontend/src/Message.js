import React, {Component} from "react";
import { StyleSheet, Text, View } from 'react-native';

class Message extends Component {
    render(){
        return(
            <View>
                <View style={styles.messageWrapper}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={styles.message}>
                            <Text>{this.props.item}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    messageWrapper: {
        width: "100%",
        alignItems: "flex-start",
        marginBottom: 15,
    },
    message: {
        maxWidth: "100%",
        backgroundColor: "#f5ccc2",
        padding: 15,
        borderRadius: 10,
        marginBottom: 2,
    }
});

export default Message;