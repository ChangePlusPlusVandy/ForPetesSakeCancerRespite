import React, { useEffect, useState } from "react";
import { StyleSheet,Text,View, TouchableOpacity, FlatList, Image} from "react-native";
import BlogDisplay from "./BlogDisplay"
import Config from "../../Config";
import BottomBar from "../BottomBar";

const ExploreScreen = () => {

    return (
        <View style={styles.container}>
            <View style = {styles.header}>
                <View style={styles.profile}>
                    <Image style={{height:'100%',width:undefined,aspectRatio:1}} source={require('../../../public/defaultProfile.png')}/>
                </View>

                <Text style = {styles.title}>Explore</Text>
                <View style={styles.headeroptions}>
                    <TouchableOpacity style={{ width:'50%',height:'100%', alignItems:'center',flexDirection:'row'}}>
                        <Text style = {styles.optionText}>Following</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width:'50%',height:'100%',justifyContent:'flex-end', alignItems:'center',flexDirection:'row'}}>
                        <Text style={styles.optionText}> Sort By</Text>
                        <Image style={{height:15,width:15, aspectRatio:1, margin:5}} source={require('../../../public/newsletter/SortBy.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{flex:5}}>
                <BlogDisplay></BlogDisplay>
            </View>
            

            <BottomBar postEnabled={true} ></BottomBar>
        </View>
    );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundComlor: "#fff",
        backgroundColor:'E5E5E570',
		justifyContent: "flex-start",
        alignItems:"stretch",
	},
    header: {
        flex:1.5,
        backgroundColor:'#fff',
        borderBottomColor:'#C4C4C4',
        borderBottomWidth:1,
        paddingTop: 24,
        paddingLeft:24,
        paddingRight:30
    },
    title:{
        flex:1,
        fontWeight:'bold',
        color:"#088DA9",
        fontSize: 40,
    },
    profile:{
        flex:1,
        alignItems:'flex-start',
        padding:0,
        margin:0
    },
    headeroptions:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-evenly',
        width:'100%',
        paddingBottom:0,
        marginBottom:0,
    },
    optionText:{
        fontWeight:'500',
        fontSize:16,
    },
});

export default ExploreScreen;
