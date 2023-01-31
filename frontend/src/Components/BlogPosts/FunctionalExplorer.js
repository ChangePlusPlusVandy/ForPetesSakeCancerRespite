import React, { useEffect, useState } from "react";
import { StyleSheet,Text,View, TouchableOpacity, FlatList, Image} from "react-native";
import Config from "../../Config";
import { useHistory } from "react-router-dom";

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

const ExploreScreen = () => {
    const [newsletterData, setNewsletterData]= useState([{title:"Waiting for Data, Please Hit Refresh ..."}]);
    const navigate = useHistory();

    const getAllNewsLetter = async() => {
        const promise = await fetch(Config.URL+"/api/newsletter/get_newsletters");
        let data = await promise.json();
        setNewsletterData(data);
    };

    useEffect(()=>{
        getAllNewsLetter();
    });

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
            <View style={styles.newsLetter}>
                <FlatList
                data={newsletterData}
                renderItem={({item}) => (
                    <NewsItem title={item.title} body={item.body} author={item.author}></NewsItem>
                )}
                >
                </FlatList>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => navigate.push("/")}
                >
                    <Image style={{height:'35px',width:undefined, aspectRatio:1,}} source={require('../../../public/newsletter/Home.png')}></Image>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigate.push("/profile")}
                    >
                        <Image style={{height:'35px',width:undefined, aspectRatio:1.8,}} source={require('../../../public/newsletter/ProfileButton.png')}></Image>
                </TouchableOpacity>
            </View>
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
    button: {
        alignItems: 'center',
        justifyContent:'center',
        padding: 10,
        marginBottom: 0,
        width:'50%',
        height:'100%',
    },
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
    footer:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        width:'100%',
        backgroundColor:'#088DA9',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    navText:{
        fontWeight:'500',
        fontSize:'20px',
        color:'#EEEEEE',
    }
});

export default ExploreScreen;
