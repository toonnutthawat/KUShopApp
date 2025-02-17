import { Text, View, TextInput,ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useEffect, useState } from "react";
import { fetchMyPosts } from "../../store/thunks/postsThunk";
import PostReusable from "../../components/PostReusable";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";

function MyPosts() {
    const myPosts = useAppSelector(state => state.posts.myPosts.data || []);
    const [term, setTerm] = useState("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchMyPosts());
        };
        fetch();
    }, []);

    const filteredMyPosts = myPosts.filter((post) =>
        post.title.toLowerCase().includes(term.toLowerCase())
    );

    return (
        
        <StyledContainer>
            <StyledHomeBox>
                <Text className="text-2xl font-semibold text-black text-center mb-4">My Posts</Text>
                <TextInput
                    placeholder="Search title"
                    value={term}
                    onChangeText={(value) => setTerm(value)}
                    className="bg-gray-100 rounded-full px-4 h-12 mb-4 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300 w-full"
                    placeholderTextColor="#555"
                />
                <ScrollView className="w-full flex-grow" showsVerticalScrollIndicator={false}>
                    {filteredMyPosts.length > 0 ? (
                        filteredMyPosts.map((post, index) => (
                            <PostReusable key={index} post={post} isMyPosts={true} />
                        ))
                    ) : (
                        <Text className="text-center text-gray-400 mt-4">No posts found</Text>
                    )}
                </ScrollView>
             </StyledHomeBox>
        </StyledContainer>
    );
}

export default MyPosts;
