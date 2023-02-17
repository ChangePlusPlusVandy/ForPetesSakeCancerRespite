import React, { Component, useEffect } from "react";
import {
 View,
 FlatList,
 Text
} from "react-native";
import Message from "./Message";
import MessagesPanel from './MessagesPanel';
import Groupchat from "./Groupchat";
import { useNavigation, Link } from "@react-navigation/native";
import CONFIG from "../../Config";


class ChatApp extends Component {
 constructor(props) {
   super(props);
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
   fetch(CONFIG.URL + "/get_groupchats").then(async response => {
       let data = await response.json();
       this.setState({ groupchats: data });
   })

 }


 render() {


   //navigate to messaging panel
   return (
       <View>
           <View>
         <FlatList
           data={this.state.groupchats}
           renderItem={({ item }) =>
             <Link to={{screen: "Chat", params: {item}}}>
             <Groupchat item={item}/>
             </Link>}
         />
       </View>
       </View>
   );
 }
}

const styles = StyleSheet.create({

})

export default ChatApp;