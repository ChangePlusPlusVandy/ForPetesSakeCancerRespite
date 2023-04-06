import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../AuthContext";
import { IconButton, Colors } from "react-native-paper";
import CONFIG from "../Config";

const SearchUsersScreen = () => {
  const authObj = useAuth();
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [recents, setRecents] = useState([]); // TODO: when we add recents array to the mongo db schema, this would be something fetched from the backend i think

  let nextId = 0;
  const handleSubmitSearch = async (text) => {
    // add it to our list of recent searches
    setRecents([...recents, { id: nextId++, name: text }]);

    // Do the actual search work here
  };

  return (
    <View style={styles.wholeScreen}>
      <View style={styles.topSection}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(e) => setSearchText(e)}
          value={searchText}
          clearButtonMode="while-editing"
          placeholder="Search for a user here...."
          onKeyPress={({ nativeEvent: { key: enter } }) => handleSubmitSearch(searchText)}
        />
        <View style={styles.iconContainer}>
          <IconButton
            icon="magnify"
            size={22}
            onPress={() => console.log("Pressed")}
          />
        </View>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.recentText}>Recent:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wholeScreen: {
    flex: 1,
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
  searchInput: {
    borderRadius: 8,
    height: "100%",
    paddingLeft: "9%",
    alignSelf: "auto",
    width: "80%",
    marginBottom: "5%",
    backgroundColor: "#efefef",
  },
  cancelText: {
    fontSize: 15,
    fontWeight: 400,
    color: "##888888",
  },
  cancelButton: {
    marginLeft: 10,
    height: "100%",
    justifyContent: "center",
  },
  iconContainer: {
    position: "absolute",
    left: "1%",
  },
  recentText: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 5,
    paddingLeft: 10,
    fontWeight: 400,
    color: "##888888",
  },
});

export default SearchUsersScreen;
