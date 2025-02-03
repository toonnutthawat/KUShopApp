import React from 'react';
import { Text, View, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import ProfileImage from './ProfileImage';
import { Post } from '../API';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../hook';
import { fetchAllPosts, removePost } from '../store/thunks/postsThunk';

// Define the navigation stack types
type RootStackParamList = {
    PostDetail: { post: Post };
    // Add other routes here if needed
};

// Define the navigation prop for this component
type PostReusableNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PostDetail'>;


const PostReusable = ({ post, isMyPosts, className}: { post: Post, isMyPosts?: Boolean | null ; className?: string  }) => {
    const navigation = useNavigation<PostReusableNavigationProp>()
    const dispatch = useAppDispatch()

    const removePostByID = async () => {
        await dispatch(removePost(post.id))
        await dispatch(fetchAllPosts())
    }

    return (
        <Pressable onPress={() => navigation.navigate('PostDetail', { post })}>
            <View className={`bg-white w-full rounded-2xl mb-4 p-4 ${className}`}>
                { isMyPosts && 
                    <TouchableOpacity className="absolute top-2 right-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center" onPress={removePostByID}>
                        <Text className="text-white text-xs">X</Text>
                    </TouchableOpacity>
                }

                <Image source={require("../../assets/defaultPostImg.png")} className="w-full h-40 rounded-md mt-2" resizeMode="cover" />
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ marginTop: 5 }}>Title: {post.title}</Text>
                    {/* <Text style={{ marginTop: 5 }}>Content: {post.content}</Text> */}
                    <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 5 }}>
                        <AntDesign name="like1" size={24} color="#004c27" />
                        <Text style={{ marginLeft: 10 }}>{post.likes}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 5 }}>
                        <ProfileImage size={20} />
                        <Text style={{ marginLeft: 10 }}>{post.userID}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: 300,
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 20,
        position: 'relative'
    },
    deleteButton: {
        backgroundColor: 'red',
        position: 'absolute',
        margin: 10,
        right: 0,
        borderRadius: 50,
        width: 30,
        display: 'flex',
        alignItems: 'center'
    }
})

export default PostReusable;
