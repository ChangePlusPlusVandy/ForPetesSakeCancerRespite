import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import Config from "../../Config";
import { useAuth } from "../../AuthContext";
import { useNavigation } from "@react-navigation/native";

const NewsItem = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.newsItem}>
      <View style={styles.newsHeader}>
        <TouchableOpacity 
        style = {styles.profileButton}
        // onPress={() => {navigation.navigate("Profile")}}
        >
          <Image
            style={styles.profilePicture}
            source={require("../../../public/defaultProfile.png")}
          />
          <Text style={styles.authorText}>{props.author}</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>Posted: {props.timePosted}</Text>
      </View>
      <View style={styles.newsTitle}>
        <Text style={styles.titleText}>{props.title}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("BlogPage", { blogId: props.id })}
        >
          <Image
            style={{ flex: 1, height: "100%", width: -1, aspectRatio: 1 }}
            source={require("../../../public/newsletter/ViewMore.png")}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BlogDisplay = () => {
  const authObj = useAuth();

  const getAllNewsLetter = async () => {
    var header = await authObj.getAuthHeader();
    const promise = await fetch(
      Config.URL + "/api/newsletter/get_newsletters",
      { headers: header }
    );
    let data = await promise.json();
    setNewsletterData(
      data.sort((a, b) => Number(a.timePosted) < Number(b.timePosted))
    );
  };

  const [newsletterData, setNewsletterData] = useState([
    { title: "Waiting for Data, scroll up to refresh ..." },
  ]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(
    (async () => {
      setRefreshing(true);
      await getAllNewsLetter();
      setRefreshing(false);
    }).bind(this),
    []
  );

  useEffect(() => {
    getAllNewsLetter();
  }, []);

  return (
    <FlatList
      data={newsletterData}
      style={styles.newsletterContainer}
      refreshControl={
        <RefreshControl
          isRefreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#9Bd35A"]} // for android?
          tintColor={["#689F38"]} // for ios?
        />
      }
      renderItem={({ item }) => {
        let date = "";
        if (!item.timePosted) {
          date = "";
        } else {
          var d = new Date(Number(item.timePosted));
          date = d.toLocaleDateString();
        }
        return (
          <NewsItem
            id={item._id}
            title={item.title}
            body={item.body}
            author={item.author}
            timePosted={date}
          ></NewsItem>
        );
      }}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  newsLetter: {
    flex: 8,
    maxHeight: "60%",
    // backgroundColor:'#E5E5E525',
    justifyContent: "flex-start",
    borderColor: "#C4C4C4",
  },
  newslettterContainer: {
    height: "100%",
    width: "100%",
  },
  profileButton:{
    width: "50%",
    height: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  profilePicture: {
    width: "25%",
    height: "105%",
    borderRadius: 120 / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 22,
  },
  authorText: {
    alignSelf: "center",
    marginLeft: 20,
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
  },
  dateText: {
    alignSelf: "center",
    position: "absolute",
    right: 5,
    fontSize: 16,
  },
  newsItem: {
    backgroundColor: "#E5E5E550",
    borderWidth: 1,
    borderColor: "#C4C4C470",
    height: 150,
    padding: 10,
    width: "100%",
  },
  newsHeader: {
    height: "33%",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  newsTitle: {
    flex: 2,
    width: "90%",
    paddingTop: 10,
  },
});

export default BlogDisplay;
