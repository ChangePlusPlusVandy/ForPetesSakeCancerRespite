import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../AuthContext";
import { useNavigation, Link } from "@react-navigation/native";
import BlogDisplay from "./BlogPosts/BlogDisplay";
import CONFIG from "../Config";
import BottomBar from "./BottomBar";

const ProfileScreen = ({ route, navigation }) => {
  const authObj = useAuth();
  const [userObject, setUserObject] = useState({});
  const [loading, setLoading] = useState(true);
  // const navigation = useNavigation();

  const loadUserObject = async (route) => {
    if (!route.params) {
      setUserObject(authObj.currentUser);
    } else {
      var url = CONFIG.URL + "/api/users/get_user?id=" + route.params.userId;
      let authHeader = await authObj.getAuthHeader();
      // let token = await authObj.getTolken();
      const promise = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...authHeader,
        },
        cache: "no-cache",
        credentials: "same-origin", // include, *same-origin, omit
        // userToken : await authObj.getToen()
      });
      var data = await promise.json();
      setUserObject(data.user);
    }
  };

  const followUser = async () => {
    // if (userObject._id == authObj.currentUser._id) return;
    var url = CONFIG.URL + "/api/users/add_follower?id=" + userObject._id;
    
    let authHeader = await authObj.getAuthHeader();
    // let token = await authObj.getTolken();
    const promise = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...authHeader,
      },
      cache: "no-cache",
      credentials: "same-origin", // include, *same-origin, omit
    });
    console.log(promise.json());
  };

  useEffect(() => {
    async function fetchData() {
      await loadUserObject(route).catch((e) => {
        console.log("Error: " + e);
      });
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading == false) {
    return (
      <View style={styles.container}>
        <View style={styles.topPart}>
          <View style={styles.topOfTopPart}>
            <Image
              style={styles.profilePicture}
              source={{
                uri: userObject.profile_picture ? userObject.profile_picture : "../../public/defaultProfile.png",
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
              {userObject.name}
            </Text>
            <Text style={{ fontSize: 15, color: "#888888" }}>
              {userObject.bio}
            </Text>
          </View>

          {(() => {
            if (userObject._id == authObj.currentUser._id) {
              // looking at our own profile
              return (
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate("EditProfile")}
                  >
                    <Text style={styles.buttonTextStyle}>Edit Profile</Text>
                  </TouchableOpacity>
                </View>
              );
            } else {
              // looking at somebody else's profile
              return (
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={() => followUser()}
                  >
                    <Text style={styles.buttonTextStyle}>Follow</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.messageButton}>
                    <Text style={styles.buttonTextStyle}>Message</Text>
                  </TouchableOpacity>
                </View>
              );
            }
          })()}
        </View>
        <View style={styles.blogDisplayContainer}>
          <BlogDisplay></BlogDisplay>
        </View>
        <BottomBar postEnabled={false}></BottomBar>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#088DA9" />
      </View>
    );
  }
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
    height: "65%",
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
  editButton: {
    borderRadius: 5,
    backgroundColor: "grey",
    width: "70%",
    height: "90%",
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
    borderRadius: 120 / 2,
    height: "90%",
    width: "20%",
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
