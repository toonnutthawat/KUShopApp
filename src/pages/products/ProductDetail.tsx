import { View, Image, Text, StyleSheet, Pressable, TextInput, TouchableOpacity } from "react-native"
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import AntDesign from '@expo/vector-icons/AntDesign';
import ProfileImage from "../../components/ProfileImage";
import { format } from 'date-fns'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Comment, Product } from "../../API";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addComment, fetchCommentByProduct } from "../../store/thunks/commentsThunk";
import { useAppDispatch, useAppSelector } from "../../hook";
import { changeLikeStatus, fetchLikeStatus, updateTotalLikes } from "../../store/thunks/likeStatusThunk";
import { fetchMyProducts } from "../../store/thunks/productsThunk";
import Entypo from '@expo/vector-icons/Entypo';
import { fetchMyChat } from "../../store/thunks/chatsThunk";
import { useNavigation } from "@react-navigation/native";
import PostImage from "../../components/PostImage";
import { fetchMyUser } from "../../store/thunks/userThunk";
import BackButton from "../../components/BackButton";

function ProductDetail({ route }) {
    const { product } : { product : Product} = route.params
    const formattedDate = format(new Date(product.createdAt), 'hh:mm a : PPP');
    const comments = useAppSelector(state => state.comments.data)
    console.log("comments" , comments);
    const myUser = useAppSelector(state => state.users.myUser)
    //const myChatWithPostID = useAppSelector(state => state.chats.myChat)
    const likeStatus = useAppSelector(state => state.likeStatus.data)
    console.log("likeStatus", likeStatus);

    const totalLikes = useAppSelector(state => state.products.allProducts.data.find((fetchProduct) => fetchProduct.id === product.id))
    const [showComments, setShowComments] = useState(false)
    const [comment , setComment] = useState("")
    const dispatch = useAppDispatch()
    const navigation = useNavigation()

    useEffect(() => {
        const fetch = async () => {
            dispatch(fetchCommentByProduct(product))
            dispatch(fetchLikeStatus(product.id))
            dispatch(fetchMyProducts())
        }
        fetch()
    },[product])

    const sentComment = async () => {
        await dispatch(addComment({
            productID: product.id,
            commentContent: comment
        }))
        setShowComments(false)
        setComment("")
    }

    const checkUserChatWithFriendID = async () => {
        await dispatch(fetchMyChat(product.userID))
        navigation.navigate("Chat" as never)
    }

    if(!comments) return;
    const renderedComments = comments.map((comment,index) => {
        const commentDate = format(new Date(comment.createdAt), 'hh:mm a : PPP')

        return(
            <View style={{backgroundColor: 'white', padding: 10, borderRadius: 10, marginTop: 10}} key={index}>
                <View style={{display: 'flex' ,flexDirection: 'row'}}>
                    <ProfileImage size={24} src={`public/profile/${comment.userID}.png`}></ProfileImage>
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

    const toggleLikeStatus = async () => {
        await dispatch(changeLikeStatus(product.id))
        await dispatch(fetchLikeStatus(product.id))
        await dispatch(updateTotalLikes(product.id))
    }

    return (
        <StyledContainer>
            <StyledHomeBox>
                <BackButton/>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                    
                    <PostImage size={35} src={product.image}></PostImage>
                    <View style={[{ marginBottom: 20 }]}>
                        <Text style={[{ marginTop: 10 }, styles.text]}>หัวข้อ: {product.title}</Text>
                        <Text style={[{ marginTop: 10 }, styles.text]}>รายละเอียด: {product.content}</Text>
                        <Text style={[{ marginTop: 10 }, styles.text]}>ประเภทสินค้า: {product.category}</Text>
                        <Text style={[{ marginTop: 10 }, styles.text]}>ราคาสินค้า: {product.price} ฿</Text>
                        <Text style={[{ marginTop: 10 }, styles.text]}>โพสต์วันที่: {formattedDate}</Text>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                            <ProfileImage size={20} src={product.user.profile}/>
                            <Text style={[{ marginLeft: 10 }, styles.text]}>{product.userID}</Text>
                            {
                                myUser.id !== product.userID && (
                                    <Pressable onPress={checkUserChatWithFriendID}>
                                        <Entypo name="chat" size={30} color="#004c27"  style={{marginLeft: 20}}/>
                                    </Pressable>
                                )
                            }
                            
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                            { likeStatus && (
                            <Pressable onPress={toggleLikeStatus}>
                            {
                                (likeStatus.status === true) ? <AntDesign name="like1" size={30} color="#004c27" /> :
                                <AntDesign name="like1" size={30} color="silver" />
                            }
                            </Pressable>)
                            }
                            <Text style={[{ marginLeft: 10 }, styles.text]}>{totalLikes.likes}</Text>
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

export default ProductDetail