import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useAuth } from "../../AuthContext";
import CONFIG from "../../Config";
import { useNavigation } from "@react-navigation/native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { IconButton, Colors } from "react-native-paper";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [uri_array, setUriArray] = useState([]);

  const postData = async () => {
    await fetch(CONFIG.URL + "/api/newsletter/create_newsletter", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      body: JSON.stringify({ title: title, body: body }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setSuccess(true);
      })
      .catch((error) => {
        console.log("There has been a problem uploading this post", error);
        setFailure(true);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) {
      return;
    } else {
      postData();
    }
  };

  const handleTakePhoto = async () => {
    const result = await launchCamera();
    if (result.didCancel) return;
    else if (result.errorCode == "camera_unavailable") {
      Alert.alert("Camera unavailable", "Your device may not have a camera.", {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
      });
    } else if (result.errorCode == "permission") {
      Alert.alert(
        "Permission error",
        "Please allow permissions to your camera in your settings",
        { text: "OK", onPress: () => console.log("OK Pressed") }
      );
    } else if (result.errorCode == "others") {
      Alert.alert("Unkown error occurred", {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
      });
    } else {
      var assets = result.assets;
      var temp_array = [];
      for (var i = 0; i < assets.length; i++) {
        temp_array.push(assets[i].uri);
      }
      setUriArray([...uri_array, ...temp_array]);
    }
  };

  const handleUploadPhoto = async () => {
    const result = await launchImageLibrary();
    if (result.didCancel) return;
    if (result.errorCode == "permission") {
      Alert.alert(
        "Permission error",
        "Please allow permissions to your photo library in your settings",
        { text: "OK", onPress: () => console.log("OK Pressed") }
      );
    } else if (result.errorCode == "others") {
      Alert.alert("Unkown error occurred", {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
      });
    } else {
      var assets = result.assets;
      var temp_array = [];
      for (var i = 0; i < assets.length; i++) {
        temp_array.push(assets[i].uri);
      }
      setUriArray([...uri_array, ...temp_array]);
    }
  };

  const handleRemovePhoto = async (uri_i) => {
    setUriArray(
      uri_array.filter(link =>
        link != uri_i
      )
    );
  }

  const navigation = useNavigation();

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Create post</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.bigInputContainer}>
          <TextInput
            style={styles.title_input}
            placeholder="Title your post"
            placeholderTextColor="#474C4D"
            onChangeText={(e) => setTitle(e)}
          />
          {(() => {
            var current_style;
            var image_container_style;
            if (uri_array.length == 0) {
              current_style = styles.postInputNoImages;
              image_container_style = styles.imageContainerNoImages;
            } else {
              // has images attached
              current_style = styles.postInput;
              image_container_style = styles.imageContainer;
            }
            return (
              <>
                <TextInput
                  multiline
                  allowFontScaling
                  enablesReturnKeyAutomatically="true"
                  placeholderTextColor="#474C4D"
                  style={current_style}
                  textAlign={"center"}
                  placeholder="Write here..."
                  onChangeText={(e) => setBody(e)}
                />
                <ScrollView style={styles.image_container_style}>
                  {uri_array.map((uri_i, i) => {
                    return (
                      <View key={uri_i} style = {styles.individualContainer}>
                        <IconButton
                          icon="close-circle"
                          color= "red"
                          onPress={() => handleRemovePhoto(uri_i)}
                          style = {styles.removeImageButton}
                        >
                        </IconButton>
                        <Image
                          style={styles.attachedImages}
                          source={{
                            uri: uri_i,
                          }}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              </>
            );
          })()}
          <IconButton
            icon="image"
            color="black"
            size={25}
            onPress={() => handleUploadPhoto()}
            style={{
              position: "absolute",
              alignSelf: "center",
              right: 30,
            }}
          />
          <IconButton
            icon="camera"
            color="black"
            size={25}
            onPress={() => handleTakePhoto()}
            style={{
              position: "absolute",
              alignSelf: "center",
              right: 0,
            }}
          />
        </View>
        <View style={styles.postButtonContainer}>
          <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
            <Text
              style={{
                color: "white",
                fontWeight: 500,
                fontSize: 20,
              }}
            >
              Post!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {!!success && <Text style={styles.successText}>Success!</Text>}
      {!!failure && (
        <Text style={styles.failureText}>
          Failed to update user information.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
  },
  bigInputContainer: {
    height: "85%",
    width: "85%",
    backgroundColor: "#d9d9d959",
    borderRadius: 15,
    borderColor: "#5f6566",
  },
  postButton: {
    backgroundColor: "#088DA9",
    borderRadius: 15,
    marginBottom: 20,
    marginRight: "10%",
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginTop: 3,
    height: "35%",
    width: "100%",
    flexDirection: "row",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    horizontal: "true",
    directionalLockEnabled: "true",
    contentInset: { top: 10, left: 10, bottom: 10, right: 10 },
  },
  imageContainerNoImages: {
    height: 0,
  },
  individualContainer: {
    width: 125, 
    height: 125,
  },
  removeImageButton: {
    position: "absolute",
    zIndex: 1,
    right: 0,
    top: 0,
  },
  attachedImages: {
    width: 125,
    height: 125,
    marginLeft: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  postButtonContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "100%",
    height: "7%",
    marginTop: 15,
  },
  title_input: {
    height: "10%",
    width: "75%",
    alignItems: "left",
    justifyContent: "left",
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#d9d9d959",
    borderColor: "#5f6566",
    fontWeight: '700',
    fontSize: 20,
    padding: 10,
    borderTopLeftRadius: 15,
    borderRightWidth: 3,
    borderColor: "#d9d9d959",
  },
  postInput: {
    height: "65%",
    width: "100%",
    padding: 10,
    borderTopWidth: 3,
    borderColor: "#d9d9d959",
    fontSize: 15,
    fontWeight: 500,
    borderBottomWidth: 3,
  },
  postInputNoImages: {
    height: "90%",
    width: "100%",
    padding: 10,
    borderTopWidth: 3,
    borderColor: "#d9d9d959",
    fontSize: 15,
    fontWeight: 500,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  titleContainer: {
    height: "10%",
    width: "100%",
    marginLeft: "7.5%",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  titleText: {
    fontWeight: "700",
    fontSize: 36,
    color: "#088DA9",
    fontStyle: "normal",
  },
  successText: {
    marginTop: 10,
    alignSelf: "center",
    color: "green",
    size: 25,
    fontWeight: 600,
    textAlign: "center",
  },
  failureText: {
    marginTop: 10,
    alignSelf: "center",
    color: "red",
    size: 25,
    fontWeight: 600,
    textAlign: "center",
  },
});

export default CreatePost;
