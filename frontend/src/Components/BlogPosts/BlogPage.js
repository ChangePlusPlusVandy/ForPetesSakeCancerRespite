import React, { useEffect, useState } from "react";
import { StyleSheet,Text,View, TouchableOpacity, ScrollView, Image} from "react-native";
import Config from "../../Config";
import { useAuth } from "../../AuthContext";
import BottomBar from "../BottomBar";
import ImageCarousel from "./imageCarousel";
import { TextInput } from "react-native-gesture-handler";


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
    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState([])
    

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

    const postComment = async() => {
        var header = await authObj.getAuthHeader();
        const promist = await fetch(Config.URL+`/api/newsletter/create_comment/?blogId=${blogId}`,
        {
            method: 'PUT',
            headers: 
            { 
                'Content-Type': 'application/json' ,
                ...header
            },
            body: JSON.stringify({content:comment})
        });
        getNewsLetterbyID();
    };


    useEffect(() => {
        getNewsLetterbyID();
    }, []);

    
    let timePosted= newsLetter.timePosted ? newsLetter.timePosted.substring(4,16) : '';

    return (
        <View style={styles.container}>
            <View style={{height:585, backgroundColor:'#E5E5E550'}}>
                <ScrollView contentContainerStyle={styles.newsItem}>
                    <View>
                        <ImageCarousel  imgLink={images}></ImageCarousel>
                    </View>

                    <Text style={{ fontWeight:'bold', fontSize:23, paddingTop:15,paddingLeft:15, paddingRight:15}}>{newsLetter.title}</Text>
                    <Text style={{ fontSize:18, paddingLeft:15, paddingRight:15}}>{newsLetter.body}</Text>

                    <View style={{borderTopWidth:1, marginTop:15, marginBottom:15}}>
                        <Text style={{fontWeight:'600', fontSize:18, paddingLeft:15, paddingRight:15}}>Comments</Text>
                    </View>

                    <View>
                        { newsLetter.comments && newsLetter.comments.map((comment) => {
                            return (
                                <Text style={styles.comment}>{comment.content}</Text>
                            );
                        })}
                    </View>

                </ScrollView>
            </View>
            
            
            <View style={styles.utilityContainer}>
                <View style={{marginLeft:10}}>
                    <Text style={{color:'#FF3D00'}}>{likeNumber}</Text>
                </View>
                
                <TouchableOpacity onPress={() => likePost()} >
                    <Image style={{ height:45, width:45, aspectRatio:1}} source={require('../../../public/newsletter/LikeButton.png')}></Image>
                </TouchableOpacity>
                
                <TextInput
                     placeholder="Write here..."
                     style={styles.input}
                     onChangeText={(e) => setComment(e)}
                    />

                <TouchableOpacity  onPress={() => postComment()}>
                    <Image style={{ height:45, width:45, aspectRatio:1, margin:10}} source={require('../../../public/newsletter/commentButton.png')}></Image>
                </TouchableOpacity>
            </View>
            
            <BottomBar></BottomBar>
        </View>
        
    );
};

const styles = StyleSheet.create ({
    utilityContainer: {
        // flex:1,
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        backgroundColor: "#E5E5E550",
        // borderTop
    },
    comment:{
        paddingLeft:15, 
        paddingRight:15,
    },
    input: {
        height: 40,
        width: 250,
        borderWidth: 1,
        padding: 10,
      },
    container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "flex-start",
        // alignItems:"flex-start",
	},
    newsItem:{
        // flex:1,
        backgroundColor:'#E5E5E550',
        borderColor:"#C4C4C470",
        justifyContent:'flex-start'
    },
    // newsContent:{
    // },
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

export default BlogPage;