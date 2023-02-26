import React from "react";
import { StyleSheet, View, TouchableOpacity,Image} from "react-native";
import { useNavigation} from "@react-navigation/native";

const BottomBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("Home")}
      >
          <Image style={{height:'35px',width:undefined, aspectRatio:1,}} source={require('../../public/newsletter/Home.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Profile")}
          >
              <Image style={{height:'35px',width:undefined, aspectRatio:1.8,}} source={require('../../public/newsletter/ProfileButton.png')}></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent:'center',
    padding: 10,
    marginBottom: 0,
    width:'50%',
    height:'100%',
  },
  footer:{
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    width:'100%',
    backgroundColor:'#088DA9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default BottomBar;
