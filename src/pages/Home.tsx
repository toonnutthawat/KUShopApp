import { View, Text, TouchableOpacity, StyleSheet,ScrollView ,TextInput,TextStyle } from "react-native";
import KuShopTitle from "../components/KuShopTitle";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../hook";
import { fetchMyUser } from "../store/thunks/userThunk";
import { StyledContainer, StyledHomeBox } from "../components/StyleContainer";
import {  fetchAllProducts } from "../store/thunks/productsThunk";
import PostReusable from "../components/ProductReusable";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import Icon from "../../assets/icons";
import ProductReusable from "../components/ProductReusable";

function Home() {
    const [term ,setTerm] = useState("")
    const navigation = useNavigation();
    const dispatch = useAppDispatch()
    const allProducts = useAppSelector(state => state.products.allProducts.data || [])
    

    if(!allProducts) return;
    const filteredMyProducts = allProducts.filter((post) => post.title.toLowerCase().includes(term.toLowerCase()))

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchAllProducts())
        }
        fetch()
    }, []);

    return (
        <StyledContainer>
            <StyledHomeBox>
                <MaterialIcons name="post-add" size={30} color="#004c27" className="absolute right-4 top-4" onPress={() => navigation.navigate("Post" as never)}/>
                <TextInput
                    placeholder="search title"
                    value={term}
                    onChangeText={(value) => setTerm(value)}
                    className="bg-gray-100 rounded-full px-4 h-12 mt-10 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300 w-full mb-4"
                    placeholderTextColor="#555"
                />
                <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', gap: hp(0.5)}} showsVerticalScrollIndicator={false}>
                    {filteredMyProducts.map((product, index) => (
                        <View key={index} style={{ width: hp(20), height: wp(55), marginBottom: hp(3.3)}}>
                            <ProductReusable key={index} product={product} />
                        </View>
                    ))}
                </ScrollView>                        

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
    welcomeText:{
        fontSize: hp(4),
        fontWeight: theme.fonts.bold as TextStyle['fontWeight'],
        color: theme.colors.text,
        }
});

export default Home;