import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types"

export default class Doga extends Component {
    state = {
        name: ""
    }

    componentDidMount(){
        this.getName()
    }

    async getName(){
        await fetch("http://localhost:3000/team/doga")
        .then((response) => 
            response.json()
        )
        .then((data) => {
            console.log(data)
            this.setState({name: data})
        }
        )
    }

    render(){
        return(
            <View>
            <Text>{this.state.name}</Text>
            </View>
        )
    }
}