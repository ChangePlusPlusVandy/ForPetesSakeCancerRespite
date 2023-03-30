import React, { useEffect, useState } from "react";
import { StyleSheet,Text,View, TouchableOpacity, FlatList, Image} from "react-native";
import Config from "../../Config";
import { useAuth } from "../../AuthContext";
import BottomBar from "../BottomBar";

const BlogPage = ({route, navigation}) => {
    const {blogId} = route.params;
    const authObj = useAuth();

    const [newsLetter, setNewsLetter] = useState({})
    const [likeNumber, setLikeNumber] = useState(0)

    // var likeNumber = 0;

    const getNewsLetterbyID = async() => {
        var header = await authObj.getAuthHeader();
        const promise = await fetch(Config.URL+`/api/newsletter/get_newsletter_byID/?blogId=${blogId}`, 
        {
            headers : header,
        });
        let data = await promise.json();
        // console.log(data);
        setNewsLetter(data);
        if (typeof newsLetter.postsLiked === 'undefined') {
            setLikeNumber(0)
        } else {
            setLikeNumber(newsLetter.postsLiked.length);
        }
    };

    const likePost = async() => {
        var header = await authObj.getAuthHeader();
        const promise = await fetch(Config.URL+`/api/newsletter/like_post/?blogId=${blogId}`, 
        {
            method: 'PUT',
            headers: 
            { 
                'Content-Type': 'application/json' ,
                ...header
            },
            
        });
        // console.log(Config.URL+`/api/newsletter/like_post/?blogId=${blogId}`)
        let data = await promise.json();
        // console.log(data);
        getNewsLetterbyID();
        console.log(likeNumber)

    };

    useEffect(() => {
        getNewsLetterbyID();
    });

    
    let timePosted= newsLetter.timePosted ? newsLetter.timePosted.substring(4,16) : '';

    return (
        <View style={styles.container}>
            
            <View style={styles.newsItem}>
                <View style={styles.newsHeader}>
                    <Image style={{flex:1, height:'100%', width:-1, borderRadius:'50%'}} source={require('../../../public/defaultProfile.png')}/>
                    <Text style={{flex:4, alignSelf:'center',marginLeft:'19px'}}>{newsLetter.author}</Text>
                    <Text style={{flex:4, alignSelf:'center'}}>Posted: {timePosted}</Text>
                </View>
                <View style={styles.newsTitle}>
                    <Text style={{fontWeight:'bold', fontSize:'26px'}}>{newsLetter.title}</Text>
                </View>

                <TouchableOpacity 
                    style={{alignSelf:'stretch', flex:1, alignItems:'center',padding:'5px'}}
                    onPress={() => likePost()}>
                    
                    <Image style={{flex:1, height:'100%', width:-1, aspectRatio:1}} source={require('../../../public/newsletter/LikeButton.png')}></Image>
                </TouchableOpacity>
                <Text>{likeNumber}</Text>
            </View>

            <BottomBar></BottomBar>
        </View>
        
    );
};

const styles = StyleSheet.create ({
    container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "flex-start",
        alignItems:"stretch",
	},
    newsItem:{
        backgroundColor:'#E5E5E550',
        borderWidth:'1px',
        borderColor:"#C4C4C470",
        height:'183px',
        paddingLeft:'19px',
        paddingTop:'10px',
        justifyContent:'flex-start'
    },
    newsHeader:{
        flex:1,
        justifyContent:'flex-start',
        flexDirection:'row',
    },
    newsTitle:{
        flex:2,
        width:'90%',
        paddingTop:'10px',
    },
});

export default BlogPage;