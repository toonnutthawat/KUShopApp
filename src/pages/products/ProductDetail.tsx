import { View, Image, Text, StyleSheet, Pressable, TextInput, TouchableOpacity, ScrollView, TextStyle, Linking, Platform, RefreshControl, Alert } from "react-native"
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import AntDesign from '@expo/vector-icons/AntDesign';
import ProfileImage from "../../components/ProfileImage";
import { format } from 'date-fns'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Chat, Comment, Product, ProductStatus } from "../../API";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addComment, fetchCommentByProduct } from "../../store/thunks/commentsThunk";
import { useAppDispatch, useAppSelector } from "../../hook";
import { changeLikeStatus, fetchLikeStatus, updateTotalLikes } from "../../store/thunks/likeStatusThunk";
import { fetchFavoriteProducts, fetchMyProducts } from "../../store/thunks/productsThunk";
import Entypo from '@expo/vector-icons/Entypo';
import { addProductWithChat, fetchAllChats, fetchMyChat } from "../../store/thunks/chatsThunk";
import { useNavigation } from "@react-navigation/native";
import PostImage from "../../components/PostImage";
import { fetchMyUser } from "../../store/thunks/userThunk";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { th } from "date-fns/locale";
import Icon from "../../../assets/icons";

type RootStackParamList = {
    ChatPage: {chat: Chat}
}

type ChatResuableNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChatPage'>



