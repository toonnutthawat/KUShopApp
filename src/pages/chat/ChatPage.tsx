import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard  } from "react-native";
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
import Icon from 'react-native-vector-icons/FontAwesome';

function ChatPage({ route }) {
    const { chat }: { chat: Chat } = route.params
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
            <View key={index} className={`p-4 rounded-2xl w-full mt-2 flex items-left ${message.userID === myUser.id ? 'bg-green-600' : 'bg-white'}`}>
                {
                    message.userID === myUser.id ?
                        <View>
                            <View className="flex-1 flex-row">
                                <ProfileImage size={20} ></ProfileImage>
                                <Text className="ml-2 color-white font-bold mt-1">{myUser.id}</Text>
                                <Text className="ml-2 color-white mt-1">{date}</Text>
                            </View>
                            <Text className="mt-2 mb-2 color-white">{message.content}</Text>
                            <Text style={{color: 'white'}}>{hr}</Text>
                        </View> :
                        <View>
                            <View className="flex-1 flex-row">
                                <ProfileImage size={20} ></ProfileImage>
                                <Text className="ml-2 font-bold mt-1">{message.userID}</Text>
                                <Text className="ml-2 mt-1">{date}</Text>
                            </View>
                            <Text className="mt-2 mb-2">{message.content}</Text>
                            <Text>{hr}</Text>
                        </View>
                }
            </View>
        )
    })

    return (
        <StyledContainer>
            <StyledHomeBox>
                <ScrollView className="w-full flex-grow" showsVerticalScrollIndicator={false}>
                    <View>
                        {renderedMesssages}
                    </View>
                </ScrollView>
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
                <View className="flex-row items-center w-full bg-gray-100 rounded-xl border border-gray-300 focus-within:border-blue-500 focus-within:ring focus-within:ring-green-300 px-2 mt-2">
                    <TextInput
                        value={newMessage}
                        onChangeText={(value) => setNewMessage(value)}
                        placeholder="Type your message"
                        className="flex-1 h-14 px-4 bg-transparent"
                    />
                    <TouchableOpacity onPress={sentMessage} className="bg-blue-500 px-4 py-2 rounded-lg ml-2">
                        <Icon name="paper-plane" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
            </StyledHomeBox>
        </StyledContainer>
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