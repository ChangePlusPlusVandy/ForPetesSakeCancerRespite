import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../AuthContext";
import CONFIG from "../../Config";
import BottomBar from "../BottomBar";
import { useNavigation, Link } from "@react-navigation/native";

const CreatePost = () => {
  const { currentUserIn } = useAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const postData = async () => {

    try {
      const response = await fetch(CONFIG.URL + '/api/newsletter/create_newsletter', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        body: JSON.stringify({title: title, body: body}),
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
		e.preventDefault();
    if(!title || !body){
      return;
    } else {
      postData();
    }
	};

  const navigation = useNavigation();
  
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Create post</Text>
        <TextInput
          style={styles.title_input}
          placeholder="Subject"
          placeholderTextColor="#474C4D"
          onChangeText={(e) => setTitle(e)}
        />
      </View>
      <View style={styles.container}>
        <View
          style={{
            height: "58%",
            width: "85%",
          }}
        >
          <TextInput
            multiline
            allowFontScaling
            enablesReturnKeyAutomatically="true"
            placeholderTextColor="#474C4D"
            style={styles.postInput}
            textAlign={"center"}
            placeholder="Write here..."
            onChangeText={(e) => setBody(e)}
          />
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            width: "100%",
            height: "8%",
          }}
        >
          <TouchableOpacity 
          style={styles.postButton}
          onPress = {handleSubmit}
          >
            <Text
              style={{
                color: "white",
                fontWeight: 400,
                fontSize: 16,
              }}
            >
              Publish
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomBar></BottomBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  postButton: {
    backgroundColor: "#088DA9",
    borderRadius: 15,
    marginBottom: 20,
    marginRight: "10%",
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title_input: {
    height: "40%",
    width: "55%",
    alignItems: "left",
    justifyContent: "left",
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#d9d9d959",
    borderColor: "#5f6566",
    fontWeight: 700,
    fontSize: 20,
    color: "#474C4D",
  },
  postInput: {
    height: "100%",
    borderRadius: 15,
    borderColor: "#5f6566",
    width: "100%",
    backgroundColor: "#d9d9d959",
    padding: 15,
    marginBottom: 20,
    fontWeight: 500,
    fontSize: 20,
    color: "#474C4D",
  },
  titleContainer: {
    height: "20%",
    width: "100%",
    alignItems: "left",
    justifyContent: "space-evenly",
    marginLeft: "8%",
    marginTop: "20%",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 36,
    color: "#088DA9",
    fontStyle: "normal",
  },
});

export default CreatePost;
