import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import { useState } from "react";
import { useAppDispatch } from "../../hook";
import { addPost, fetchMyPosts } from "../../store/thunks/postsThunk";
import { useNavigation } from "@react-navigation/native";

function PostPage() {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const postItem = async () => {
        await dispatch(addPost({ titlePost: title, contentPost: content }));
        setContent("");
        setTitle("");
        await dispatch(fetchMyPosts());
        navigation.navigate("MyPosts" as never);
    };

    return (
        <StyledContainer>
            <StyledHomeBox>
                <View className="w-full items-center p-6 bg-white rounded-2xl shadow-lg">
                    <Image
                        source={require("../../../assets/defaultPostImg.png")}
                        className="w-40 h-40 rounded-lg mb-4"
                    />
                    <TextInput
                        value={title}
                        onChangeText={(value) => setTitle(value)}
                        placeholder="Title"
                        className="w-full bg-gray-100 rounded-xl h-12 px-4 mb-4 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300"
                        placeholderTextColor="#555"
                    />
                    <TextInput
                        value={content}
                        onChangeText={(value) => setContent(value)}
                        placeholder="Content"
                        className="w-full bg-gray-100 rounded-xl h-20 px-4 mb-4 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300"
                        placeholderTextColor="#555"
                        multiline
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={postItem}
                        className="w-full bg-green-700 py-3 rounded-xl items-center shadow-md hover:bg-green-800"
                    >
                        <Text className="text-white font-bold text-lg">Post</Text>
                    </TouchableOpacity>
                </View>
            </StyledHomeBox>
        </StyledContainer>
    );
}

export default PostPage;