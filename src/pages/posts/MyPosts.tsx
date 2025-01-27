import { Text, View, Image, ScrollView } from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useEffect } from "react";
import { fetchMyPosts } from "../../store/thunks/postsThunk";
import PostReusable from "../../components/PostReusable";

function MyPosts() {
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


    return (
            <StyledContainer>
                <StyledHomeBox>
                    {myPosts.map((post, index) => (
                        <PostReusable key={index} post={post} />
                    ))}
                </StyledHomeBox>
            </StyledContainer>
    )
}



export default MyPosts;