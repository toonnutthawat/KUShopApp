import { Text, View , Image, ScrollView} from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useEffect } from "react";
import { fetchMyPosts } from "../../store/thunks/postsThunk";
import AntDesign from '@expo/vector-icons/AntDesign';
import ProfileImage from "../../components/ProfileImage";

function MyPosts(){
    const myPosts = useAppSelector(state => state.posts.myPosts.data || [])
    console.log("myPosts: ", myPosts)
    const dispatch = useAppDispatch()

    useEffect(() => {
        //dispatch(fetchMyPosts())
        const fetch = async () => {
            await dispatch(fetchMyPosts())
        }
        fetch()
    }, [])

    const renderedMyPosts = myPosts.map((post, index) => {
        return (
            <View key={index} style={{marginTop: 20}}>
                <Image source={require("../../../assets/defaultPostImg.png")} />
                <Text style={{marginTop: 5}}>title : {post.title}</Text>
                <Text style={{marginTop: 5}}>content : {post.content}</Text>
                <View style={{display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 5}}>
                    <AntDesign name="like1" size={24} color="#004c27" />
                    <Text style={{marginLeft: 10}}>{post.likes}</Text>
                </View>
                <View style={{display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 5}}>
                    <ProfileImage size={20}></ProfileImage>
                    <Text style={{marginLeft: 10}}>{post.userID}</Text>
                </View>
            </View>
        )
    })
    
    return(
        <ScrollView>
        <StyledContainer>
            <StyledHomeBox>
                {renderedMyPosts}
            </StyledHomeBox>
        </StyledContainer>
        </ScrollView>
    )
}



export default MyPosts;