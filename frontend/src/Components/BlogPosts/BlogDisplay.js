import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Config from "../../Config";
import { useAuth } from "../../AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import StateNumbers from "./StateNumbers";

const NewsItem = (props) => {
  const authObj = useAuth();

  const likePost = async () => {
    // let authHeader = await authObj.getAuthHeader();
    // const response = await fetch(
    //   Config.URL + `/api/newsletter/like_post/?blogId=${props.id}`,
    //   {
    //     method: "PUT", // *GET, POST, PUT, DELETE, etc.
    //     mode: "cors", // no-cors, *cors, same-origin
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       ...authHeader,
    //     },
    //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: "same-origin", // include, *same-origin, omit
    //     // userToken : await authObj.getTolken()
    //   }
    // );
    // getAllNewsLetter();
    // console.log(likeNumber);
    navigation.navigate("BlogPage", { blogId: props.id });
  };

  const [likeNumber, setLikeNumber] = useState(props.likeCount);
  const navigation = useNavigation();
  return (
    <View style={styles.newsItem}>
      <View style={styles.newsHeader}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => {
            navigation.push("Profile", {
              username: props.username,
              userId: props.userId,
            });
          }}
        >
          <Image
            style={styles.profilePicture}
            source={{
              uri: Config.URL + `/api/users/profile_picture?id=${props.userId}`,
            }}
          />
          <View style={styles.authorBox}>
            <Text style={styles.authorText}>{props.author}</Text>
          </View>
          <View style={styles.usernameBox}>
            <Text maxLength={4} style={styles.usernameText}>
              @{props.username}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.dateText}>{props.timePosted}</Text>
      <View style={styles.newsTitle}>
        <Text style={styles.titleText}>{props.title}</Text>
        <Text style={styles.bodyText}>{props.body}</Text>
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
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => likePost()}
        >
          <Icon name={"favorite-border"} color="#ff0000"></Icon>
          <Text style={{ color: "#FF3D00", alignSelf: "center" }}>
            {likeNumber}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BlogDisplay = (props) => {
  const authObj = useAuth();
  const [loading, setLoading] = useState(true);
  const [newsletterData, setNewsletterData] = useState([
    { title: "Waiting for Data, scroll up to refresh ..." },
  ]);

  const getAllNewsLetter = async (url) => {
    var header = await authObj.getAuthHeader();
    const promise = await fetch(url, { headers: header });
    let data = await promise.json();
    setNewsletterData(
      data.sort((a, b) => Number(a.timePosted) < Number(b.timePosted))
    );
    console.log("url: " + url);

    // would also do data.filter(posts by me) if it's my own profile
    // data.filter(posts by some other user id) if viewing someone elses profile
    // data.filter(all posts) for explore
    // data.filter(users that I'm following) for following page
  };

  const getUsersNewsletter = async (id) => {
    var url = Config.URL + "/api/users/get_user?id=" + id;
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
    setNewsletterData(
      data.user.newsletter.sort(
        (a, b) => Number(a.timePosted) < Number(b.timePosted)
      )
    );
  };

  async function fetchData() {
    if (props.state == StateNumbers.EXPLORE) {
      await getAllNewsLetter(Config.URL + "/api/newsletter/get_newsletters");
    } else if (props.state == StateNumbers.FEED) {
      await getAllNewsLetter(Config.URL + "/api/users/feed");
    } else if (props.state == StateNumbers.SELF) {
      // our self
      // await getAllNewsLetter()
      console.log("self");
      await getUsersNewsletter(authObj.currentUser._id);
    } else {
      //StateNumbers.OTHER
      console.log("other");
      await getUsersNewsletter(props.id);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, [props.state]);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(
    (async () => {
      setRefreshing(true);
      await fetchData();
      setRefreshing(false);
    }).bind(this),
    []
  );

  if (loading == false) {
    if (newsletterData.length != 0) {
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
            console.log(item);
            if (item) {
              return (
                <NewsItem
                  id={item._id}
                  title={item.title}
                  body={item.body}
                  author={item.author}
                  timePosted={date}
                  userId={item.user}
                  username={item.username}
                  likeCount={item.postsLiked.length}
                ></NewsItem>
              );
            }
          }}
        ></FlatList>
      );
    } else {
      return (
        <View style = {{justifyContent: "center", height: "65%"}}>
          <Text style = {{fontSize: 20, alignSelf: "center", color: "#4C4E52"}}>Nothing to show here...!</Text>
        </View>
      );
    }
  } else {
    return <ActivityIndicator size="large" color="#088DA9" />;
  }
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
  profileButton: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  profilePicture: {
    width: "17%",
    height: "100%",
    borderRadius: 120 / 2,
    overflow: "hidden",
    // borderWidth: 1,
    // borderColor: "black",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  bodyText: {
    fontSize: 15,
    numberOfLines: 1,
    width: "100%",
    color: "#4C4E52",
    marginTop: 3,
  },
  authorText: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    numberOfLines: 1,
    width: "100%",
  },
  usernameBox: {
    alignSelf: "center",
    justifyContent: "center",
    width: "45%",
    height: 15,
    marginLeft: 5,
  },
  authorBox: {
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "35%",
    height: 20,
    marginLeft: 7,
  },
  usernameText: {
    alignSelf: "center",
    fontSize: 13,
    numberOfLines: 1,
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "18%",
    margonTop: 3,
    flexDirection: "row",
  },
  iconContainer: {
    position: "absolute",
    right: "3%",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  dateText: {
    alignSelf: "center",
    position: "absolute",
    right: 5,
    top: "20%",
    fontSize: 13,
  },
  newsItem: {
    backgroundColor: "#E5E5E550",
    borderWidth: 1,
    borderColor: "#C4C4C470",
    height: 160,
    padding: 10,
    width: "100%",
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  newsHeader: {
    height: "37%",
    width: "85%",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  newsTitle: {
    flex: 1.7,
    width: "90%",
    paddingTop: 10,
  },
});

export default BlogDisplay;
