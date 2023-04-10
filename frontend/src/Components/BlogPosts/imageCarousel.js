// import React from "react";
// import {
//     StyleSheet,
//     Text,
//     TextInput,
//     View,
//     Image,
//     FlatList,
//     TouchableOpacity,
//     ScrollView,
//     Dimensions
//   } from "react-native";
//   import Carousel from 'react-native-reanimated-carousel';
//   import CONFIG from "../../Config";

// pass in an array of image url
const ImageCarousel = (props) => {
    const width = Dimensions.get('window').width;
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                // loop
                width={width}
                height={width * 1.2}
                autoPlay={false}
                data={props.imgLink}
                scrollAnimationDuration={1000}
                onSnapToItem={(id) => console.log('current index:', id)}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Image style={styles.displayImage} 
                               source={{ uri: item.uri }} 
                               />
                    </View>
                )}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    displayImage:{
        width:'100%',
        height:'100%'
    }
})


//     //     </View>
//     // );

//     const width = Dimensions.get('window').width;
//     return (
//         <View style={{ flex: 1 }}>
//             <Carousel
//                 loop
//                 width={width}
//                 height={width / 2}
//                 autoPlay={true}
//                 data={[...new Array(6).keys()]}
//                 scrollAnimationDuration={1000}
//                 onSnapToItem={(index) => console.log('current index:', index)}
//                 renderItem={({ index }) => (
//                     <View
//                         style={{
//                             flex: 1,
//                             borderWidth: 1,
//                             justifyContent: 'center',
//                         }}
//                     >
//                         <Text style={{ textAlign: 'center', fontSize: 30 }}>
//                             {index}
//                         </Text>
//                     </View>
//                 )}
//             />
//         </View>
//     )
// }


// const styles = StyleSheet.create({
//     displayImage:{
//         height:'100%'
//     }
// })


// export default ImageCarousel;

export default () => {};