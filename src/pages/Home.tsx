import { View, Text, TouchableOpacity, StyleSheet,ScrollView ,TextInput,TextStyle, Pressable, RefreshControl } from "react-native";
import KuShopTitle from "../components/KuShopTitle";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../hook";
import { fetchAllUsers, fetchMyUser } from "../store/thunks/userThunk";
import { StyledContainer, StyledHomeBox } from "../components/StyleContainer";
import {  fetchAllProducts } from "../store/thunks/productsThunk";
import PostReusable from "../components/ProductReusable";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import Icon from "../../assets/icons";
import ProductReusable from "../components/ProductReusable";
import ProductCategoryTab from "../components/ProductCategoryTab";
import Ionicons from '@expo/vector-icons/Ionicons';

function Home() {
    const [term ,setTerm] = useState("")
    const navigation = useNavigation();
    const dispatch = useAppDispatch()
    const [selectedCategory, setSelectedCategory] = useState("");
    const allProducts = useAppSelector(state => state.products.allProducts.data || [])
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    if(!allProducts) return;
    const filteredMyProducts = allProducts.filter((post) => post.title.toLowerCase().includes(term.toLowerCase()))
    const [refreshProfile, setRefreshProfile] = useState(false);
    // const allUsers = useAppSelector(state => state.users.allUsers)
    // console.log("fetchAllUsers :" , allUsers);
    
    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchAllProducts({category: null}))
            console.log("fetchAllProducts");
        }
        fetch()
        
        
    }, []);

    // useEffect(() => {
    //     const fetch = async () => {
    //         await dispatch(fetchAllUsers())
    //     }
    //     fetch()
    //     console.log("fetchAllUsers");
    // },[])

    const refreshProduct = () =>{
        dispatch(fetchAllProducts({category: selectedCategory}))
    }

    const refreshProfileImage = () => {
        setRefreshProfile(prev => !prev); // Toggle state to trigger re-render
    };

    const onRefresh = () => {
        setRefreshing(true);
        refreshProduct()
        refreshProfileImage()
        setTimeout(() => setRefreshing(false), 2000);
      };

    useEffect(() => {
        if(selectedCategory) {
        const fetch = async () => {
            await dispatch(fetchAllProducts({category: selectedCategory}))
        }
        
        fetch()
        }
    }, [selectedCategory]);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    };

    const backToAllProduct = async () => {
        await dispatch(fetchAllProducts({category: null}))
        setSelectedCategory(null)
    }

    return (
        <StyledContainer>
            <StyledHomeBox>
                {
                    selectedCategory && (
                        <Pressable  className="absolute left-4 top-4" onPress={backToAllProduct}>
                            <Icon name = "arrowLeft" strokeWidth= {2.5} color = {theme.colors.text}></Icon>
                        </Pressable>
                    )
                }
                
                <TextInput
                    placeholder="ค้นหาสินค้า ..."
                    value={term}
                    onChangeText={(value) => setTerm(value)}
                    className="bg-gray-100 rounded-full px-4 h-12 mt-10 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300 w-full mb-4"
                    placeholderTextColor="#555"
                />
                <ProductCategoryTab onSelectCategory={handleCategorySelect}></ProductCategoryTab>
                <ScrollView  contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 7, gap: hp(1),justifyContent: 'flex-start',paddingBottom:hp(7)}}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    className="w-full flex-grow mt-4" 
                    showsVerticalScrollIndicator={false}>
                    {filteredMyProducts.map((product, index) => (
                        <View key={index} style={{ width: hp(20), height: wp(55), marginBottom: hp(5) }}>
                            <ProductReusable key={index} product={product} />
                        </View>
                    ))}
                </ScrollView>                        
            </StyledHomeBox>
        </StyledContainer>
    );
}

const styles = StyleSheet.create({
   
});

export default Home;