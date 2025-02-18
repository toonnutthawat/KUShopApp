import { Text, View, Image, ScrollView, TextInput } from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useEffect, useState } from "react";
import { fetchMyPosts } from "../../store/thunks/postsThunk";
import PostReusable from "../../components/PostReusable";

function MyPosts() {
    const myPosts = useAppSelector(state => state.posts.myPosts.data || [])
    const [term, setTerm] = useState("")
    const dispatch = useAppDispatch()

    useEffect(() => {
        //dispatch(fetchMyPosts())
        const fetch = async () => {
            await dispatch(fetchMyPosts())
        }
        fetch()
    }, [])

    const filteredMyPosts = myPosts.filter((post) => post.title.toLowerCase().includes(term.toLowerCase()))

    return (
            <StyledContainer>
                <StyledHomeBox>
                    <View>
                        <TextInput 
                            placeholder="search title"
                            value={term}
                            onChangeText={(value) => setTerm(value)}
                            style={{backgroundColor: 'white', width: 300, borderRadius: 20}}
                            >
                        </TextInput>
                    </View>
                    {filteredMyPosts.map((post, index) => (
                        <PostReusable key={index} post={post} isMyPosts={true} />
                    ))}
                </StyledHomeBox>
            </StyledContainer>
    )
}



export default MyPosts;