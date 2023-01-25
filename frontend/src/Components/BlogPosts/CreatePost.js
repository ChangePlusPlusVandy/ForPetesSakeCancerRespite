import React, { useState, useEffect} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { IconButton, MD3Colors } from "react-native-paper";

const CreatePost = () => {
  const { currentUserIn } = useAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await login(email, password);
			history.push("/"); // Redirect to home page
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	};

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
          onPres = {handleSubmit}
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
      <View style={styles.rectangle}>
        <View style = {styles.homeButtonContainer}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <IconButton
              icon="home"
              iconColor={"white"}
              size={50}
              onPress={() => console.log("Pressed")}
            />
          </Link>
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <IconButton
              icon="account-circle"
              iconColor={"white"}
              size={50}
              onPress={() => console.log("Pressed")}
            />
          </Link>
        </View>
      </View>
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
  rectangle: {
    width: "100%",
    bottom: 0,
    position: "absolute",
    height: "18%",
    backgroundColor: "#088DA9",
    flexDirection: "row", 
    justifyContent: "center"
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
  homeButtonContainer: {
    width: "85%",
    margin: 10,
    flexDirection: "row", 
    justifyContent: "space-between"
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
