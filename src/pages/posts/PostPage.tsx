import { Text ,View , Image, TextInput , StyleSheet, Button, TouchableOpacity} from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import { useState } from "react";
import { useAppDispatch } from "../../hook";
import { addPost, fetchMyPosts } from "../../store/thunks/postsThunk";
import { useNavigation } from "@react-navigation/native";

function PostPage(){

    const [content , setContent] = useState("")
    const [title , setTitle] = useState("")
    const dispatch = useAppDispatch()
    const navigation = useNavigation()

    const postItem = async () => {
        await dispatch(addPost({titlePost: title , contentPost: content}))
        setContent("")
        setTitle("")
        await dispatch(fetchMyPosts())
        navigation.navigate("MyPosts" as never)
    }

    return(
        <StyledContainer>
            <StyledHomeBox>
                <View>
                    <Image source={require("../../../assets/defaultPostImg.png")}></Image>
                    <TextInput
                        value={title}
                        onChangeText={(value) => setTitle(value)}
                        placeholder="title"
                        style={styles.textInput}
                    ></TextInput>
                    <TextInput
                        value={content}
                        onChangeText={(value) => setContent(value)}
                        placeholder="content"
                        style={styles.textInput}
                    ></TextInput>
                    <View style={{marginTop: 20}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={postItem}
                            style={{backgroundColor: "#004c27", padding: 4, alignItems: 'center', borderRadius: 10}}
                            >
                                <Text style={{color: 'white'}}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </StyledHomeBox>
        </StyledContainer>
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10

    }
})

export default PostPage;