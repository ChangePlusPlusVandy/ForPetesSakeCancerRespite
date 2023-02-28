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
                        <Image style={{height:'15px',width:'15px', aspectRatio:1, margin:'5px'}} source={require('../../../public/newsletter/SortBy.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>

            <BlogDisplay></BlogDisplay>

            <BottomBar postEnabled={true} ></BottomBar>
        </View>
    );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "flex-start",
        alignItems:"stretch",
	},
    header: {
        flex:2.5,
        borderBottomColor:'#C4C4C4',
        borderBottomWidth:'1px',
        paddingTop: '24px',
        paddingLeft:'24px',
        paddingRight:'30px'
    },
    title:{
        flex:1.5,
        fontWeight:'bold',
        color:"#088DA9",
        fontSize: '40px',
    },
    profile:{
        flex:2,
        alignItems:'flex-start',
        padding:'0px',
        margin:'0px'
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
        fontSize:'16px',
    },
});

export default ExploreScreen;
