import { Text ,View , Image, TextInput , StyleSheet, TouchableOpacity} from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addPost, fetchMyPosts } from "../../store/thunks/postsThunk";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { decode } from "base64-arraybuffer";
import { uploadImgToS3 } from "../../store/thunks/imageThunk";
import { pickImage } from "../../components/pickImage";
import Input from "../../components/Input";
import { wp } from "../../helpers/common";
import Button from "../../components/Button";
import Header from "../../components/Header";

function PostPage(){
    const userInfo = useAppSelector(state => state.users.myUser)
    const [content , setContent] = useState("")
    const [title , setTitle] = useState("")
    const [selectedImg , setSelectedImg] = useState<ImagePicker.ImagePickerAsset>()
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);

    const selectImage = async () => {
            const image = await pickImage()
            setSelectedImg(image)
        };
    
    const uploadIMG = async () => {
            if (selectedImg) {
                console.log("IF in Image");
                const filename = `public/post/${selectedImg.fileName}` + '.png';
                await postItem(filename)
                const fileBase64 = await FileSystem.readAsStringAsync(selectedImg.uri, {
                    encoding: FileSystem.EncodingType.Base64
                })
                let imageData = decode(fileBase64)
                await dispatch(uploadImgToS3({ filenamePath: filename, data: imageData }))
                setSelectedImg(null)
            } else {
                await postItem(null)
                console.log("No image selected");
            }
            
        };

    const postItem = async (imgPath: string | null) => {
        await dispatch(addPost({titlePost: title , contentPost: content, imgPath: imgPath}))
        setContent("")
        setTitle("")
        await dispatch(fetchMyPosts())
        navigation.navigate("MyPosts" as never)
    }

    return(
        <StyledContainer>
                <View style = {styles.container}>
                    <Header title = "Create Post"/>
                    {
                        selectedImg ? <Image source={{uri: selectedImg.uri}} style={styles.img}></Image>:
                        <Image source={require("../../../assets/defaultPostImg.png")} style={styles.img}></Image>
                    }
                    <TouchableOpacity className="absolute right-4 top-4 bg-green-500 rounded-lg p-2 mt-8" onPress={selectImage}>
                        <FontAwesome6 name="add"  size={24} color="#004c27"/>
                    </TouchableOpacity>
                    <View style = {styles.form}>
                        <Input
                            value={title}
                            onChangeText={(value) => setTitle(value)}
                            placeholder="title"
                        />
                        <Input
                            value={content}
                            onChangeText={(value) => setContent(value)}
                            placeholder="content"
                        />
                         <View>
                            <Button title = {'Post'}  loading = {loading} onPress={uploadIMG}/>
                        </View>
                    </View>
                </View>
            
        </StyledContainer>
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10
    },
    form:{
        gap:25,
    },
    container :{
        flex: 1,
        marginBottom: 30,
        paddingHorizontal: wp(4),
        gap: 55,
    },
    img: {
        width: 300,
        height: 200,
        borderRadius: 10,
    }
})

export default PostPage;