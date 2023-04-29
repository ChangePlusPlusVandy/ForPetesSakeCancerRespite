import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  useWindowDimensions,
} from "react-native";
import { useAuth } from "../AuthContext";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import CONFIG from "../Config";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

const FirstRoute = () => {
  const [searchResults, setSearchResults] = useState();
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  return (
    <View style={styles.followersContainer}>
      <View style={styles.topSection}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(e) => {
            //   handleRenderPreviews(e);
            setSearchText(e);
          }}
          value={searchText}
          clearButtonMode="while-editing"
          placeholder="Search for a user here...."
          returnKeyType="search"
          enablesReturnKeyAutomatically="true"
          onSubmitEditing={({ nativeEvent: { text, eventCount, target } }) => {
            //   handleRenderPreviews(text);
            //   handleSubmitSearch(text);
          }}
        />
        <View style={styles.iconContainer}>
          <Icon name="search" color="#888888" />
        </View>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style = {resourceContainer}></View>
    </View>
  );
};

const SecondRoute = () => {
  const [searchResults, setSearchResults] = useState();
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  return (
    <View style={styles.followersContainer}>
      <View style={styles.topSection}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(e) => {
            //   handleRenderPreviews(e);
            setSearchText(e);
          }}
          value={searchText}
          clearButtonMode="while-editing"
          placeholder="Search for a user here...."
          returnKeyType="search"
          enablesReturnKeyAutomatically="true"
          onSubmitEditing={({ nativeEvent: { text, eventCount, target } }) => {
            //   handleRenderPreviews(text);
            //   handleSubmitSearch(text);
          }}
        />
        <View style={styles.iconContainer}>
          <Icon name="search" color="#888888" />
        </View>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function WholeScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "Followers" },
    { key: "second", title: "Following" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      style={styles.tab}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  tab: {
    backgroundColor: "#fff",
  },
  followersContainer: {
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
  iconContainer: {
    position: "absolute",
    left: "4.5%",
    top: "45%",
  },
  cancelText: {
    fontSize: 15,
    color: "#888888",
  },
  cancelButton: {
    marginLeft: 10,
    height: "100%",
    justifyContent: "center",
  },
});

// export default WholeScreen;
