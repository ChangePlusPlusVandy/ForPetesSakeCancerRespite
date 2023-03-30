import React, { useEffect, useState } from "react";
import { StyleSheet,Text,View, TouchableOpacity, FlatList, Image} from "react-native";
import Config from "../../Config";
import { useAuth } from "../../AuthContext";
import BottomBar from "../BottomBar";
import ImageCarousel from "./imageCarousel";


    // placeholder images
const images = [
    { id: '1', uri: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80' },
    { id: '2', uri: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
    { id: '3', uri: 'https://cdn.shopify.com/s/files/1/0070/7032/files/best-free-stock-photo-websites.jpg?v=1619036042&width=1024' },
    // Add more images here
  ]

// const PostUtility = () => {

//     return (

//     )
// }


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
                    <Image style={{flex:1.5, height:'100%', width:-1, borderRadius:'50%'}} source={require('../../../public/defaultProfile.png')}/>
                    <Text style={{flex:4, alignSelf:'center',marginLeft:'19px'}}>{newsLetter.author}</Text>
                    <Text style={{flex:4, alignSelf:'center'}}>Posted: {timePosted}</Text>
                </View>
                <View style={styles.newsTitle}>
                    <Text style={{fontWeight:'bold', fontSize:'26px'}}>{newsLetter.title}</Text>
                </View>

                {/* actually contnt */}
                <View style={styles.newsContent}>
                    <ImageCarousel></ImageCarousel>
                </View>
            </View>

            <View style={styles.utilityContainer}>
                <Text style={{margin:'15px'}}>{likeNumber}</Text>
                <TouchableOpacity onPress={() => likePost()} >
                    <Image style={{flex:1, height:'45px', width:'45px', aspectRatio:1, marginTop:'5px'}} source={require('../../../public/newsletter/LikeButton.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity></TouchableOpacity>
            </View>

            <BottomBar></BottomBar>
        </View>
        
    );
};

const styles = StyleSheet.create ({
    utilityContainer: {
        flex:1,
        width:'100%',
        height:'20%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        flexDirection:'row',
        // marginLeft:'10px',
        // marginTop:'10px',
        backgroundColor: "#fff",
    },
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
        height:'660px',
        paddingLeft:'19px',
        paddingTop:'10px',
        justifyContent:'flex-start'
    },
    newsContent:{
        flex:7
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