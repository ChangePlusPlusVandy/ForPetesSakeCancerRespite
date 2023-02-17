import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation, Link } from "@react-navigation/native";

const BottomBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.rectangle}>
      <View style={styles.homeButtonContainer}>
        <Link to={{ screen: "Home" }} style={{ textDecoration: "none" }}>
          <IconButton
            icon="home"
            iconColor={"white"}
            size={50}
            onPress={() => console.log("Pressed")}
          />
        </Link>
        <Link to={{ screen: "Messaging" }} style={{ textDecoration: "none" }}>
          <IconButton
            icon="chat"
            iconColor={"white"}
            size={50}
            onPress={() => console.log("Pressed")}
          />
        </Link>
        <Link to={{ screen: "Profile" }} style={{ textDecoration: "none" }}>
          <IconButton
            icon="account-circle"
            iconColor={"white"}
            size={50}
            onPress={() => console.log("Pressed")}
          />
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: "100%",
    bottom: 0,
    position: "absolute",
    height: "18%",
    backgroundColor: "#088DA9",
    flexDirection: "row",
    justifyContent: "center",
  },
  homeButtonContainer: {
    width: "85%",
    margin: 10,
    flexDirection: "row", 
    justifyContent: "space-between"
  },
});

export default BottomBar;
