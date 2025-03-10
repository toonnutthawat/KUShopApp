import { View , Text, StyleSheet, Pressable, TextStyle} from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import ProfileImage from "../../components/ProfileImage";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { fetchAllChats } from "../../store/thunks/chatsThunk";
import { fetchMyUser } from "../../store/thunks/userThunk";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { Chat } from "../../API";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import Header from "../../components/Header";
import { theme } from "../../constants/theme";

type RootStackParamList = {
    ChatPage: {chat: Chat}
}

type ChatResuableNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChatPage'>

function AllChats(){
    const dispatch = useAppDispatch()
    const allChats = useAppSelector(state => state.chats.allChats)
    const myUser = useAppSelector(state => state.users.myUser)
    const navigation = useNavigation<ChatResuableNavigationProp>()
    //console.log("allChats: ", allChats);

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchAllChats())
            await dispatch(fetchMyUser())
        }
        fetch()
        console.log("fetchAllChats");
    },[])




    if(!allChats) return;
    const renderedAllChats = allChats.map((chat,index) => {
        return (
        // <Pressable key={index} onPress={() => navigation.navigate("ChatPage", {chat})} className="w-64">
        // <View style = {styles.container}>
        //     <View className="mr-3">
        //         {
        //             (myUser.id !== chat.userID) ? <ProfileImage size={40} src={chat.user.profile}></ProfileImage> : <ProfileImage size={40} src={chat.user2.profile}></ProfileImage>
        //         }
                
        //     </View>
        //     {
        //         (myUser.id !== chat.userID) ? <Text>{chat.userID}</Text> :
        //         <Text>{chat.userID2}</Text>
        //     }
        //     <Ionicons name="chatbox-ellipses" size={24} color="#004c27" style={{right: 10, position: 'absolute'}} />
        // </View>
        // </Pressable>
        <Pressable key={index} onPress={() => navigation.navigate("ChatPage", { chat })} className="w-64">
          <View className="flex-row items-center p-2 bg-white rounded-lg mt-4">
            {/* Profile Image */} 
            <View className="mr-3">
              {myUser.id !== chat.userID ? (
                <ProfileImage size={40} src={chat.user.profile} />
              ) : (
                <ProfileImage size={40} src={chat.user2.profile} />
              )}
            </View>
          
            {/* Text beside profile image */}
            <Text style={styles.text}>{myUser.id !== chat.userID ? chat.userID : chat.userID2}</Text>
          
            {/* Icon on the far right */}
            <Ionicons name="chatbox-ellipses" size={24} color="#004c27" />
          </View>
        </Pressable>
        )
    })
    return(
        <StyledContainer>
            <Header title="ข้อความ" showBackButton={false}></Header>
                <View style={styles.chatsContainer}>
                    {renderedAllChats}
                </View>
            
        </StyledContainer>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 10,
        elevation: 3, // For Android shadow
        borderColor: 'grey', // Set your desired border color here
        borderWidth: 1, // Set the desired border width
    },
    chatsContainer : {
        display: 'flex',
        borderRadius: 10,
        alignItems: "center",
    },
    text:{
        fontSize: 18,
        fontWeight: theme.fonts.semibold as TextStyle['fontWeight'],
        flex: 1
    }
})

export default AllChats;