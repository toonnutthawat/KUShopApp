import { View, Image, Text, StyleSheet, Pressable, TextInput, TouchableOpacity, TextStyle, ScrollView } from "react-native"
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import AntDesign from '@expo/vector-icons/AntDesign';
import ProfileImage from "../../components/ProfileImage";
import { format } from 'date-fns'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Comment, Post } from "../../API";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addComment, fetchCommentByPost } from "../../store/thunks/commentsThunk";
import { useAppDispatch, useAppSelector } from "../../hook";
import { changeLikeStatus, fetchLikeStatus, updateTotalLikes } from "../../store/thunks/likeStatusThunk";
import { fetchAllPosts, fetchMyPosts } from "../../store/thunks/postsThunk";
import Entypo from '@expo/vector-icons/Entypo';
import { fetchMyChat } from "../../store/thunks/chatsThunk";
import { useNavigation } from "@react-navigation/native";
import PostImage from "../../components/PostImage";
import { fetchMyUser } from "../../store/thunks/userThunk";
import BackButton from "../../components/BackButton";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import Loading from "../../components/Loading";
import Icon from "../../../assets/icons";
import Input from "../../components/Input";

function PostDetail({ route }) {

    // const [startLoading, setStartLoading] = useState(true)
    // if(startLoading){
    //     return (
    //         <View style={styles.center}>
    //             <Loading/>
    //         </View>
    //     )
    // }
    
    // setStartLoading(false)

    const { post } : { post : Post} = route.params;
    const formattedDate = format(new Date(post.createdAt), 'hh:mm a : PPP');
    const comments = useAppSelector(state => state.comments.data)
    console.log("comments" , comments);
    const myUser = useAppSelector(state => state.users.myUser)
    const myChatWithPostID = useAppSelector(state => state.chats.myChat)
    const likeStatus = useAppSelector(state => state.likeStatus.data || null)
    const totalLikes = useAppSelector(state => state.posts.allPosts.data.find((fecthPost) => fecthPost.id === post.id))
    const [showComments, setShowComments] = useState(false)
    const [comment , setComment] = useState("")
    const dispatch = useAppDispatch()
    const navigation = useNavigation()

    useEffect(() => {
        // dispatch(fetchCommentByPost(post))
        const fetch = async () => {
            dispatch(fetchCommentByPost(post))
            dispatch(fetchLikeStatus(post.id))
            dispatch(fetchMyPosts())
        }
        fetch()
    },[post])

    const sentComment = async () => {
        await dispatch(addComment({
            postID: post.id,
            commentContent: comment
        }))
        setShowComments(false)
        setComment("")
    }

    const checkUserChatWithFriendID = async () => {
        await dispatch(fetchMyChat(post.userID))
        navigation.navigate("Chat" as never)
    }

    if(!comments) return;
    const renderedComments = comments.map((comment,index) => {
        const commentDate = format(new Date(comment.createdAt), 'hh:mm a : PPP')
        //console.log(comment.user.profile);
        
        return(
            <View style={{backgroundColor: 'white', padding: 10, borderRadius: 10, marginTop: 10}} key={index}>
                <View style={{display: 'flex' ,flexDirection: 'row'}}>
                    {/* {
                        (comment.user.profile) && <ProfileImage size={24} src={comment.user.profile}></ProfileImage>
                    } */}
                    <ProfileImage size={24}></ProfileImage>
                    {/* <ProfileImage size={24} src={comment.post.user.profile}></ProfileImage> */}
                    <Text style={{marginLeft: 5, marginTop: 6}}>{comment.userID}</Text>
                </View>
                <View style={{marginTop: 5}}>
                    <Text>{comment.content}</Text>
                </View>
                <View style={{marginTop: 5}}>
                    <Text>{commentDate}</Text>
                </View>
            </View>
            
        )
    })

    const toggleLikeStatus = async () => {
        await dispatch(changeLikeStatus(post.id))
        await dispatch(fetchLikeStatus(post.id))
        await dispatch(updateTotalLikes(post.id))
    }

    return (
        <StyledContainer>
           
                <View style={styles.container}>
                    <BackButton/>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list} className="mt-2">
                        <View style = {styles.header}>
                            <View style = {styles.userInfo}>
                                <ProfileImage size={hp(4.5)} src={post.user.profile} />
                                <View style = {{gap:2}}>
                                    <Text style={styles.username}>{post.userID}</Text>
                                    <Text style={styles.postTime}>{formattedDate}</Text>
                                </View>
                            </View>
                        </View>

                        <View style = {styles.content}>

                            <View style = {styles.postBody}>
                                <Text style={[{ marginTop: 10 }, styles.text]}>หัวข้อ: {post.title}</Text>
                                <Text style={[{ marginTop: 10 }, styles.text]}>รายละเอียด: {post.content}</Text>
                                
                            </View>

                            <PostImage size={35} src={post.image}></PostImage>

                        </View>

                        {/* like */}
                        <View style = {styles.footer}>
                            <View style = {styles.footerButton}>
                                { likeStatus && (
                                    <Pressable onPress={toggleLikeStatus}>
                                        {
                                            (likeStatus.status === true) ? <AntDesign name="like1" size={30} color="#004c27" /> :
                                            <AntDesign name="like1" size={30} color="silver" />
                                        }
                                    </Pressable>   
                                )} 

                                <Text style={[{ marginLeft: 5, marginTop: 7 }, styles.text]}>{totalLikes.likes}</Text>

                                <Pressable onPress={() => setShowComments(!showComments)}>
                                    <View style={{flexDirection: "row", marginTop: 7, marginLeft: 15 }}>
                                        <Icon name="comment" size={30} color="#004c27" />
                                        <Text style={[{ marginLeft: 10, marginTop: 5 }, styles.text]}>{comments.length}</Text>
                                    </View>
                                </Pressable>

                                { myUser.id !== post.userID && (
                                    <Pressable onPress={checkUserChatWithFriendID}>
                                        <Entypo name="chat" size={30} color="#004c27"  style={{marginLeft: 10, marginTop: 8}}/>
                                    </Pressable>)
                                }
                                <Text style={[{ marginTop: 10 }, styles.text]} className="ml-2 mt-2">Click to Chat!</Text>
                                
                                
                            </View>
                            
                        </View>
                        {
                            showComments && (
                                <View style={styles.inputContainer}>
                                    <Input
                                        value={comment}
                                        placeholder="Type comment..."
                                        placeholderTextColor = {theme.colors.textLight}
                                        onChangeText={(value) => setComment(value)}
                                        containerStyle = {{flex:1, height: hp(6.2), borderRadius: theme.radius.xl}}
                                    />
                                    <TouchableOpacity style={styles.sendIcon} onPress={sentComment}>
                                        <Icon name="send" color={theme.colors.primaryDark}/>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        
                        {
                            renderedComments
                        }
                    </ScrollView>
                </View>
           
                        {/* <PostImage size={35} src={post.image}></PostImage>
                        <View style={[{ marginBottom: 20 }]}>
                            <Text style={[{ marginTop: 10 }, styles.text]}>หัวข้อ: {post.title}</Text>
                            <Text style={[{ marginTop: 10 }, styles.text]}>รายละเอียด: {post.content}</Text>
                            <Text style={[{ marginTop: 10 }, styles.text]}>โพสต์วันที่: {formattedDate}</Text>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                                <ProfileImage size={20} src={post.user.profile}/>
                                <Text style={[{ marginLeft: 10 }, styles.text]}>{post.userID}</Text>
                                {
                                    myUser.id !== post.userID && (
                                        <Pressable onPress={checkUserChatWithFriendID}>
                                            <Entypo name="chat" size={30} color="#004c27"  style={{marginLeft: 20}}/>
                                        </Pressable>
                                    )
                                }
                        </View> */}

                        {/* <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                            { likeStatus && (
                            <Pressable onPress={toggleLikeStatus}>
                                {
                                    (likeStatus.status === true) ? <AntDesign name="like1" size={30} color="#004c27" /> :
                                    <AntDesign name="like1" size={30} color="silver" />
                                }
                            </Pressable>)}
                            <Text style={[{ marginLeft: 10 }, styles.text]}>{totalLikes.likes}</Text>
                        </View> */}

                        {/* <Pressable onPress={() => setShowComments(!showComments)}>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                                <FontAwesome name="comments" size={30} color="#004c27" />
                                <Text style={[{ marginLeft: 10 }, styles.text]}>{comments.length}</Text>
                            </View>
                        </Pressable> */}
                       
                        {/* {
                            showComments && (
                                <View style={{marginTop: 20}}>
                                    <TextInput
                                        value={comment}
                                        placeholder="Type your comment"
                                        onChangeText={(value) => setComment(value)}
                                        style={styles.textField}
                                    >
                                    </TextInput>
                                    <TouchableOpacity style={styles.button} onPress={sentComment}>
                                        <Text style={{color: 'white'}}>comment</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        {
                            renderedComments
                        } */}
                        
                    {/* </View> */}
        </StyledContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.kuColor,
        padding: 20,
        
    },
    postBody:{
        marginLeft:5,
    },
    inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 10
    },
    list:{
        paddingHorizontal: wp(4)
    },
    username:{
        fontSize: hp(1.7),
        color: theme.colors.dark,
        fontWeight: theme.fonts.semibold as TextStyle['fontWeight']
    },
    userInfo:{
        flexDirection : 'row',
        alignItems: 'center',
        gap: 8
    },
    header:{
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    center:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center'
    },
    postTime:{
        fontSize: hp(1.4),
        color: theme.colors.textLight,
        fontWeight: theme.fonts.medium as TextStyle['fontWeight']
    },
    text: {
        fontSize: 18,
        fontWeight: theme.fonts.medium as TextStyle['fontWeight'],
        color: theme.colors.textPrimary,
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: theme.colors.textOnPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textField: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
    },
    content: {
        fontSize: 18,
        color: theme.colors.textSecondary,
        marginTop: 5,
    },
    createdAt: {
        fontSize: 14,
        color: theme.colors.textMuted,
        marginTop: 5,
    },
    commentContainer: {
        backgroundColor: theme.colors.card,
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    commentText: {
        fontSize: 16,
        color: theme.colors.textPrimary,
    },
    profileImageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 10,
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 5,
    },
    commentsSection: {
        marginTop: 20,
    },
    footer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap : 15,
        marginTop: 15
    },
    footerButton:{
        marginLeft: 5,
        flexDirection: 'row',
        alignItems:'center',
        gap: 4
    },
    sendIcon:{
        alignItems: 'center',
        justifyContent:'center',
        borderWidth: 0.8,
        borderColor: theme.colors.primary,
        borderRadius: theme.radius.lg,
        borderCurve: 'continuous',
        height : hp(5.8),
        width: hp(5.8)
    }
});


export default PostDetail