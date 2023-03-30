import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Dimensions
  } from "react-native";
  import Carousel from 'react-native-reanimated-carousel';
  import CONFIG from "../../Config";

// pass in an array of image url
const ImageCarousel = () => {

    // const images = [
    //     { id: '1', uri: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80' },
    //     { id: '2', uri: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
    //     { id: '3', uri: 'https://cdn.shopify.com/s/files/1/0070/7032/files/best-free-stock-photo-websites.jpg?v=1619036042&width=1024' },
    //     // Add more images here
    //   ];

    // const items = [
    // { id: '1', text: 'Item 1' },
    // { id: '2', text: 'Item 2' },
    // { id: '3', text: 'Item 3' },
    // ];
    // // console.log(images[0].id)
    

    // return (
    //     <View>
    //         {/* <FlatList  
    //             data={images}  
    //             renderItem={({item}) =>{  return <Image source={{ uri: item.uri }}></Image>}}  
    //             // renderItem={({ item }) => <Text>{item.uri}</Text>}
    //             keyExtractor={(item) => item.id}
    //             // snapToAlignment="start"  
    //             // decelerationRate={"normal"}  
    //             horizontal
    //             // pagingEnabled  
    //             // snapToInterval={120}  
    //         /> */}

            
    //     </View>
    // );

    const width = Dimensions.get('window').width;
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    displayImage:{
        height:'100%'
    }
})


export default ImageCarousel;