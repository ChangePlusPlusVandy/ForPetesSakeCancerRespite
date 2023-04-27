import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  RefreshControl,
  Keyboard,
} from "react-native";
import Config from "../../Config";
import { useAuth } from "../../AuthContext";
import BottomBar from "../BottomBar";
import ImageCarousel from "./imageCarousel";
import { TextInput } from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/elements";

const Comment = (props) => {
  const dateObj = new Date(Number(props.comment.timePosted));

  return (
    <View style={styles.comment}>
      <Text>{props.comment.author}</Text>
      <Text style={{ fontSize: 18 }}>{props.comment.content}</Text>
      <Text style={{ fontSize: 10, color: "gray" }}>
        {dateObj.toDateString()}
      </Text>
    </View>
  );
};

const BlogPage = ({ route, navigation }) => {
  const { blogId } = route.params;
  const authObj = useAuth();
  const [loading, setLoading] = useState(true);
  const [newsLetter, setNewsLetter] = useState({});
  const [likeNumber, setLikeNumber] = useState(0);
  const [comment, setComment] = useState("");
  const [height, setHeight] = useState(useHeaderHeight());
  const [keyboardShowing, setKeyBoardShowing] = useState(false);
  // const [commentList, setCommentList] = useState([])
  const [noImage, setNoImage] = useState(true);

  // var likeNumber = 0;

  const getNewsLetterbyID = async () => {
    var header = await authObj.getAuthHeader();
    const promise = await fetch(
      Config.URL + `/api/newsletter/get_newsletter_byID/?blogId=${blogId}`,
      { headers: header }
    );
    let data = await promise.json();
    setNewsLetter(data);
    setLikeNumber(data.postsLiked.length);
    // console.log(data);
    // if (typeof(newsLetter.postsLiked) === "undefined") {
    //   setLikeNumber(0);
    // } else {
    //   setLikeNumber(newsLetter.postsLiked.length);
    // }
    if(data.images.length != 0) setNoImage(false);
    else if (newsLetter.images != undefined) {
      setNoImage(Object.keys(newsLetter.images).length != 0);
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(
    (async () => {
      setRefreshing(true);
      await getNewsLetterbyID();
      setRefreshing(false);
    }).bind(this),
    []
  );

  const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
    setKeyBoardShowing(true);
  });
  const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
    setKeyBoardShowing(false);
  });

  async function fetchData() {
    setLoading(true);
    await getNewsLetterbyID();
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const postComment = async () => {
    if (!comment) return;
    var header = await authObj.getAuthHeader();
    const promise = await fetch(
      Config.URL + `/api/newsletter/create_comment/?blogId=${blogId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...header,
        },
        body: JSON.stringify({content:comment, timePosted: Date.now()})
      }
    );
    fetchData();
  };

  
  const likePost = async () => {
    let authHeader = await authObj.getAuthHeader();
    const response = await fetch(
      Config.URL + `/api/newsletter/like_post/?blogId=${blogId}`,
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...authHeader,
        },
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        // userToken : await authObj.getTolken()
      }
    );
    console.log(response.json());
    fetchData();
  };

  let inputRef = React.useRef();
  if (loading == false) {
    let timePosted = newsLetter.timePosted
      ? newsLetter.timePosted.substring(4, 16)
      : "";
    return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={height}
        style={styles.container}
      >
        <View style={{ height: "90%", backgroundColor: "#E5E5E550" }}>
          <ScrollView
            contentContainerStyle={styles.newsItem}
            refreshControl={
              <RefreshControl
                isRefreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#9Bd35A"]} // for android?
                tintColor={["#689F38"]} // for ios?
              />
            }
          >
            <View>
              {!noImage && (
                <ImageCarousel imgLink={newsLetter.images}></ImageCarousel>
              )}
            </View>

            <Text
              style={{
                fontWeight: "bold",
                fontSize: 23,
                paddingTop: 15,
                paddingLeft: 15,
                paddingRight: 15,
              }}
            >
              {newsLetter.title}
            </Text>
            <Text style={{ fontSize: 18, paddingLeft: 15, paddingRight: 15 }}>
              {newsLetter.body}
            </Text>

            <View
              style={{ borderTopWidth: 1, marginTop: 15, marginBottom: 15 }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 18,
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
              >
                Comments
              </Text>
            </View>

            <View>
              {newsLetter.comments &&
                newsLetter.comments.map((comment, i) => {
                  return (
                    <View style={styles.commentBox} key={i}>
                      <Comment comment={comment}></Comment>
                    </View>
                  );
                })}
            </View>
          </ScrollView>
        </View>

        <View style={styles.utilityContainer}>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: "#FF3D00" }}>{likeNumber}</Text>
          </View>

          <TouchableOpacity onPress={() => likePost()}>
            <Image
              style={{ height: 45, width: 45, aspectRatio: 1, }}
              source={require("../../../public/newsletter/LikeButton.png")}
            ></Image>
          </TouchableOpacity>
          <TextInput
            ref={inputRef}
            placeholder="Write here..."
            style={styles.input}
            onChangeText={(e) => setComment(e)}
          />

          <TouchableOpacity
            onPress={() => {
              if (keyboardShowing) {
                postComment();
                Keyboard.dismiss();
              } else {
                inputRef.current.focus();
              }
            }}
          >
            <Image
              style={{ height: 45, width: 45, aspectRatio: 1, margin: 10 }}
              source={require("../../../public/newsletter/commentButton.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  } else {
    return <ActivityIndicator size="large" color="#088DA9" />;
  }
};

const styles = StyleSheet.create({
  commentBox: {
    flex: 1,
    borderColor: "gray",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  utilityContainer: {
    // flex:1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#E5E5E550",
    // borderTop
  },
  comment: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  input: {
    height: 40,
    width: 250,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    borderColor: "#C4C4C4",
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#E5E5E550",
    justifyContent: "flex-start",
    // alignItems:"flex-start",
  },
  newsItem: {
    // flex:1,
    backgroundColor: "#E5E5E550",
    borderColor: "#C4C4C470",
    justifyContent: "flex-start",
  },
  newsHeader: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  newsTitle: {
    flex: 2,
    width: "90%",
    paddingTop: 10,
  },
});

export default BlogPage;
