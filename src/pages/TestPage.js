import { useState } from "react";
import { View, Text, Image, StyleSheet, Button, TextInput, Alert } from "react-native";
import { generateClient } from "@aws-amplify/api";
import { createBook } from "../graphql/mutations";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from 'expo-image-picker'

function TestPage(){
      const client = generateClient({authMode: "apiKey"})
      const [count , setCount] = useState(0)
      const [image, setImage] = useState("")
      const [title , setTitle] = useState("")
      const [content , setContent] = useState("")
      const navigation = useNavigation();
      const [imageUri, setImageUri] = useState(null);
      console.log("imageUri: ", image);
      
    
      const addBook = async () => {
        try{
        await client.graphql({
          query: createBook,
          variables: {
            input: {
              title: title,
              content: content,
              img:  image
            }
          }
    
        })
      console.log("Success")
      }
        catch(error){
          console.log(error)
        }
      }

      const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images', 'videos'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    // const  handleChooseImage = () => {
    //      launchImageLibrary(
    //       {
    //         mediaType: "photo",
    //         quality: 1,
    //       },
    //       (response) => {
    //         if (response.didCancel) {
    //           Alert.alert("Image selection canceled");
    //           console.log("cancel");

    //         } else if (response.errorCode) {
    //           Alert.alert("Error", response.errorMessage || "Unknown error");
    //           console.log("error");
              
    //         } else if (response.assets && response.assets.length > 0) {
    //           const selectedUri = response.assets[0].uri;
    //           setImageUri(selectedUri);
    //           console.log("imgUri: ",selectedUri);
    //         }
    //         else{
    //           console.log("else statement");
              
    //         }
    //       }
    //     );
    //     console.log("imageUri: ",imageUri);
    //   };
    
    return (
        <View
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Hello World 1 2 3 4 5 6 7 8 9</Text>
              <Image source={require('../../assets/shima.jpg')} style={myStyle.image}></Image>
              <View>
                <Text>count : {count}</Text>
              </View>
              <View style={{ marginTop: 5}}>
                <Button title="Increase Count" color="green" onPress={() => setCount(count+1)}></Button>
              </View>
               {image && <Image source={{ uri: image }} style={myStyle.image} />}
              <TextInput placeholder="enter a title" keyboardType="default" onChangeText={(value) => setTitle(value)}></TextInput>
              <TextInput placeholder="enter a content" keyboardType="default" onChangeText={(value) => setContent(value)}></TextInput>
              <Button title="upload Image" onPress={() => pickImage()}></Button>
              <Button title="upload to DB" onPress={() => addBook()}></Button>
              <View style={{marginTop: 6}}>
              {/* <Button title="to Profile Page >" onPress={() => navigation.navigate("Profile" as never)}></Button> */}
              </View>
            </View>
    )
}

const myStyle = StyleSheet.create({
    image: {
      width: 300,
      height: 300,
      marginTop: 20,
      borderRadius: 10,
    },
  });

export default TestPage;
