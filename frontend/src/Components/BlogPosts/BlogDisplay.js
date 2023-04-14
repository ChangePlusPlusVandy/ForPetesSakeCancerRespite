import React, { useEffect, useState } from "react";
import { StyleSheet,Text,View, TouchableOpacity, FlatList, Image} from "react-native";
import Config from "../../Config";
import { useAuth } from "../../AuthContext";
import { useNavigation} from "@react-navigation/native";

const NewsItem = (props) => {
    const navigation = useNavigation()

    return (
         <View style={styles.newsItem}>
            <View style={styles.newsHeader}>
                <Image style={{flex:1, height:'100%', width:-1, borderRadius:'50%'}} source={require('../../../public/defaultProfile.png')}/>
                <Text style={{flex:4, alignSelf:'center',marginLeft:19}}>{props.author}</Text>
                <Text style={{flex:4, alignSelf:'center'}}>Posted: {props.timePosted}</Text>
            </View>
            <View style={styles.newsTitle}>
                <Text style={{fontWeight:'bold', fontSize:26}}>{props.title}</Text>
            </View>
            <TouchableOpacity 
                style={{alignSelf:'stretch', flex:1, alignItems:'center',padding:5}}
                onPress={() => navigation.navigate("BlogPage", {blogId: props.id})}>
                
                <Image style={{flex:1, height:'100%', width:-1, aspectRatio:1}} source={require('../../../public/newsletter/ViewMore.png')}></Image>
            </TouchableOpacity>
        </View>
    );
};

// const authObj = useAuth();
// var header = await authObj.getAuthHeader();

const BlogDisplay = () => {
    const authObj = useAuth();

    const [newsletterData, setNewsletterData]= useState([{title:"Waiting for Data, Please Hit Refresh ..."}]);

    const getAllNewsLetter = async() => {

        var header= await authObj.getAuthHeader();
        const promise = await fetch(Config.URL+"/api/newsletter/get_newsletters", {headers : header});
        let data = await promise.json();
        setNewsletterData(data);
        // console.log(data)
    };

    useEffect(()=>{
        getAllNewsLetter();
    }, []);

    return (            
        <View style={styles.newsLetter}>
            <FlatList
            data={newsletterData}
            renderItem={({item}) => (
                <NewsItem id={item._id} title={item.title} body={item.body} author={item.author} timePosted= {item.timePosted ? item.timePosted.substring(4,16) : ''}></NewsItem>
            )}
            >
            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    newsLetter: {
        flex:8,
        maxHeight:'60%',
        // backgroundColor:'#E5E5E525',
		justifyContent: "flex-start",
        borderColor:"#C4C4C4"
    },
    newsItem:{
        backgroundColor:'#E5E5E550',
        borderWidth:1,
        borderColor:"#C4C4C470",
        height:150,
        paddingLeft:19,
        paddingTop:10
    },
    newsHeader:{
        flex:1,
        justifyContent:'flex-start',
        flexDirection:'row',
    },
    newsTitle:{
        flex:2,
        width:'90%',
        paddingTop:10,
    },
});

export default BlogDisplay;