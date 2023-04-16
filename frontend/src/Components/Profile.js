import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { useAuth } from "../AuthContext";
import { useNavigation, Link } from "@react-navigation/native";
import BlogDisplay from "./BlogPosts/BlogDisplay";

const ProfileScreen = () => {
  const authObj = useAuth();
  let userDisplayObject = authObj.currentUser;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <View style={styles.usernameTextContainer}>
          <Text
            style={{
              fontSize: 15,
            }}
          >
            {authObj.currentUser.username}
          </Text>
        </View>
        <View style={styles.topOfTopPart}>
          <Image
            style={styles.profilePicture}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
          <View style={styles.statsContainer}>
            <View style={styles.postsNumber}>
              <Text>5</Text>
              <Text>Posts</Text>
            </View>
            <View style={styles.followersNumber}>
              <Text>124</Text>
              <Text>Followers</Text>
            </View>
            <View style={styles.followingNumber}>
              <Text>100</Text>
              <Text>Following</Text>
            </View>
          </View>
        </View>
        <View style={styles.bioContainer}>
          <Text style={{ fontSize: 18, marginBottom: 4 }}>
            {authObj.currentUser.name}
          </Text>
          <Text style={{ fontSize: 15, color: "#888888" }}>{authObj.currentUser.bio}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.buttonTextStyle}>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton}>
            <Text style={styles.buttonTextStyle}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.blogDisplayContainer}>
        <BlogDisplay></BlogDisplay>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    height: "100%",
  },
  topPart: {
    backgroundColor: "#fff",
    height: "25%",
    width: "100%",
    justifyContent: "center",
    paddingLeft: 20,
    paddingBottom: 10,
  },
  topOfTopPart: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5,
  },
  blogDisplayContainer: {
    width: "100%",
    height: "75%",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "60%",
    height: "20%",
    alignItems: "center",
  },
  statsContainer: {
    width: "70%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  followButton: {
    borderRadius: 5,
    backgroundColor: "#088DA9",
    width: "40%",
    height: "80%",
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  messageButton: {
    borderRadius: 5,
    backgroundColor: "#000000",
    width: "40%",
    height: "80%",
    marginLeft: 20,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextStyle: {
    color: "#fff",
    fontSize: 16,
  },
  followersNumber: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  postsNumber: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  followingNumber: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  profilePicture: {
    width: 60,
    height: 60,
    alignSelf: "center",
  },
  usernameTextContainer: {
    marginTop: 10,
    alignSelf: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "10%",
  },
  bioContainer: {
    alignItems: "flex-start",
    marginTop: 3,
    marginBottom: 3,
  },
});

export default ProfileScreen;