function ProductDetail({ route }) {
  const { product , navigatedPath }: { product: Product , navigatedPath : String} = route.params
  const formattedDate = format(new Date(product.createdAt), 'hh:mm a : PPP');
  const comments = useAppSelector(state => state.comments.data)
  const myUser = useAppSelector(state => state.users.myUser)
  const likeStatus = useAppSelector(state => state.likeStatus.data)
  const myChat = useAppSelector(state => state.chats.myChat)
  const anotherChat = useAppSelector(state => state.chats.myChat)
  const [loading, setLoading] = useState(false);
  const [chatTriggered, setChatTriggered] = useState(false);
  const [likesOfProduct , setLikesOfProduct] = useState(product.likes)
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState("")
  const dispatch = useAppDispatch()
  const navigation = useNavigation<ChatResuableNavigationProp>()


  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchCommentByProduct(product))
      dispatch(fetchLikeStatus(product.id))
      dispatch(fetchMyProducts({isSold: false}))
    }
    fetch()
  }, [product])

  const sentComment = async () => {
    await dispatch(addComment({
      productID: product.id,
      commentContent: comment
    }))
    setShowComments(false)
    setComment("")
  }

  const checkUserChatWithFriendID = async () => {
    setLoading(true);
    await dispatch(fetchMyChat(product.userID));
    console.log("myChat", myChat);
    setChatTriggered(true);
  }

  useEffect(() => {
    if (chatTriggered) {
      const fetchData = async () => {
        try {
          await dispatch(fetchMyChat(product.userID)); // Ensure chat is fetched first
          await dispatch(addProductWithChat({
            chatID: myChat.id,
            productID: product.id
          })); // Ensure product is added to chat
          await dispatch(fetchMyChat(product.userID));
          const updatedChat = await dispatch(fetchMyChat(product.userID)).unwrap() as Chat
          await dispatch(fetchAllChats())
          //console.log("Updated myChat", myChat);

          setChatTriggered(false); // Reset the state after running

        
          // Wait for chat to be updated, then navigate
          navigation.navigate("ChatPage", { chat: updatedChat });
          setLoading(false);
        } catch (error) {
          console.error("Error fetching chat or adding product:", error);
        }
      };
      fetchData();

    }
  }, [chatTriggered]);

  if (!comments) return;
  const renderedComments = comments.map((comment, index) => {
    const commentDate = format(new Date(comment.createdAt), 'hh:mm a : PPP')

    return (
      <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, marginTop: 10 }} key={index}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <ProfileImage size={24} src={`public/profile/${comment.userID}.png`}></ProfileImage>
          <Text style={{ marginLeft: 5 }}>{comment.userID}</Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <Text>{comment.content}</Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <Text>{commentDate}</Text>
        </View>
      </View>
    )
  })

  const toggleLikeStatus = async () => {
    await dispatch(changeLikeStatus(product.id))
    const fetchedLikesStatus = await dispatch(fetchLikeStatus(product.id)).unwrap()
    console.log(fetchedLikesStatus);
    
    await dispatch(updateTotalLikes(product.id))
    await dispatch(fetchFavoriteProducts())
    if(fetchedLikesStatus.status){
      setLikesOfProduct(likesOfProduct + 1)
    }
    else{
      setLikesOfProduct(likesOfProduct - 1)
    }
  }

  const makeCall = (phoneNumber) => {
    if (!phoneNumber) {
      console.warn('No phone number provided');
      return;
    }

    let dialNumber = '';
    if (Platform.OS === 'android') {
      dialNumber = `tel:${phoneNumber}`;
    } else {
      dialNumber = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(dialNumber).catch((err) => console.error('Error opening dialer', err));
  };
  return (

    <StyledContainer>
      <StyledHomeBox>
        <BackButton backButtonStyle={styles.backButt}  navigatedPath={navigatedPath}/>
        <ScrollView style={{ height: hp(hp) }} showsVerticalScrollIndicator={false} >

          {/* Product Image */}
          <View className='flex justify-center'>
            {
              (product.status === ProductStatus.SOLD) && (
                <View className='absolute z-10 bg-slate-400 opacity-75 flex items-center justify-center' style={styles.image}>
                  <Text className="text-white text-3xl font-bold bg-red-600 px-4 py-2 rounded-lg">ขายแล้ว</Text>
                </View>
              )
            }
            <PostImage size={2} src={product.image} style={styles.image} />
          </View>

          {/* Price & Title */}
          <View className="flex flex-row">

              <View style={styles.detailsContainer} className="justify-start">
                <Text className='mt-1' style={styles.price}>฿{product.price > 1000 ? product.price.toLocaleString() : product.price}</Text>
                <Text className='mt-1' style={styles.title}>{product.title}</Text>
                <Text style={styles.condition}>{product.category}</Text>
              </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 10 }} className="absolute right-0">
              {likeStatus && (
                <Pressable onPress={toggleLikeStatus}>
                  {
                    (likeStatus.status === true) ? <AntDesign name="heart" size={24} color="red" /> :
                      <AntDesign name="hearto" size={24} color="silver" />
                  }
                </Pressable>)
              }
              <Text style={[{ marginLeft: 10 }, styles.text]}>{likesOfProduct}</Text>
            </View>
          </View>

          {/* Product Details */}
          <View style={styles.specsContainer}>
            <Text style={styles.title}>ProductDetail: </Text>
            <Text style={styles.content}>{product.content}</Text>
          </View>

          <Text style={[{ marginTop: 10 }, styles.text]}>ลงขายเมื่อ: {formattedDate}</Text>


          {/* Contact Buttons */}

          <View className='mt-5' style={styles.memberCard}>
            <ProfileImage size={hp(6)} src={product.user.profile}/>
            <Text className='mt-2' style={styles.memberId}>{product.userID}</Text>

            <Text style={styles.membershipDuration}>
              เป็นสมาชิกตั้งแต่ {format(new Date(product.user.createdAt), "dd MMMM yyyy", { locale: th })}
            </Text>

            <View style={styles.buttonContainer}>

              {myUser.id !== product.userID && (
                // <Pressable style={styles.chatButton} onPress={checkUserChatWithFriendID}>
                //   <Entypo name="chat" size={hp(2)} color={theme.colors.kuBGColor} />
                //   <Text style={styles.chatText}> แชท</Text>
                // </Pressable>
                
                <Button 
                  icon={<Entypo name="chat" size={hp(2)} color={theme.colors.kuBGColor} />} 
                  buttonStyle = {styles.chatButton} 
                  title = {' แชท'}  
                  loading = {loading} 
                  onPress={checkUserChatWithFriendID}
                  textStyle = {styles.chatText}/>
                )
              }

              {myUser.id !== product.userID && (
                <Pressable style={styles.callButton} onPress={() => makeCall(product.user.phone)}>
                  <Icon name="call"  size ={hp(2)} color={theme.colors.darkLight} />
                  <Text style={styles.callText}> โทร</Text>
                </Pressable>
              )
              }
            </View>
          </View>
        </ScrollView>
      </StyledHomeBox>
    </StyledContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: hp(40),
    height: (hp(50)) * 0.6,
    borderRadius: theme.radius.xl,
    resizeMode: "cover" // OR use "cover"
  },
  detailsContainer: {
    paddingVertical: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: theme.fonts.bold as TextStyle['fontWeight'],
    color: "#222",
  },
  title: {
    fontSize: 20,
    fontWeight: theme.fonts.extraBold as TextStyle['fontWeight'],
    marginBottom: 5,
  },
  backButt: {
    // marginLeft: hp(1)
  },
  condition: {
    fontSize: 16,
    color: "#888",
  },
  specsContainer: {
    marginBottom: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  content: {
    fontSize: 20,
    color: "#333", // Optional: Adjust text color

  },
  specRow: {
    height: hp(5),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  quickActionBtn: {
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 8,
    marginVertical: 5,
    flex: 1,
    marginHorizontal: 2,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  chatButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.kuBGColor,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 5,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'white',
  },
  productDescription: {
    fontSize: 16,
    color: theme.colors.textDark,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
  },
  memberCard: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  memberId: {
    fontSize: 16,
    color: '#4F4F4F',
    marginBottom: 5,
  },
  chatText: {
    color: theme.colors.kuBGColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  callButton: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.kuBGColor,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'center'
  },
  callText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  membershipDuration: {
    fontSize: 16,
    color: '#828282',
  }
});

export default ProductDetail
