import { ScrollView, TextInput, View , Text, StyleSheet} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useEffect, useState } from "react";
import { fetchFavoriteProducts } from "../../store/thunks/productsThunk";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import Header from "../../components/Header";
import ProductReusable from "../../components/ProductReusable";
import { Product } from "../../API";
import AntDesign from '@expo/vector-icons/AntDesign';
import { hp, wp } from "../../helpers/common";

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
                <Header title = "รายการโปรด"showBackButton={false}></Header>    
            </View>
            <StyledHomeBox>
                <TextInput
                    placeholder="ค้นหาสินค้า..."
                    value={term}
                    onChangeText={(value) => setTerm(value)}
                    className="bg-gray-100 rounded-full px-4 h-12 mb-4 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300 w-full"
                    placeholderTextColor="#555"
                />
                <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 7, gap: hp(1)}} className="w-full flex-grow" showsVerticalScrollIndicator={false}>
                    {filteredMyFavoriteProducts.length > 0 ? (
                        filteredMyFavoriteProducts.map((product, index) => (
                            <View key={index} style={{ width: hp(20), height: wp(60), marginBottom: hp(5)}}>

                                <ProductReusable key={index} product={product} navigatedPath={"MyFavoriteProducts"} />
                            </View>
                        ))
                    ) : (
                            <View style = {styles.containertext}>
                                <AntDesign name="heart" size={24} color="grey" className=""/>
                                <Text className="text-2xl text-center text-gray-400 mt-4">แตะไอคอนรูปหัวใจ</Text>
                                <Text className="text-2xl text-center text-gray-400 ">เพื่อบันทึกสินค้าลงในรายการโปรดของคุณ</Text>
                            </View>
                    )}
                </ScrollView>
            </StyledHomeBox>
            
        </StyledContainer>
    )
}

const styles = StyleSheet.create({
    containertext:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 7,
        gap: hp(1),
        justifyContent: 'center',  // This will center the content horizontally
        alignItems: 'center',      // This will center the content vertically
        flexGrow: 1,          
    }
})

export default MyFavoriteProducts;