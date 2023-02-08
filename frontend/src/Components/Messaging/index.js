import React, { Component, useEffect } from "react";
import {
 View,
 FlatList,
} from "react-native";
import Message from "./Message";
import MessagesPanel from './MessagesPanel';
import Groupchat from "./Groupchat";
import { Link } from "react-router-dom";


class ChatApp extends Component {
 constructor(props) {
   super(props);
   //this.submitChatMessage.bind(this);
   this.state = {
     groupchats: []
   };
 }


 componentDidMount() {
   //loading channels
   this.getGroupchats();
 }


 getGroupchats = async () => {
   //api request to get all the users
   /*
   fetch(CONFIG.URL + "/get_groupchats").then(async response => {
       let data = await response.json();
       this.setState({ groupchats: data });
   })
   */
   let data = [
     {
       "_id" : "mongodbid",
       "last_message" : {
         "_id": "mongoid",
         "user": "userid",
         "username" : "aryan_garg123",
         "message": "Hello Guys!",
         "timestamp": 1234234234234
       },
       "name": "gc name",
       "messages": ["m1", "m2"]
     },
     {
       "_id" : "mongodbid",
       "last_message" : {
         "_id": "mongoid",
         "user": "userid",
         "username" : "aryan_garg123",
         "message": "Hello Guys!",
         "timestamp": 1234234234234
       },
       "name": "gc name",
       "messages": ["m3", "m4"]
     }
   ];
   this.setState({ groupchats: data });
 }


 enterChat = (_id) => {


 }


 render() {


   //navigate to messaging panel
   return (
       <View>
           <View>
         <FlatList
           data={this.state.groupchats}
           renderItem={({ item }) =>
             <Link to={"/messaging"} state={item}>
             <Groupchat item={item}/>
             </Link>}
         />
       </View>
       </View>
   );
 }
}


export default ChatApp;