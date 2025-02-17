import React from 'react';
import { Text, View, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import ProfileImage from './ProfileImage';
import { Post } from '../API';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../hook';
import { fetchAllPosts, removePost } from '../store/thunks/postsThunk';
import PostImage from './PostImage';

// Define the navigation stack types
type RootStackParamList = {
    PostDetail: { post: Post };
    // Add other routes here if needed
};

// Define the navigation prop for this component
type PostReusableNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PostDetail'>;


const PostReusable = ({ post, isMyPosts, className }: { post: Post, isMyPosts?: Boolean | null; className?: string }) => {
    const navigation = useNavigation<PostReusableNavigationProp>()
    const dispatch = useAppDispatch()
    

    const removePostByID = async () => {
        await dispatch(removePost(post.id))
        await dispatch(fetchAllPosts())
    }

    return (
        <Pressable onPress={() => navigation.navigate('PostDetail', { post })}>
            <View className={`bg-white w-full rounded-2xl mb-4 p-4 mt-5 ${className}`}>
                <PostImage size={25} src={post.image}/>
                { isMyPosts && 
                <TouchableOpacity className="absolute top-2 right-2 bg-red-500 rounded-full w-10 h-10 flex items-center justify-center" onPress={removePostByID}>
                     <Text className="text-white text-xs">X</Text>
                </TouchableOpacity>
                }
                <View className='mb-5'>
                    <Text className='mt-5 mb-2'>Title: {post.title}</Text>
                    {/* <Text style={{ marginTop: 5 }}>Content: {post.content}</Text> */}
                    <View className="flex flex-row items-center mt-1 mb-2">
                        <AntDesign name="like1" size={24} color="#004c27" />
                        <Text className='ml-2 mt-2'>{post.likes}</Text>
                    </View>
                    <View className="flex flex-row items-center mt-1 mb-2">
                        <ProfileImage size={20} src={post.user.profile}/>
                        <Text className='ml-2 mt-2'>{post.userID}</Text>
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