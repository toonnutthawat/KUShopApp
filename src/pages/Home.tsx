import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import KuShopTitle from "../components/KuShopTitle";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../hook";
import { fetchMyUser } from "../store/thunks/userThunk";
import { StyledContainer, StyledHomeBox } from "../components/StyleContainer";
import { fetchAllPosts } from "../store/thunks/postsThunk";
import PostReusable from "../components/PostReusable";

function Home() {
    const [user, setUser] = useState("");
    const [term ,setTerm] = useState("")
    const navigation = useNavigation();
    const dispatch = useAppDispatch()
    const allPosts = useAppSelector(state => state.posts.allPosts.data)

    const filteredMyPosts = allPosts.filter((post) => post.title.toLowerCase().includes(term.toLowerCase()))

    const getUserInfo = async () => {
        const response = await getCurrentUser();
        setUser(response.username);
    };

    useEffect(() => {
        getUserInfo();
        dispatch(fetchMyUser())
        dispatch(fetchAllPosts())
    }, []);

    return (
        <StyledContainer>
            {/* <Text style={styles.username}>Welcome, {user}!</Text> */}

            {/* HomeBox Component */}
            <StyledHomeBox>
                <KuShopTitle title="Welcome !" />
                <View>
                    <TextInput
                        placeholder="search title"
                        value={term}
                        onChangeText={(value) => setTerm(value)}
                        style={{ backgroundColor: 'white', width: 300, borderRadius: 20 }}
                    >
                    </TextInput>
                </View>
                {allPosts && filteredMyPosts.map((post, index) => (
                    <PostReusable key={index} post={post} />
                ))}
            </StyledHomeBox>

        </StyledContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#004d26",
        alignItems: "center",
        justifyContent: "flex-start", // Aligns content at the top
    },
    username: {
        fontSize: 20,
        color: "white",
        marginVertical: 20,
        textAlign: "center",
    },
    homeBox: {
        backgroundColor: "#d5f0e8",
        width: "85%",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20,
    },
    homeBoxTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#004d26",
        marginBottom: 10,
        textAlign: "center"
    },
    homeBoxContent: {
        fontSize: 16,
        color: "#555",
        textAlign: "center"
    },
    logoutButton: {
        backgroundColor: "red",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    logoutButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Home;