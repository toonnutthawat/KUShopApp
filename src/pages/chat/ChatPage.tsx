import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import { Chat, Message } from "../../API";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMesage, fetchMessage } from "../../store/thunks/messagesThunk";
import { useAppDispatch, useAppSelector } from "../../hook";
import ProfileImage from "../../components/ProfileImage";
import React from "react";
import { format } from "date-fns";
import { generateClient } from "@aws-amplify/api";
import { onCreateMessage } from "../../graphql/subscriptions";
import { Subscription } from "rxjs";

function ChatPage({ route }) {
    const { chat }: { chat: Chat } = route.params
    console.log(chat);
    
    const messages = useAppSelector(state => state.messages.data || [])
    const [newMessage, setNewMessage] = useState("")
    const sortedMessages = [...messages].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    const [subNewMessage , setSubNewMessage] = useState<Message>()
    const myUser = useAppSelector(state => state.users.myUser)
    const dispatch = useAppDispatch()
    const client = generateClient()
    let subOncreate : Subscription


    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchMessage(chat.id))
        }
        fetch()
    }, [chat, subNewMessage])

    const sentMessage = async () => {
        await dispatch(addMesage({
            chatID: chat.id,
            messageContent: newMessage
        }))
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

    const renderedMesssages = sortedMessages.map((message, index) => {
        const hr = format(new Date(message.createdAt), 'hh:mm a');
        const date = format(new Date(message.createdAt), 'dd/MM/yyyy');
        return (
            <View key={index} style={[{backgroundColor: message.userID === myUser.id ? '#00974e' : 'white'},styles.chatBubble]}>
                {
                    message.userID === myUser.id ?
                        <View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <ProfileImage size={30} src={myUser.profile}></ProfileImage>
                                <Text style={{marginLeft: 10, color: 'white'}}>{myUser.id}</Text>
                                <Text style={{marginLeft: 10, color: 'white'}}>{date}</Text>
                            </View>
                            <Text style={{color: 'white', marginTop: 10,marginBottom: 10}}>{message.content}</Text>
                            <Text style={{color: 'white'}}>{hr}</Text>
                        </View> :
                        <View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <ProfileImage size={30} src={message.userID === chat.userID ? chat.user.profile : chat.user2.profile}></ProfileImage>
                                <Text style={{marginLeft: 10}}>{message.userID}</Text>
                                <Text style={{marginLeft: 10}}>{date}</Text>
                            </View>
                            <Text style={{ marginTop: 10,marginBottom: 10}}>{message.content}</Text>
                            <Text>{hr}</Text>
                        </View>
                }
            </View>
        )
    })

    return (
        <View style={styles.container}>
            <View style={styles.homeBox}>
                <View className="flex flex-row items-center pb-4">
                    <ProfileImage size={36} src={myUser.id === chat.userID ? chat.user2.profile : chat.user.profile}></ProfileImage>
                    <Text className="ml-2">{myUser.id === chat.userID ? chat.userID2 : chat.userID}</Text>
                </View>
                <ScrollView>
                    <View style={{ display: 'flex', alignItems: 'center' }}>
                        {renderedMesssages}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.messageInputContainer}>
                <TextInput
                    value={newMessage}
                    onChangeText={(value) => setNewMessage(value)}
                    placeholder="type your message"
                    style={styles.messageInput} />
                <TouchableOpacity style={styles.button} onPress={sentMessage}><Text style={{ color: 'white' }}>sent</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#004d26",
        alignItems: "center",
        justifyContent: "flex-start", // Aligns content at the top
    },
    homeBox: {
        backgroundColor: "#d5f0e8",
        width: "85%",
        height: "80%",
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginBottom: 20,
        marginTop: 40,
        display: 'flex',
        alignItems: 'center'
    },
    messageInputContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#00984e',
        padding: 10,
        borderRadius: 5,
        width: 300,
        flexDirection: 'row',
        height: '10%'
    },
    messageInput: {
        backgroundColor: 'white',
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
        width: 200,
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 20,
        padding: 10
    }
});

export default ChatPage;