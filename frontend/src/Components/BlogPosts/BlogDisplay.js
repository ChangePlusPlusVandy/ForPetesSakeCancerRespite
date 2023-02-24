import React, { useEffect, useState } from "react";
import { StyleSheet,Text,View, TouchableOpacity, FlatList, Image} from "react-native";
import Config from "../../Config";

const NewsItem = (props) => {
    return (
         <View style={styles.newsItem}>
            <View style={styles.newsHeader}>
                <Image style={{flex:1, height:'100%', width:-1, borderRadius:'50%'}} source={require('../../../public/defaultProfile.png')}/>
                <Text style={{flex:4, alignSelf:'center',marginLeft:'19px'}}>{props.author}</Text>
                <Text style={{flex:4, alignSelf:'center'}}>Posted:1/11/202</Text>
            </View>
            <View style={styles.newsTitle}>
                <Text style={{fontWeight:'bold', fontSize:'26px'}}>{props.title}</Text>
            </View>
            <TouchableOpacity style={{alignSelf:'stretch', flex:1, alignItems:'center',padding:'5px'}}>
                <Image style={{flex:1, height:'100%', width:-1, aspectRatio:1}} source={require('../../../public/newsletter/ViewMore.png')}></Image>
            </TouchableOpacity>
        </View>
    );
};

const BlogDisplay = () => {
    const [newsletterData, setNewsletterData]= useState([{title:"Waiting for Data, Please Hit Refresh ..."}]);

    const getAllNewsLetter = async() => {
        const promise = await fetch(Config.URL+"/api/newsletter/get_newsletters");
        let data = await promise.json();
        setNewsletterData(data);
    };

    useEffect(()=>{
        getAllNewsLetter();
    });

    return (            
        <View style={styles.newsLetter}>
            <FlatList
            data={newsletterData}
            renderItem={({item}) => (
                <NewsItem title={item.title} body={item.body} author={item.author}></NewsItem>
            )}
            >
            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    newsLetter: {
        flex:8,
        maxHeight:'70vh',
        backgroundColor:'#FFFFFF',
		justifyContent: "flex-start",
        borderColor:"#C4C4C4"
    },
    newsItem:{
        backgroundColor:'#E5E5E550',
        borderWidth:'1px',
        borderColor:"#C4C4C470",
        height:'183px',
        paddingLeft:'19px',
        paddingTop:'10px'
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

export default BlogDisplay;