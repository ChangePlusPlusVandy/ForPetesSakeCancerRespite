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
          <Text style = {{
            fontSize: 15,
            fontWeight: 600,
          }}>{authObj.currentUser.username}</Text>
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
        {/* Display user's name here */}
        <View style={styles.bioContainer}>
          <Text style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>
            {authObj.currentUser.name}
          </Text>
          <Text style={{ fontSize: 15, marginBottom: -5 }}>{authObj.currentUser.bio}</Text>
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
    marginBottom: 20,
    marginTop: 0,
    height: "27%",
    width: "100%",
    justifyContent: "center",
  },
  blogDisplayContainer: {
    width: "100%",
    height: "73%",
  },
  feed: {},
  followButton: {
    borderRadius: "5px",
    backgroundColor: "#4192EF",
    width: "40%",
    height: "100%",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  messageButton: {
    borderRadius: "5px",
    backgroundColor: "#000000",
    width: "40%",
    height: "100%",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextStyle: {
    color: "#fff",
    fontWeight: 400,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "100%",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-evenly",
    marginLeft: 10,
    marginTop: "3%",
  },
  statsContainer: {
    width: "70%",
    height: "60%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "flex-end",
  },
  followersNumber: {
    justifyContent: "center",
    marginBottom: "10%",
    alignItems: "center",
  },
  postsNumber: {
    justifyContent: "center",
    marginBottom: "10%",
    alignItems: "center",
  },
  followingNumber: {
    justifyContent: "center",
    marginBottom: "10%",
    alignItems: "center",
  },
  profilePicture: {
    width: 60,
    height: 60,
    marginLeft: "5%",
    alignSelf: "center",
  },
  topOfTopPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  usernameTextContainer: {
    marginTop: 5,
    alignSelf: "center",
    justifyContent: "center",
    height: "15%",
  },
  bioContainer: {
    alignItems: "flex-start",
    marginLeft: "7%",
    marginTop: "2%",
  },
});

export default ProfileScreen;
