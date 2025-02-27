import { ScrollView, TextInput, View , Text} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useEffect, useState } from "react";
import { fetchFavoriteProducts } from "../../store/thunks/productsThunk";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import Header from "../../components/Header";
import ProductReusable from "../../components/ProductReusable";
import { Product } from "../../API";
import AntDesign from '@expo/vector-icons/AntDesign';

function MyFavoriteProducts(){
    const dispatch = useAppDispatch()
    const [term , setTerm] = useState("")
    const favoriteProductsList = useAppSelector(state => state.products.myFavoriteProducts.data)
    console.log("favoriteProductLists : ", favoriteProductsList);

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchFavoriteProducts())
        }
        fetch()
    },[])

    if(!favoriteProductsList) return;
    const filteredMyFavoriteProducts = favoriteProductsList.filter((product) =>
        product.title.toLowerCase().includes(term.toLowerCase())
    );


    return(
        <StyledContainer>
            <View className="flex flex-row items-center">
                <AntDesign name="heart" size={24} color="red" className="mr-4"/>
                <Header title = "Favorite Products"showBackButton={false}></Header>    
            </View>
            <StyledHomeBox>
                <TextInput
                    placeholder="Search title"
                    value={term}
                    onChangeText={(value) => setTerm(value)}
                    className="bg-gray-100 rounded-full px-4 h-12 mb-4 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300 w-full"
                    placeholderTextColor="#555"
                />
                <ScrollView className="w-full flex-grow" showsVerticalScrollIndicator={false}>
                    {filteredMyFavoriteProducts.length > 0 ? (
                        filteredMyFavoriteProducts.map((product, index) => (
                            <ProductReusable key={index} product={product} />
                        ))
                    ) : (
                        <Text className="text-center text-gray-400 mt-4">No posts found</Text>
                    )}
                </ScrollView>
            </StyledHomeBox>
            
        </StyledContainer>
    )
}

export default MyFavoriteProducts;