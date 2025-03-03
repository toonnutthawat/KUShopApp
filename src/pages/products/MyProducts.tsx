import { Text, View, TextInput,ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useEffect, useState } from "react";
import { fetchMyProducts } from "../../store/thunks/productsThunk";
import PostReusable from "../../components/ProductReusable";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import ProductReusable from "../../components/ProductReusable";
import { hp, wp } from "../../helpers/common";
import BackButton from "../../components/BackButton";

function MyProducts() {

    const myPosts = useAppSelector(state => state.products.myProducts.data || [])
    const [term, setTerm] = useState("")
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchMyProducts());
        };
        fetch();
    }, []);

    const filteredMyPosts = myPosts.filter((post) =>
        post.title.toLowerCase().includes(term.toLowerCase())
    );

    return (
        
        <StyledContainer>
            <StyledHomeBox>
                <Text className="text-2xl font-semibold text-black text-center mb-4">My Posts</Text>
                <TextInput
                    placeholder="Search title"
                    value={term}
                    onChangeText={(value) => setTerm(value)}
                    className="bg-gray-100 rounded-full px-4 h-12 mb-4 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300 w-full"
                    placeholderTextColor="#555"
                />
                <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 7, gap: hp(1),justifyContent: 'center'}} className="w-full flex-grow" showsVerticalScrollIndicator={false}>
                    {filteredMyPosts.length > 0 ? (
                        filteredMyPosts.map((product, index) => (
                            
                            <View key={index} style={{ width: hp(20), height: wp(60), marginBottom: hp(5)}}>
                                 <ProductReusable key={index} product={product} isMyPosts={true} />
                            </View>
                        ))
                    ) : (
                        <Text className="text-center text-gray-400 mt-4">No posts found</Text>
                    )}
                </ScrollView>
             </StyledHomeBox>
        </StyledContainer>
    );
}

export default MyProducts;
