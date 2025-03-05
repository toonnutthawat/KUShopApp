import { ScrollView, TextInput, View , Text} from "react-native";
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
                <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 7, gap: hp(1),justifyContent: 'center'}} className="w-full flex-grow" showsVerticalScrollIndicator={false}>
                    {filteredMyFavoriteProducts.length > 0 ? (
                        filteredMyFavoriteProducts.map((product, index) => (
                            <View key={index} style={{ width: hp(34), height: wp(55), marginBottom: hp(5)}}>
                                <ProductReusable key={index} product={product} />
                            </View>
                        ))
                    ) : (
                        <Text className="text-center text-gray-400 mt-4">ไม่พบรายการ...</Text>
                    )}
                </ScrollView>
            </StyledHomeBox>
            
        </StyledContainer>
    )
}

export default MyProductsPurchased;