import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import BlogDisplay from "./BlogDisplay";
import BottomBar from "../BottomBar";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../AuthContext";
import Config from "../../Config";
import StateNumbers from "./StateNumbers";

const ExploreScreen = () => {
  const [displayState, setDisplayState] = useState(StateNumbers.EXPLORE);
  const authObj = useAuth();
  const navigation = useNavigation();

  const handleFollowingButton = () => {
    console.log("clicked");
    if (displayState == StateNumbers.EXPLORE) {
      setDisplayState(StateNumbers.FEED);
    } else {
      setDisplayState(StateNumbers.EXPLORE);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.profile}>
          <Image
            style={{
              borderRadius: 120 / 2,
              height: "95%",
              width: undefined,
              aspectRatio: 1,
            }}
            source={{
              uri:
                Config.URL +
                `/api/users/profile_picture?id=${authObj.currentUser._id}`,
            }}
          />
          <Text style={styles.title}>Feed</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SearchUsers")}
            >
              <Icon name="search" color="#888888" size={35} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerOptions}>
          {(() => {
            var text_style;
            var explore_text_style;
            if (displayState == StateNumbers.FEED) {
              // if it's showing who we follow
              text_style = styles.followingTextBlue;
              explore_text_style = styles.followingText;
            } else {
              // if it's showing explore
              text_style = styles.followingText;
              explore_text_style = styles.followingTextBlue;
            }
            return (
              <>
                <TouchableOpacity
                  style={styles.followingButton}
                  onPress={() => handleFollowingButton()}
                >
                  <Text style={text_style}>Following</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.exploreButton}
                  onPress={() => handleFollowingButton()}
                >
                  <Text style={explore_text_style}>Explore</Text>
                </TouchableOpacity>
              </>
            );
          })()}
        </View>
      </View>
      <View style={styles.exploreContainer}>
        <BlogDisplay state={displayState}></BlogDisplay>
      </View>
      <BottomBar postEnabled={true}></BottomBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "E5E5E570",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  iconContainer: {
    position: "absolute",
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  followingButton: {
    width: "30%",
    height: "100%",
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#C4C4C4",
    padding: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  exploreButton: {
    width: "30%",
    height: "100%",
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#C4C4C4",
    padding: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginLeft: 10,
  },
  headerContainer: {
    height: "18%",
    backgroundColor: "#fff",
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingTop: 10,
  },
  exploreContainer: {
    height: "72%",
  },
  title: {
    fontWeight: "bold",
    color: "#088DA9",
    fontSize: 35,
    marginLeft: "3%",
  },
  profile: {
    height: "55%",
    flexDirection: "row",
    alignItems: "center",
  },
  headerOptions: {
    flexDirection: "row",
    height: "45%",
    width: "100%",
    padding: 10,
    alignSelf: "flex-end",
  },
  followingText: {
    fontSize: 18,
  },
  followingTextBlue: {
    fontSize: 18,
    color: "#088DA9",
  },
});

export default ExploreScreen;
