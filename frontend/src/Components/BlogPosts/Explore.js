import React, { Component } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import Config from "../../Config";
import { Link } from "react-router-dom";


class NewsItem extends Component {
    render() {
        return (
            <View style={styles.newsItem}>
                <View style={styles.newsHeader}>
                    <View style={{flex:1}}><Text>Profile Pic</Text></View>
                    <Text style={{flex:8, marginLeft:'19px'}}>{this.props.author}</Text>    
                </View> 
                <View style={styles.newsTitle}>
                    <Text style={{fontWeight:'bold', marginLeft:'19px', fontSize:'26px'}}>{this.props.title}</Text>
                </View>
                <TouchableOpacity style={{alignSelf:'center', flex:1, alignItems:'stretch'}}>
                    <Text>Read More ...</Text>
                </TouchableOpacity>
            </View>
        );
    } 
}


export default class ExploreScreenOld extends Component {
    state = {
        newsletterData : [{title:"Waiting for Data, Please Hit Refresh ..."}]
    }

    getAllNewsLetter = async() => {
        const promise = await fetch(Config.URL+"/api/newsletter/get_newsletters");
        let data = await promise.json();
        this.setState({
            newsletterData : data
        })
    }

	render() {
		return (
			<View style={styles.container}>
                <View style = {styles.header}>
                    <View style={styles.profile}></View>
                    <Text style = {styles.title}>Explore</Text>
                    <View style={styles.headeroptions}>
                        <TouchableOpacity style={{ width:'50%',height:'100%', alignItems:'flex-start', paddingLeft:'30px'}}>
                            <Text style = {styles.optionText}>Following</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{width:'50%',height:'100%', alignItems:'flex-end', paddingRight:'30px'}}>
                            <Text style={styles.optionText}> Sort By</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.newsLetter}>
                    <FlatList
                    data={this.state.newsletterData}
                    renderItem={({item}) => (
                        <NewsItem title={item.title} body={item.body} author={item.author}></NewsItem>
                    )}
                    >
                    </FlatList>
                </View>
    
                <View style={styles.footer}>
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={this.getAllNewsLetter}
                    >
                        <Text style = {styles.navText}>Refresh</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}>
                        <Text style = {styles.navText}> 
                              Home
                        </Text>
                    </TouchableOpacity>
                </View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "flex-start",
	},
    button: {
        alignItems: 'center',
        padding: 10,
        marginBottom: 0,
        width:'50%',
        height:'100%',
    },
    newsLetter: {
        flex:8,
        backgroundColor:'#FFFFFF',
		justifyContent: "flex-start",
        borderColor:"#C4C4C4"
    },
    newsItem:{
        backgroundColor:'#E5E5E5',
        borderWidth:'1px',
        borderColor:"#C4C4C4",
        height:'183px',
    },
    newsHeader:{
        flex:1,
        justifyContent:'flex-start',
        flexDirection:'row',
    },
    newsTitle:{
        flex:2
    },
    header: {
        flex:3,
        borderBottomColor:'#C4C4C4',
        borderBottomWidth:'1px',
    },
    title:{
        flex:2,
        fontWeight:'bold',
        color:"#088DA9",
        fontSize: '40px',
        alignSelf:"flex-start",
        marginLeft:'24px'
    },
    profile:{
        flex:2,

    },
    headeroptions:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-evenly',
        width:'100%',
        paddingBottom:'0px',
        marginBottom:'0px',
    },
    optionText:{
        fontWeight:'500',
        fontSize:'15px',
    },
    footer:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-evenly',
        width:'100%',
        backgroundColor:'#088DA9',
        // borderWidth:'1px',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    navText:{
        fontWeight:'500',
        fontSize:'20px',
        color:'#EEEEEE',
    }
});

ExploreScreen.propTypes = {
	navigation: PropTypes.any.isRequired
};