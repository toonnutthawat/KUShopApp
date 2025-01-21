import React from 'react';
import { Text, View, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import ProfileImage from './ProfileImage';
import { Post } from '../API';

const PostReusable = ({ post } : {post : Post}) => {
    return (
        <View style={{ marginTop: 20 }}>
            <Image source={require("../../assets/defaultPostImg.png")} />
            <Text style={{ marginTop: 5 }}>Title: {post.title}</Text>
            <Text style={{ marginTop: 5 }}>Content: {post.content}</Text>
            <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 5 }}>
                <AntDesign name="like1" size={24} color="#004c27" />
                <Text style={{ marginLeft: 10 }}>{post.likes}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 5 }}>
                <ProfileImage size={20} />
                <Text style={{ marginLeft: 10 }}>{post.userID}</Text>
            </View>
        </View>
    );
};

export default PostReusable;
