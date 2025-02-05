import { Text, View, TextInput } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useEffect, useState } from "react";
import { fetchMyPosts } from "../../store/thunks/postsThunk";
import PostReusable from "../../components/PostReusable";

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
        <View className="flex-1 bg-kuBGColor p-4 pt-10 items-center">
            <View className="w-full max-w-md bg-kuColor rounded-2xl p-6 shadow-lg">
                <Text className="text-2xl font-semibold text-black text-center mb-4">My Posts</Text>

                <TextInput
                    placeholder="Search title"
                    value={term}
                    onChangeText={(value) => setTerm(value)}
                    className="bg-gray-100 rounded-full px-4 h-12 mb-4 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300 w-full"
                    placeholderTextColor="#555"
                />

                {filteredMyPosts.length > 0 ? (
                    filteredMyPosts.map((post, index) => (
                        <PostReusable key={index} post={post} isMyPosts={true} />
                    ))
                ) : (
                    <Text className="text-center text-gray-400 mt-4">No posts found</Text>
                )}
            </View>
        </View>
    );
}

export default MyPosts;
