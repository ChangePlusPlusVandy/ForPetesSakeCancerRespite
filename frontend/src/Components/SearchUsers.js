import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard
} from "react-native";
import { useAuth } from "../AuthContext";
import { Icon } from "react-native-elements";
import CONFIG from "../Config";
let nextId = 0;

const SearchUsersScreen = () => {
  const authObj = useAuth();
  const [searchText, setSearchText] = useState("");
  const [recents, setRecents] = useState([]); // TODO: when we add recents array to the mongo db schema, this would be something fetched from the backend i think
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSubmitSearch = async (text) => {
    // add it to our list of recent searches
    setRecents([...recents, { id: nextId++, name: text }]);

    // Do the actual search work here
  };

  const handleRenderPreviews = async (text) => {
    if (!text) return;
    var url = CONFIG.URL + "/api/users/search?searchString=" + text;
    var headers = await authObj.getAuthHeader();
    headers["Content-Type"] = "application/json";

    const requestOptions = {
      method: "GET",
      headers,
    };

    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        const results = res.map((user) => ({ id: nextId++, ...user })); // create a new array of objects with the same properties as the original objects
        
        // .filter((user) => user.username !== authObj.currentUser.username); // TODO filter out the current user
        setSearchResults(results);
        // TODO, ask aryan if this is the right way to do it
      })
      .catch((error) => {
        console.log("There has been a problem searching for users: ", error);
      });
  };

  const handleRemoveElement = async (index) => {

    setSearchResults(searchResults.filter((element) => element.id !== index));
  };

  return (
    <View style={styles.wholeScreen}>
      <View style={styles.topSection}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(e) => {
            handleRenderPreviews(e);
            setSearchText(e);
          }}
          value={searchText}
          clearButtonMode="while-editing"
          placeholder="Search for a user here...."
          returnKeyType="search"
          enablesReturnKeyAutomatically="true"
          onSubmitEditing={({ nativeEvent: { text, eventCount, target } }) =>
            handleRenderPreviews(text)
          }
        />
        <View style={styles.iconContainer}>
          <Icon name="search" color="#888888" />
        </View>
        <TouchableOpacity style={styles.cancelButton} onPress = {() => Keyboard.dismiss()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.recentText}>Recent:</Text>
      <View style={styles.resultsContainerHasResults}>
        <ScrollView
          directionalLockEnabled={"true"}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {searchResults.map((result_i, index) => {
            var container_style;
            if (index % 2 == 0) container_style = styles.blueContainer;
            else container_style = styles.whiteContainer;
            return (
              <View key={index} style={container_style}>
                <Image
                  style={styles.profilePicture}
                  source={require("../../../frontend/public/defaultProfile.png")}
                />
                <View style={styles.userInfoContainer}>
                  <Text style={styles.usernameText}>{result_i.username}</Text>
                  <Text style={styles.nameText}>{result_i.name}</Text>
                </View>
                <View style={styles.removeElementButton}>
                  <Icon
                    name="close"
                    color="#888888"
                    size={20}
                    onPress={() => handleRemoveElement(index)}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wholeScreen: {
    // flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  topSection: {
    flexDirection: "row",
    height: "7%",
    paddingLeft: 10,
    paddingTop: 10,
    marginLeft: 5,
    marginTop: 5,
  },
  resultsContainerHasResults: {
    width: "100%",
    height: "93%",
    flexDirection: "column",
  },
  whiteContainer: {
    width: "100%",
    height: "9.5%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#efefef",
    flexDirection: "row",
    padding: 3,
    paddingLeft: "5%",
    alignItems: "center",
  },
  blueContainer: {
    width: "100%",
    height: "9.5%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#efefef",
    flexDirection: "row",
    padding: 3,
    paddingLeft: "5%",
    alignItems: "center",
    backgroundColor: "#DDF6FA",
    shadowOffset: {
      width: -6, 
      height: -6,
    },
    shadowOpacity: 0.15, 
    shadowRadius: 8,
  },

  removeElementButton: {
    position: "absolute",
    right: "5%",
  },
  userInfoContainer: {
    flexDirection: "column",
    marginLeft: "5%",
  },
  usernameText: {
    fontSize: "15%",
    fontWeight: "bold",
  },
  nameText: {
    marginTop: 1.5,
    color: "#888888",
  },
  profilePicture: {
    width: "15.5%",
    height: "95%",
    borderRadius: 120 / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black",
  },
  searchInput: {
    borderRadius: 8,
    height: "100%",
    paddingLeft: "9%",
    alignSelf: "auto",
    width: "80%",
    marginBottom: "5%",
    backgroundColor: "#efefef",
  },
  iconContainer: {
    position: "absolute",
    left: "4.5%",
    top: "45%",
  },
  cancelText: {
    fontSize: 15,
    // fontWeight: 400,
    color: "#888888",
  },
  cancelButton: {
    marginLeft: 10,
    height: "100%",
    justifyContent: "center",
  },
  recentText: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    paddingLeft: 10,
    color: "#888888",
  },
});

export default SearchUsersScreen;
