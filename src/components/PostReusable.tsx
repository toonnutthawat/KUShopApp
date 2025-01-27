import React from 'react';
import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import ProfileImage from './ProfileImage';
import { Post } from '../API';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the navigation stack types
type RootStackParamList = {
  PostDetail: { post: Post };
  // Add other routes here if needed
};

// Define the navigation prop for this component
type PostReusableNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PostDetail'>;


const PostReusable = ({ post }: { post: Post }) => {
    const navigation = useNavigation<PostReusableNavigationProp>()
    return (
        <Pressable onPress={() => navigation.navigate('PostDetail', { post })}>
        <View style={styles.container}>
            <Image source={require("../../assets/defaultPostImg.png")} style={{ width: 200, marginTop: 20 }} />
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
        borderRadius: 20
    }
})

export default PostReusable;
