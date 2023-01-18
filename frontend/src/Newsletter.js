import React, { Component } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";


class NewsItem extends Component {
    render() {
        return (
            <View style={StyleSheet.newsLetter}>
                <Text>{this.props.title}</Text>
                <Text>{this.props.body}</Text>
                <Text>{this.props.author}</Text>
            </View> 
        );
    } 
}


export default class NewsletterScreen extends Component {
    state = {
        newsletterData : [{title:"Waiting for Data, Please Hit Refresh ..."}]
    }

    getAllNewsLetter = async() => {
        const promise = await fetch("http://10.20.0.230:3000/api/newsletter/get_newsletters");
        // http://10.76.25.107:3000/api/newsletter/get_newsletters FGH
        // http://10.20.0.230:3000/api/newsletter/get_newsletters  VV
        let data = await promise.json();
        this.setState({
            newsletterData : data
        })
        console.log(data[1].title)
    }

	render() {
		return (
			<View style={styles.container}>
                <FlatList
                 data={this.state.newsletterData}
                 renderItem={({item}) => (
                    <View>
                        <Text>{item.title}</Text>
                        <Text>{item.body}</Text>
                        <Text>{item.author}</Text>
                    </View> 
                 )}
                 >
                </FlatList>

                <TouchableOpacity 
                 style={styles.button}
                 onPress={this.getAllNewsLetter}
                >
                    <Text>Refresh</Text>
                </TouchableOpacity>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
	},
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 10
    },
    newsLetter: {
        alignItems: "center",
		justifyContent: "flex-start",
        borderColor:"#34495E "
    },
});

NewsletterScreen.propTypes = {
	navigation: PropTypes.any.isRequired
};