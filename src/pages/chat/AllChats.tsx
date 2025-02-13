import { View , Text, StyleSheet, Pressable} from "react-native";
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
        <Pressable key={index} onPress={() => navigation.navigate("ChatPage", {chat})}>
        <View style={styles.chatsContainer}>
            <View style={{marginRight: 10}}>
                <ProfileImage size={20}></ProfileImage>
            </View>
            {
                (myUser.id !== chat.userID) ? <Text>{chat.userID}</Text> :
                <Text>{chat.userID2}</Text>
            }
            <Ionicons name="chatbox-ellipses" size={24} color="#004c27" style={{right: 10, position: 'absolute'}} />
        </View>
        </Pressable>
        )
    })
    return(
        <StyledContainer>
            <StyledHomeBox>
                <View style={{position: 'relative'}}>
                    {renderedAllChats}
                </View>
            </StyledHomeBox>
        </StyledContainer>
    )
}

const styles = StyleSheet.create({
    chatsContainer : {
        display: 'flex',
        flexDirection: 'row', 
        backgroundColor:'white',
        padding: 20,
        width: 300,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10
    }
})

export default AllChats;