import { ScrollView, TextInput, View , Text} from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { fetchMyProductsPurchased } from "../../store/thunks/productsThunk";
import Header from "../../components/Header";
import ProductReusable from "../../components/ProductReusable";

function MyProductsPurchased(){
    const dispatch = useAppDispatch()
    const [term , setTerm] = useState("")
    const myProductsPurchasedList = useAppSelector(state => state.products.myProductsPurchased.data || [])
    console.log("favoriteProductLists : ", myProductsPurchasedList);

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchMyProductsPurchased())
        }
        fetch()
    },[])

    if(!myProductsPurchasedList) return;

    const filteredMyFavoriteProducts = myProductsPurchasedList.filter((product) =>
        product.title.toLowerCase().includes(term.toLowerCase())
    );


    return(
        <StyledContainer>
            <View className="flex flex-row items-center">
                <Header title = "MyProductsPurchased"showBackButton={false}></Header>    
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

export default MyProductsPurchased;