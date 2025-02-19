import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet, Pressable, TouchableOpacity, TextStyle } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import ProfileImage from './ProfileImage';
import { Post } from '../API';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../hook';
import { fetchAllPosts, removePost } from '../store/thunks/postsThunk';
import PostImage from './PostImage';
import { fetchedImageFromS3 } from './s3Utils';
import { theme } from '../constants/theme';
import { hp } from '../helpers/common';
import moment from 'moment';
import Icon from '../../assets/icons';

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

    const shadowStyles={
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation:1
    }

    const removePostByID = async () => {
        await dispatch(removePost(post.id))
        await dispatch(fetchAllPosts())
    }

    const createAt = moment(post.createdAt).format('MMM D');
    const liked = false;

    return (
        <View style={[styles.container, shadowStyles]}>

            <View style = {styles.header}>
                <View style = {styles.userInfo}>
                    <ProfileImage size={hp(4.5)} src={post.user.profile} />
                    <View style = {{gap:2}}>
                        <Text style = {styles.username}>{post.userID}</Text>
                        <Text style = {styles.postTime}>{createAt}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { post })}>
                    <Icon name= "threeDotsHorizontal" size = {hp(3.4)} strokeWidth = {3} color={theme.colors.text}/>
                </TouchableOpacity>
            </View>

            <View style = {styles.content}>
                <View style = {styles.postBody}>
                    <Text>{post.content}</Text>
                </View>

                <PostImage size={25} src={post.image} />

                { isMyPosts && 
                <TouchableOpacity className="absolute top-2 right-2 bg-red-500 rounded-full w-10 h-10 flex items-center justify-center" onPress={removePostByID}>
                     <Text className="text-white text-xs">X</Text>
                </TouchableOpacity>
                }
            </View>

            {/* like */}
            <View style = {styles.footer}>
                <View style = {styles.footerButton}>
                    <Icon name = "heart" size = {24} color = {liked? theme.colors.rose: theme.colors.textLight}/>
                    {/* <Text className='ml-2 mt-2'>{post.likes}</Text> */}
                    <Text style = {styles.count}>
                        {post.likes}
                    </Text>
                </View>

            </View>
        </View>
        // onPress={() => navigation.navigate('PostDetail', { post })}
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 10,
        marginBottom: 15,
        borderRadius: theme.radius.xxl * 1.1,
        borderCurve: 'continuous',
        padding: 10,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: theme.colors.gray,
        shadowColor: '#000'
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
    },
    header:{
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    username:{
        fontSize: hp(1.7),
        color: theme.colors.dark,
        fontWeight: theme.fonts.semibold as TextStyle['fontWeight']
    },
    postTime:{
        fontSize: hp(1.4),
        color: theme.colors.textLight,
        fontWeight: theme.fonts.medium as TextStyle['fontWeight']
    },
    userInfo:{
        flexDirection : 'row',
        alignItems: 'center',
        gap: 8
    },
    content:{
        gap : 10
    },
    postBody:{
        marginLeft:5,
    },
    postMedia:{
        height: hp(40),
        width: '100%',
        borderRadius: theme.radius.xl,
        borderCurve : 'continuous'
    },
    footer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap : 15
    },
    footerButton:{
        marginLeft: 5,
        flexDirection: 'row',
        alignItems:'center',
        gap: 4
    },
    count:{

    }
})

export default PostReusable;


                
             
                    {/* <Text className='mt-5 mb-2'>Title: {post.title}</Text> */}
                    {/* <Text style={{ marginTop: 5 }}>Content: {post.content}</Text> */}
                    {/* <View className="flex flex-row items-center mt-1 mb-2">
                        <AntDesign name="like1" size={24} color="#004c27" />
                        <Text className='ml-2 mt-2'>{post.likes}</Text>
                    </View> */}
                   
                        {/* <ProfileImage size={hp(4.5)} src={post.user.profile} /> */}
                        {/* <Text className='ml-2 mt-2'>{post.userID}</Text> */}