import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import PropTypes from "prop-types";
import { useAuth } from "../AuthContext";
import { useNavigation, Link } from "@react-navigation/native";
import BlogDisplay from "./BlogPosts/BlogDisplay";
import { IconButton } from "react-native-paper";

const EditProfileScreen = () => {
  const authObj = useAuth();
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  let userDisplayObject = authObj.currentUser;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <Text style = {{color: "white", alignSelf: "center"}}>Edit Profile</Text>
        <IconButton
          icon="square-edit-outline"
          iconColor={"white"}
          size={30}
          onPress={() => console.log("Pressed")}
          style = {styles.iconButton}
        />
      </View>

      <View style={styles.bottomPart}>
        <Text style={styles.textStyle}> Username </Text>
        <TextInput
          style={styles.textInputs}
          placeholder="Username"
          placeholderTextColor="#474C4D"
          onChangeText={(e) => setUsername(e)}
        />
        <Text style={styles.textStyle}> Email Address </Text>
        <TextInput
          style={styles.textInputs}
          placeholder="Email Address"
          placeholderTextColor="#474C4D"
          onChangeText={(e) => setEmailAddress(e)}
        />
        <Text style={styles.textStyle}> Phone Number </Text>
        <TextInput
          style={styles.textInputs}
          placeholder="Phone Number"
          placeholderTextColor="#474C4D"
          onChangeText={(e) => setPhoneNumber(e)}
        />
        <Text style={styles.textStyle}> Password </Text>
        <TextInput
          style={styles.textInputs}
          placeholder="Username"
          placeholderTextColor="#474C4D"
          onChangeText={(e) => setPassword(e)}
        />

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonTextStyle}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  topPart: {
    backgroundColor: "#088DA9",
    height: "30%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bottomPart: {
    backgroundColor: "##fff",
    margin: 10,
    height: "80%",
    width: "70%",
    justifyContent: "flex-start",
  },
  textInputs: {
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 8,
    height: "8%",
    padding: 10,
    alignSelf: "auto",
    width: "100%",
    marginBottom: "5%",
  },
  iconButton:{
    alignSelf: "center",
  },
  textStyle: {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 17,
    marginBottom: 5,
    marginTop: 5,
  },
  buttonTextStyle: {
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 18,
  },
  editButton: {
    backgroundColor: "#088da91c",
    width: "80%",
    borderRadius: 10,
    height: "7%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  //   feed: {},
  //   followButton: {
  //     borderRadius: "5px",
  //     backgroundColor: "#4192EF",
  //     width: "40%",
  //     height: "100%",
  //     padding: 8,
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  //   messageButton: {
  //     borderRadius: "5px",
  //     backgroundColor: "#000000",
  //     width: "40%",
  //     height: "100%",
  //     padding: 8,
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  //   buttonTextStyle: {
  //     color: "#fff",
  //     fontWeight: 400,
  //     fontSize: 16,
  //     fontWeight: 500,
  //     lineHeight: "100%",
  //   },
  //   buttonsContainer: {
  //     flexDirection: "row",
  //     width: "60%",
  //     justifyContent: "space-evenly",
  //     marginLeft: 10,
  //     marginTop: "3%",
  //   },
  //   statsContainer: {
  //     width: "70%",
  //     height: "60%",
  //     flexDirection: "row",
  //     justifyContent: "space-evenly",
  //     alignSelf: "flex-end",
  //   },
  //   followersNumber: {
  //     justifyContent: "center",
  //     marginBottom: "10%",
  //     alignItems: "center",
  //   },
  //   postsNumber: {
  //     justifyContent: "center",
  //     marginBottom: "10%",
  //     alignItems: "center",
  //   },
  //   followingNumber: {
  //     justifyContent: "center",
  //     marginBottom: "10%",
  //     alignItems: "center",
  //   },
  //   profilePicture: {
  //     width: 60,
  //     height: 60,
  //     marginLeft: "5%",
  //     alignSelf: "center",
  //   },
  //   topOfTopPart: {
  //     flexDirection: "row",
  //     justifyContent: "space-between",
  //     margin: 10,
  //   },
  //   bioContainer: {
  //     alignItems: "flex-start",
  //     marginLeft: "7%",
  //     marginTop: "2%",
  //   },
  //   blogDisplayContainer: {
  //     width: "100%",
  //   },
});

export default EditProfileScreen;
