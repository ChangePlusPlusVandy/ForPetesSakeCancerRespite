import React from "react";
import { StyleSheet, View, TouchableOpacity,Image} from "react-native";
import { useNavigation} from "@react-navigation/native";

//If you want to use this component with post function, pass in postEnabled = true. Example provided below.
// <BottomBar postEnabled={true} ></BottomBar>

const BottomBar = (props) => {

  const postEnabled = props.postEnabled;
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>

        {postEnabled
          ? 
            <TouchableOpacity 
              style={styles.post}
              onPress={() => navigation.navigate("CreatePost")}
              >
              <Image style={{height:'70px',width:undefined, aspectRatio:1,marginLeft:'5px'}} source={require('../../public/commonIcons/PostButton.png')}></Image>
            </TouchableOpacity>
          :
            <View></View>
        }
        

      <View style={styles.bottomBar}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  post:{
    position:'absolute',
    bottom:0,
    zIndex:1,
    alignItems: 'center',
    justifyContent:'start',
    marginBottom: 0,
    width:'25%',
    height:'100%',
  },
  button: {
    alignItems: 'center',
    justifyContent:'start',
    padding: 10,
    marginBottom: 0,
    width:'50%',
    height:'100%',
  },
  footer:{
    position:'absolute',
    bottom: 0,
    height:'12%',
    width:'100%',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'end',
    backgroundColor:'transparent'
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    height:'66%',
    width:'100%',
    backgroundColor:'#088DA9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }
});

export default BottomBar;
