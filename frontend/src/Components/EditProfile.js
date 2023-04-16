import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import PropTypes from "prop-types";
import { useAuth } from "../AuthContext";
import { useNavigation, Link } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CONFIG from "../Config";
import * as ImagePicker from "expo-image-picker";
import { parsePhoneNumber } from "libphonenumber-js";

const EditProfileScreen = () => {
  const authObj = useAuth();
  const [phoneNumber, setPhoneNumber] = useState(
    `${authObj.currentUser.phone}`
  );
  const [name, setName] = useState(`${authObj.currentUser.name}`);
  const [bio, setBio] = useState(`${authObj.currentUser.bio}`);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [pfpUri, setPfpUri] = useState("../../public/defaultProfile.png");
  const navigation = useNavigation();
  const [error, setError] = useState("");

  const changeProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (result.canceled) return;
    setPfpUri(result.assets[0].uri);
  };

  const updateUser = async () => {
    var url = CONFIG.URL + "/api/users/update_user";
    var headers = await authObj.getAuthHeader();
    headers["Content-Type"] = "application/json";

    let phoneNum;
    try {
      phoneNum = parsePhoneNumber(phoneNumber, "US");
      if (!phoneNum.isValid()) {
        throw new Error();
      }
    } catch (e) {
      setError("Invalid Phone Number");
      return;
    }

    phoneNum = phoneNum.formatNational();

    const requestOptions = {
      method: "POST",
      headers,
      body: JSON.stringify({ name: name, number: phoneNum, bio: bio }),
    };

    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        console.log("There has been a problem updating the user: ", error);
        setFailure(true);
      });
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <View style={styles.container}>
        <View style={styles.topPart}>
          <Text style={{ color: "red" }}>{error}</Text>
          <Text style={styles.welcomeText}>
            Welcome, @{authObj.currentUser.username}!
          </Text>
        </View>
        <Image
          style={styles.profilePicture}
          source={{
            uri: pfpUri,
          }}
        />
        <View style={styles.bottomPart}>
          <IconButton
            icon="square-edit-outline"
            iconColor={"black"}
            size={30}
            onPress={() => changeProfilePicture()}
            style={styles.iconButton}
          />
          <Text style={styles.textStyle}> Name </Text>
          <TextInput
            style={styles.textInputs}
            placeholder={authObj.currentUser.name} // TODO should be good when patryck make sures that users are there
            placeholderTextColor="#474C4D"
            onChangeText={(e) => setName(e)}
          />
          <Text style={styles.textStyle}> Email Address </Text>
          <TextInput
            style={styles.textInputs}
            placeholder={authObj.currentUser.email}
            placeholderTextColor="#474C4D"
            editable={false}
          />
          <Text style={styles.textStyle}> Phone Number </Text>
          <TextInput
            style={styles.textInputs}
            placeholder={authObj.currentUser.phone}
            placeholderTextColor="#474C4D"
            onChangeText={(e) => setPhoneNumber(e)}
          />
          <Text style={styles.textStyle}> Bio </Text>
          <TextInput
            style={styles.textInputs}
            placeholder={authObj.currentUser.bio}
            placeholderTextColor="#474C4D"
            onChangeText={(e) => setBio(e)}
          />
          <TouchableOpacity
            style={{ alignSelf: "center", marginBottom: 10 }}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => updateUser()}
          >
            <Text style={styles.buttonTextStyle}>Update</Text>
          </TouchableOpacity>
          {!!success && <Text style={styles.successText}>Success!</Text>}
          {!!failure && (
            <Text style={styles.failureText}>
              Failed to update user information.
            </Text>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  topPart: {
    backgroundColor: "#088DA9",
    height: "22%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomPart: {
    backgroundColor: "##fff",
    marginTop: "14%",
    height: "80%",
    width: "70%",
    justifyContent: "flex-start",
  },
  textInputs: {
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 8,
    height: "8%",
    padding: 10,
    alignSelf: "auto",
    width: "100%",
    marginBottom: "4%",
  },
  iconButton: {
    alignSelf: "center",
    marginBottom: -3,
  },
  textStyle: {
    fontStyle: "normal",
    // fontWeight: 600,
    fontSize: 14,
    lineHeight: 17,
    marginBottom: 5,
    marginTop: 3,
  },
  buttonTextStyle: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 18,
  },
  editButton: {
    backgroundColor: "#088da91c",
    width: "80%",
    borderRadius: 10,
    height: "7%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  profilePicture: {
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
    overflow: "hidden",
    borderWidth: 3,
    position: "absolute",
    top: "14%",
    borderColor: "black",
  },
  welcomeText: {
    color: "white",
    alignSelf: "center",
    fontSize: 25,
    lineHeight: 35,
    fontWeight: "bold",
    fontStyle: "normal",
    textTransform: "capitalize",
    marginBottom: 10,
  },
  successText: {
    marginTop: 10,
    alignSelf: "center",
    color: "green",
    size: 25,
    // fontWeight: 600,
    textAlign: "center",
  },
  failureText: {
    marginTop: 10,
    alignSelf: "center",
    color: "red",
    size: 25,
    // fontWeight: 600,
    textAlign: "center",
  },
});

export default EditProfileScreen;
