import { ScrollView, TextInput, View , Text, StyleSheet} from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { fetchMyProductsPurchased } from "../../store/thunks/productsThunk";
import Header from "../../components/Header";
import ProductReusable from "../../components/ProductReusable";
import { hp, wp } from "../../helpers/common";

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
                <Header title = "ประวัติการซื้อของฉัน"showBackButton={false}></Header>    
            </View>
            <StyledHomeBox>
                <TextInput
                    placeholder="ค้นหาประวัติการซื้อของฉัน..."
                    value={term}
                    onChangeText={(value) => setTerm(value)}
                    className="bg-gray-100 rounded-full px-4 h-12 mb-4 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300 w-full"
                    placeholderTextColor="#555"
                />
                <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 7, gap: hp(1)}} className="w-full flex-grow" showsVerticalScrollIndicator={false}>
                    {filteredMyFavoriteProducts.length > 0 ? (
                        filteredMyFavoriteProducts.map((product, index) => (
                            <View key={index} style={{ width: hp(20), height: wp(60), marginBottom: hp(5)}}>
                                <ProductReusable key={index} product={product} />
                            </View>
                        ))
                    ) : (
                        <View style = {styles.containertext}>
                            <Text className="text-center text-gray-400 mt-4">ไม่พบรายการ...</Text>
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

export default MyProductsPurchased;