import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, TextStyle, KeyboardAvoidingView } from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import { Chat, Message, ProductStatus } from "../../API";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMesage, fetchMessage } from "../../store/thunks/messagesThunk";
import { useAppDispatch, useAppSelector } from "../../hook";
import ProfileImage from "../../components/ProfileImage";
import React, { useRef } from 'react';
import { format } from "date-fns";
import { generateClient } from "@aws-amplify/api";
import { onCreateMessage } from "../../graphql/subscriptions";
import { Subscription } from "rxjs";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { pickImage } from "../../components/pickImage";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { decode } from "base64-arraybuffer";
import { uploadImgToS3 } from "../../store/thunks/imageThunk";
import MessageImage from "../../components/MessageImage";
import ScreenWrapper from "../../components/ScreenWrapper";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Platform } from "react-native";
import Icon from "../../../assets/icons";
import Button from "../../components/Button";
import { fetchAllChats, fetchProductWithinChat, removeProductWithinChat } from "../../store/thunks/chatsThunk";
import PostImage from "../../components/PostImage";
import { changeToSoldProductStatus } from "../../store/thunks/productsThunk";

function ChatPage({ route }) {
    const { chat }: { chat: Chat } = route.params  
    const messages = useAppSelector(state => state.messages.data || [])
    const [newMessage, setNewMessage] = useState("")
    const sortedMessages = [...messages].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    const [selectedImg , setSelectedImg] = useState<ImagePicker.ImagePickerAsset>()
    const [subNewMessage , setSubNewMessage] = useState<Message>()
    const myUser = useAppSelector(state => state.users.myUser)
    let productWithinChat = useAppSelector(state => state.chats.productWithinChat || null)
    const [isVisible, setIsVisible] = useState(false);
    if(!chat.ProductID){
        productWithinChat = null
    }
    const dispatch = useAppDispatch()
    const client = generateClient()
    const [message, setMessage] = useState("");
    let subOncreate : Subscription

    useEffect(() => {
        dispatch(fetchAllChats())
        console.log("fetchAllChats");
        
    },[])



    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchMessage(chat.id))
        }
        fetch()
    }, [chat, subNewMessage])

    const sentMessage = async () => {
        if(selectedImg){
            const filename = `public/messages/${selectedImg.fileName}` + '.png';
            const fileBase64 = await FileSystem.readAsStringAsync(selectedImg.uri, {
                    encoding: FileSystem.EncodingType.Base64
                })
            let imageData = decode(fileBase64)
            await dispatch(addMesage({
                chatID: chat.id,
                messageContent: "img",
                imgPath: filename
            }))
            await dispatch(uploadImgToS3({ filenamePath: filename, data: imageData }))
            setSelectedImg(null)
        }
        else{
            await dispatch(addMesage({
                chatID: chat.id,
                messageContent: newMessage
            }))
        }
        await dispatch(fetchMessage(chat.id))
        setNewMessage("")
    }

    function setUpMessageSubscription() {
        subOncreate = client.graphql({
            query: onCreateMessage
        }).subscribe({
            next: ({data}) =>{
                const messageData = data.onCreateMessage as Message
                setSubNewMessage(messageData)
            }
        })
    }

    useEffect(() => {
        setUpMessageSubscription();
        return () => {
            subOncreate.unsubscribe();
        }
    })

    const changeProductStatus =  async () => {
        await dispatch(changeToSoldProductStatus({
            productID: productWithinChat.id,
            buyerID: chat.userID !== myUser.id ? chat.userID : chat.userID2
        }))
        //await dispatch(removeProductWithinChat(chat.id))
        await dispatch(fetchProductWithinChat(chat.ProductID))
    }

    const selectImage = async () => {
        const image = await pickImage()
        setSelectedImg(image)
    }

    const scrollViewRef = useRef(null);

    const handleButtonPress = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    };

    useEffect(() => {
            const fetch = async () => {
                await dispatch(fetchProductWithinChat(chat.ProductID));
            };
            fetch();
            console.log("fetchProductWithinChat");
            
    },[chat])

    useEffect(() => {
            const fetch = async () => {
                await dispatch(fetchProductWithinChat(chat.ProductID));
            };
            fetch();
            console.log("fetchProductWithinChat");
    },[])

    useEffect(() => {
        if (productWithinChat?.status === ProductStatus.AVAILABLE) {
          setIsVisible(true); // Set to true if status is AVAILABLE
        } else {
          setIsVisible(false); // Set to false otherwise
        }
      }, [productWithinChat?.status]); // Trigger effect when status changes

    const renderedMesssages = sortedMessages.map((message, index) => {
        const hr = format(new Date(message.createdAt), 'hh:mm a');
        const date = format(new Date(message.createdAt), 'dd/MM/yyyy');

        return ( <View key={index} >
                    {
                        message.userID === myUser.id ?

                        <View style={styles.chatBubbleSender}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <ProfileImage size={30} src={myUser.profile} isChatPage={true}></ProfileImage>
                                <Text style={{marginLeft: 10, color: 'white'}}>{myUser.id}</Text>
                                <Text style={{marginLeft: 10, color: 'white'}}>{date}</Text>
                            </View>
                            <Text style={styles.chatText}>
                                {
                                    (message.image) ? <MessageImage size={150} src={message.image}></MessageImage> :
                                    <Text style={{color: 'white', marginTop: 10,marginBottom: 10}}>{message.content}</Text>
                                }
                            </Text>
                            <Text style={{color: 'white'}}>{hr}</Text>
                        </View>
                    :
                        <View style={styles.chatBubbleReceiver}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <ProfileImage size={30} src={message.userID === chat.userID ? chat.user.profile : chat.user2.profile} isChatPage={true}></ProfileImage>
                                <Text style={{marginLeft: 10, color: 'black'}}>{message.userID}</Text>
                                <Text style={{marginLeft: 10, color: 'black'}}>{date}</Text>
                            </View>
                            <Text style={styles.chatTextSender}>
                              {
                                  (message.image) ? <MessageImage size={150} src={message.image}></MessageImage> :
                                  <Text style={{color: 'black',marginTop: 10,marginBottom: 10}}>{message.content}</Text>
                              }
                            </Text>
                          <Text style={{color: 'black'}}>{hr}</Text>
                        </View>
                }                   
            </View>
        )
    })

    return (
        <ScreenWrapper bg ={theme.colors.kuColor}>
            <View style={{ flex: 1, marginLeft : 10, marginRight: 10}}>

                    <View className="flex flex-row items-center pb-4">
                        <ProfileImage size={40} src={myUser.id === chat.userID ? chat.user2.profile : chat.user.profile} isChatPage={true}></ProfileImage>
                        <Text style={styles.title}>{myUser.id === chat.userID ? chat.userID2 : chat.userID}</Text>
                    </View>
                    {/* {
                        productWithinChat && (
                            <View className="flex flex-row bg-white p-2 rounded-lg">
                                <PostImage size={10} src={productWithinChat.image} style={{width: 50}}></PostImage>
                                <View className="ml-4 mt-2">
                                    <Text className="text-l">สินค้า : {productWithinChat.title}</Text>
                                    <Text className="text-l">ราคา : {productWithinChat.price} ฿</Text>
                                    <Text className="text-l">หมวดหมู่ : {productWithinChat.category}</Text>
                                </View>
                                {
                                    ((productWithinChat.userID === myUser.id) && (productWithinChat.status === ProductStatus.AVAILABLE)) && (
                                        <TouchableOpacity onPress={changeProductStatus} className="bg-blue-600 flex justify-center p-4 rounded-lg right-0 absolute m-4">
                                            <Text className="text-white">กดเพื่อขาย</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        )
                    } */}

                    <View>
                         <TouchableOpacity 
                           onPress={() => setIsVisible(!isVisible)} 
                           className="flex flex-row items-center bg-white p-2 rounded-lg"
                         >
                           <Text className="text-lg font-semibold">แสดงสินค้า</Text>
                           {isVisible ? (
                            <View className="absolute right-4"><Icon name = "arrowUp" strokeWidth= {2.5} size = {26} color = {theme.colors.text}></Icon></View>
                             
                           ) : (
                            <View className="absolute right-4"><Icon name = "arrowDown" strokeWidth= {2.5} size = {26} color = {theme.colors.text}></Icon></View>
                           )}
                         </TouchableOpacity>
                       
                         {isVisible && productWithinChat && (
                           <View className="flex flex-row bg-white p-2 rounded-lg mt-2">
                             <PostImage size={10} src={productWithinChat.image} style={{ width: 50 }} />
                             <View className="ml-4 mt-2">
                               <Text className="text-l">สินค้า : {productWithinChat.title}</Text>
                               <Text className="text-l">ราคา : {productWithinChat.price} ฿</Text>
                               <Text className="text-l">หมวดหมู่ : {productWithinChat.category}</Text>
                               <Text className="text-l"
                                        style={{
                                          color: productWithinChat.status === ProductStatus.SOLD ? 'red' : 'green', // Red if SOLD, default text color if AVAILABLE
                                        }}>
                                            สถานะ : {productWithinChat.status === ProductStatus.SOLD ? 'ขายแล้ว' : 'มีอยู่'}
                                </Text>
                             </View>
                             {(productWithinChat.userID === myUser.id && productWithinChat.status === ProductStatus.AVAILABLE) && (
                               <TouchableOpacity 
                                 onPress={changeProductStatus} 
                                 className="bg-blue-600 flex justify-center p-4 rounded-lg right-0 absolute m-4"
                               >
                                 <Text className="text-white">ขายแล้ว</Text>
                               </TouchableOpacity>
                             )}
                           </View>
                         )}
                       </View>
                    <ScrollView contentContainerStyle={{}} showsVerticalScrollIndicator={false}>{renderedMesssages}</ScrollView>

                    <KeyboardAvoidingView
                        behavior={Platform.OS ==="ios" ? "padding" : undefined}
                        keyboardVerticalOffset={50}>

                        <View style={styles.chatboxContainer}>
                            
                            <View style={styles.leftIcons}>
                                <TouchableOpacity onPress={selectImage}>
                                    <Ionicons name="image-outline" size={26} color="#007AFF" />
                                </TouchableOpacity>
                            </View>
                    
                            <View style={styles.chatInputContainer}>
                                    {selectedImg ? (
                                        <>
                                            <Image 
                                                source={{ uri: selectedImg.uri }} 
                                                style={{ width: 200, height: 100, borderRadius: 10 }} 
                                            />
                                            <TouchableOpacity onPress={() => setSelectedImg(null)} style={styles.removeButton}>
                                                    <Icon name="delete" size={33} color="red" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={sentMessage} style={styles.sendButtonforImage}>
                                                <Icon name="send" size={24} color={theme.colors.kuColor} />
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <>
                                            <TextInput
                                                style={styles.chatInput}
                                                placeholder="Aa"
                                                placeholderTextColor="#ccc"
                                                value={newMessage}
                                                onChangeText={(value) => setNewMessage(value)}
                                                onPress={handleButtonPress}
                                            />
                                            {(newMessage.trim().length > 0 || selectedImg) && (
                                                <TouchableOpacity onPress={sentMessage} style={styles.sendButton}>
                                                    <Icon name="send" size={15} color={theme.colors.kuColor} />
                                                </TouchableOpacity>
                                            )}
                                        </>
                                    )}
                            </View>


                        </View>
                    </KeyboardAvoidingView>
            </View>
             
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start", // Aligns content at the top
    },
    chatBubbleReceiver: {
        alignSelf: 'flex-start' as const,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        maxWidth: '80%',
    },
    chatBubbleSender: {
        alignSelf: 'flex-end' as const,
        backgroundColor: theme.colors.kuBGColor,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        maxWidth: '80%',
    },
    chatText: {
        fontSize: 14,
    },
    chatTextSender: {
        fontSize: 14,
        color: '#fff',
    },
    title:{
        marginLeft:10,
        fontSize:18,
        fontWeight: theme.fonts.semibold as TextStyle['fontWeight'],
    },
    homeBox: {
        backgroundColor: "#d5f0e8",
        width: "85%",
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        marginTop: 40,
        display: 'flex',
        alignItems: 'center'
    },
    timeText: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'right',
    },
    messageInputContainer: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        padding: 10,
        backgroundColor:'white'
    },
    messageInput: {
        backgroundColor: 'black',
        borderRadius: 10,
        width: 200
    },
    button: {
        backgroundColor: '#004c27',
        padding: 10,
        borderRadius: 10,
        marginLeft: 10
    },
    chatBubble: {
        width: 250,
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 20,
        padding: 10
    },
    inputContainer: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        padding: 10,
        backgroundColor:'black',
      },
      chatboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    leftIcons: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    chatInputContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff", // Dark input field
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: 10,
    },
    chatInput: {
        flex: 1,
        color: "black",
        fontSize: 16,
        padding: 5,
    },
    sendButton: {
        marginLeft: 8,
        backgroundColor: "#007AFF",
        padding: 6,
        borderRadius: 15,
    },
    sendButtonforImage:{
        marginLeft:'auto',
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 15,
    },
    removeButton: {
        marginLeft:"auto",
        borderRadius: 10,
        padding: 5,
    }
});

export default ChatPage;