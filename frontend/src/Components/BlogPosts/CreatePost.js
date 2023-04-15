import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useAuth } from "../../AuthContext";
import CONFIG from "../../Config";
import BottomBar from "../BottomBar";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
let nextId = 0;


const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [uri_array, setUriArray] = useState([]);

  const navigation = useNavigation();
  const authObj = useAuth()

  // GET CAMERA PERMISSIONS HERE
  const permissionFunction = async (param) => {
    // here is how you can get the camera permission
    if (param == "camera") {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      if (cameraPermission.status !== "granted") {
        alert("Permission for media access needed.");
        return false;
      } else {
        return true;
      }
    }
  };

  const postData = async () => {
    try {

      let authHeader = await authObj.getAuthHeader();
      // let token = await authObj.getTolken();
      const response = await fetch(CONFIG.URL + '/api/newsletter/create_newsletter', 
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...authHeader
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        body: JSON.stringify({title: title, body: body, 
          // userToken : await authObj.getToken()
        }),
        // userToken : await authObj.getTolken()
      }
      );
      // How to check log for request      
      // console.log(response.json())
      // navigation.navigate("Explore")
      console.log(await response)
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    // console.log(Date())

		e.preventDefault();
    if(!title || !body){
      return;
    } else {
      postData();
      navigation.navigate("Explore");
    }
	};

  const handleTakePhoto = async () => {
    let permission = await permissionFunction("camera");
    if (!permission) return;

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) return;
    else if (result.errorCode == "camera_unavailable") {
      alert("Camera unavailable", "Your device may not have a camera.", {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
      });
    } else if (result.errorCode == "permission") {
      alert(
        "Permission error",
        "Please allow permissions to your camera in your settings",
        { text: "OK", onPress: () => console.log("OK Pressed") }
      );
    } else if (result.errorCode == "others") {
      alert("Unkown error occurred", {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
      });
    } else {
      setUriArray(
        // Replace the state
        [
          // with a new array
          ...uri_array, // that contains all the old items
          { id: nextId++, uri: result.assets[0].uri }, // and one new item at the end
        ]
      );
    }
  };

  const handleUploadPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      // quality: 1,
    });
    if (result.canceled) return;
    if (result.errorCode == "permission") {
      alert(
        "Permission error",
        "Please allow permissions to your photo library in your settings",
        { text: "OK", onPress: () => console.log("OK Pressed") }
      );
    } else if (result.errorCode == "others") {
      alert("Unkown error occurred", {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
      });
    } else {
      setUriArray(
        // Replace the state
        [
          // with a new array
          ...uri_array, // that contains all the old items
          { id: nextId++, uri: result.assets[0].uri }, // and one new item at the end
        ]
      );
    }
  };

  const handleRemovePhoto = async (id) => {
    setUriArray(uri_array.filter((link) => link.id !== id));
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                    clearButtonMode="always"
                    placeholderTextColor="#474C4D"
                    style={current_style}
                    textAlign={"left"}
                    textAlignVertical={"top"}
                    placeholder="Write here..."
                    onChangeText={(e) => setBody(e)}
                    maxLength={1100}
                  />
                <ScrollView
                  horizontal={"true"}
                  directionalLockEnabled={"true"}
                >
                  {/* so that we can scroll within the box of all rendered images*/}
                  <View
                    onStartShouldSetResponder={() => true}
                    style={styles.testContainer}
                  >
                    {uri_array.map((uri_i, index) => {
                      return (
                        <View key={index}>
                          <Image
                            style={styles.image}
                            source={{
                              uri: uri_i.uri,
                            }}
                            resizeMode="cover"
                          />
                          <IconButton
                            icon={(props) => (
                              <Icon name="close-circle" {...props} />
                            )}
                            color="white"
                            style={{
                              position: "absolute",
                              top: 7,
                              right: 0,
                            }}
                            onPress={() => handleRemovePhoto(uri_i.id)}
                          />
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </>
            );
          })()}
          <IconButton
            icon={() => <Icon name="image" size={30} />}
            color={"black"}
            onPress={() => handleUploadPhoto()}
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 7,
              right: 35,
            }}
          />
          <IconButton
            icon={() => <Icon name="camera" size={30} />}
            color={"black"}
            onPress={() => handleTakePhoto()}
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 7,
              right: 0,
            }}
          />
        </View>
        <View style={styles.postButtonContainer}>
          <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
            <Text
              style={{
                color: "white",
                FontWeight: 500,
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
  </TouchableWithoutFeedback>
    
  );
};

const styles = StyleSheet.create({
  testContainer: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  image: {
    width: 130,
    height: 130,
    margin: 5,
  },

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
    flexDirection: "row",
    height: "35%",
    width: "100%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flex: 1,
  },
  imageContainerNoImages: {
    height: 0,
  },
  individualContainer: {
    // flex: 1,
    // flexDirection: "row",
    // width: 140,
    // height: 140,
    // marginBottom: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  removeImageButton: {
    position: "absolute",
    zIndex: 1,
    right: 0,
    top: 0,
  },
  attachedImages: {
    width: "100%",
    height: "100%",
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
    FontWeight: 700,
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
    FontWeight: 500,
    borderBottomWidth: 3,
    textAlign: "left",
  },
  postInputNoImages: {
    height: "90%",
    width: "100%",
    padding: 10,
    borderTopWidth: 3,
    borderColor: "#d9d9d959",
    fontSize: 15,
    FontWeight: 500,
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
    fontWeight: "bold",
    fontSize: 36,
    color: "#088DA9",
    fontStyle: "normal",
  },
  successText: {
    marginTop: 10,
    alignSelf: "center",
    color: "green",
    size: 25,
    FontWeight: 600,
    textAlign: "center",
  },
  failureText: {
    marginTop: 10,
    alignSelf: "center",
    color: "red",
    size: 25,
    FontWeight: 600,
    textAlign: "center",
  },
});

export default CreatePost;
