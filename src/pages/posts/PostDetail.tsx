import { View, Image, Text, StyleSheet, Pressable, TextInput, TouchableOpacity } from "react-native"
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

function PostDetail({ route }) {
    const { post } : { post : Post} = route.params
    const formattedDate = format(new Date(post.createdAt), 'hh:mm a : PPP');
    const comments = useAppSelector(state => state.comments.data)
    const [showComments, setShowComments] = useState(false)
    const [comment , setComment] = useState("")
    const dispatch = useAppDispatch()
    console.log("comments :" , comments);

    useEffect(() => {
        dispatch(fetchCommentByPost(post))
        const fetch = async () => {
            dispatch(fetchCommentByPost(post))
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

    if(!comments) return;
    const renderedComments = comments.map((comment,index) => {
        const commentDate = format(new Date(comment.createdAt), 'hh:mm a : PPP')
        return(
            <View style={{backgroundColor: 'white', padding: 10, borderRadius: 10, marginTop: 10}} key={index}>
                <View style={{display: 'flex' ,flexDirection: 'row'}}>
                    <ProfileImage size={24}></ProfileImage>
                    <Text style={{marginLeft: 5}}>{comment.userID}</Text>
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

    return (
        <StyledContainer>
            <StyledHomeBox>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                    <Image source={require("../../../assets/defaultPostImg.png")} style={{ width: 200, marginTop: 20 }} />
                    <View style={[{ marginBottom: 20 }]}>
                        <Text style={[{ marginTop: 10 }, styles.text]}>หัวข้อ: {post.title}</Text>
                        <Text style={[{ marginTop: 10 }, styles.text]}>รายละเอียด: {post.content}</Text>
                        <Text style={[{ marginTop: 10 }, styles.text]}>โพสต์วันที่: {formattedDate}</Text>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                            <ProfileImage size={20} />
                            <Text style={[{ marginLeft: 10 }, styles.text]}>{post.userID}</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                            <AntDesign name="like1" size={30} color="#004c27" />
                            <Text style={[{ marginLeft: 10 }, styles.text]}>{post.likes}</Text>
                        </View>
                        <Pressable onPress={() => setShowComments(!showComments)}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                            <FontAwesome name="comments" size={30} color="#004c27" />
                            <Text style={[{ marginLeft: 10 }, styles.text]}>{comments.length}</Text>
                        </View>
                        </Pressable>
                        {
                            showComments && (
                                <View style={{marginTop: 20}}>
                                    <TextInput
                                        value={comment}
                                        placeholder="type your comment"
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
                        }
                    </View>
                </View>
            </StyledHomeBox>
        </StyledContainer>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20
    },
    button: {
        backgroundColor: '#004c27',
        padding: 5,
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 20
    },
    textField: {
        backgroundColor: 'white',
        borderRadius: 20
    }
})

export default PostDetail