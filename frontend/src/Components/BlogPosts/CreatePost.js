// import * as React from "react";
// import { Pressable, Alert, View, Text, TextInput } from "react-native";
// import { Component } from "react";
// import { StyleSheet } from "react-native";

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../AuthContext";
// import { Icon } from "@rneui/themed";

const CreatePost = () => {
  const { currentUserIn } = useAuth();
  const [title, setTitle] = useState("");

  return (
    <View style={styles.container}>
      <View style = {{flexDirection: "row"}}>
        <TextInput
          style={styles.title_input}
          placeholder="Title your post"
          onChangeText={(newText) => setTitle(newText)}
          defaultValue={title}
        />
        <Button
          title = "Post your post">
        </Button>
      </View>
      <View style = {{height: 500, borderColor: "black"}}>
        <TextInput placeholder="Here is where you would create a post" />
      </View>

      <View style={styles.rectangle}>
        <View>
          {/* <Icon name="home" /> */}
          <Button style = {styles.homeButton}></Button>
          <Link to="/">Home</Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column", 
  },
  bottombar: {
    position: "absolute",
    width: 411,
    height: 375,
    left: 0,
    top: 734,
    backgroundColor: "#088DA9",
  },
  rectangle: {
    width: 411,
    position: "absolute",
    bottom: 0,
    height: 100,
    backgroundColor: "#088DA9",
  },
  title_input: {
    height: "5%",
    width: "50%",
    // color: "#ffffff",
    borderColor: "#5f6566",
    // borderWidth: 1,
    // alignItems: "left",
    // justifyContent: "left",
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    // marginBottom: 20,
  },

  homeButton: {
    /* Vector */
    position: "absolute",
    left: "15.09%", 
    right: "77.62%", 
    top: "92.83%", 
    bottom: "3.52%",

    background: "#F8F8F8",
  },
});

export default CreatePost;

// class CreatePost extends Component {
//   render() {
//     return (
//     <View>
//         Hello!
//         <View style = {styles.bottombar} ></View>
//     </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//     bottombar: {
//         position: 'absolute',
//         width: 411,
//         height: 375,
//         left: 0,
//         top: 734,
//         background: '#088DA9',
//     }
// })

// export default CreatePost;
