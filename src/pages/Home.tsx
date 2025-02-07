import { View, Text, TextInput, ScrollView } from "react-native";
import KuShopTitle from "../components/KuShopTitle";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../hook";
import { fetchAllPosts } from "../store/thunks/postsThunk";
import PostReusable from "../components/PostReusable";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

function Home() {
    const [term, setTerm] = useState("");
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const allPosts = useAppSelector(state => state.posts.allPosts.data || []);

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchAllPosts());
        };
        fetch();
    }, []);

    const filteredMyPosts = allPosts.filter((post) => post.title.toLowerCase().includes(term.toLowerCase()));

    return (
        <View className="flex-1 bg-kuBGColor p-4 pt-10">
            <View className="w-full max-w-md bg-kuColor rounded-2xl p-6 flex-1">
                <KuShopTitle title="Welcome to KUShopApp!" />
                <TextInput
                    placeholder="Search title"
                    value={term}
                    onChangeText={setTerm}
                    className="bg-gray-100 rounded-full px-4 h-12 mb-4 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300 w-full"
                    placeholderTextColor="#555"
                />
                <ScrollView className="w-full flex-grow" showsVerticalScrollIndicator={false}>
                    {filteredMyPosts.map((post, index) => (
                        <PostReusable key={index} post={post} className="w-full"/>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

export default Home;