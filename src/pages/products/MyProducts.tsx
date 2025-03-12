import { Text, View, TextInput,ScrollView, TouchableOpacity ,StyleSheet} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useEffect, useState } from "react";
import { fetchMyProducts } from "../../store/thunks/productsThunk";
import PostReusable from "../../components/ProductReusable";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import ProductReusable from "../../components/ProductReusable";
import { hp, wp } from "../../helpers/common";
import { MaterialIcons } from "@expo/vector-icons"

function MyProducts() {

    const myPosts = useAppSelector(state => state.products.myProducts.data || [])
    const [term, setTerm] = useState("")
    const [productByStatus , setProductByStatus] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchMyProducts({isSold: false}));
        };
        fetch();
    }, []);

    const filteredMyPosts = myPosts.filter((post) =>
        post.title.toLowerCase().includes(term.toLowerCase())
    );

    // const changeProductByStatus = () => {
    //     setProductByStatus(!productByStatus)
    //     if(productByStatus){
    //         dispatch(fetchMyProducts({isSold: true}));
    //     }
    //     else{
    //         dispatch(fetchMyProducts({isSold: false}));
    //     }
    // }

    const changeProductByStatus = (status) => {
        setProductByStatus(status);
        dispatch(fetchMyProducts({ isSold: status }));
    };

    return (
        
        <StyledContainer>
            <StyledHomeBox>
                <Text className="text-2xl font-semibold text-black text-center mb-4">สินค้าของฉัน</Text>
                <TextInput
                    placeholder="ค้นหาสินค้าของฉัน..."
                    value={term}
                    onChangeText={(value) => setTerm(value)}
                    className="bg-gray-100 rounded-full px-4 h-12 mb-4 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300 w-full"
                    placeholderTextColor="#555"
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                    {/* ยังไม่ขาย */}
                    <TouchableOpacity
                        className={`flex-row items-center px-4 py-2 rounded-lg ${!productByStatus ? "bg-red-500" : "bg-gray-300"}`}
                        onPress={() => changeProductByStatus(false)}
                        style={[styles.radio, { flexDirection: "row", alignItems: "center", justifyContent: "center" }]}
                    >
                        <MaterialIcons
                            name={!productByStatus ? "radio-button-checked" : "radio-button-unchecked"}
                            size={24}
                            color="white"
                        />
                        <Text style = {styles.radiotext}className="text-white ml-2">ยังไม่ขาย</Text>
                    </TouchableOpacity>

                    {/* ขายแล้ว */}
                    <TouchableOpacity
                        className={`flex-row items-center px-4 py-2 rounded-lg ${productByStatus ? "bg-green-500" : "bg-gray-300"}`}
                        onPress={() => changeProductByStatus(true)}
                        style={[styles.radio, { flexDirection: "row", alignItems: "center", justifyContent: "center" }]}
                    >
                        <MaterialIcons
                            name={productByStatus ? "radio-button-checked" : "radio-button-unchecked"}
                            size={24}
                            color="white"
                        />
                        <View className="items-center">
                            <Text style = {styles.radiotext}className="text-white ml-2">ขายแล้ว</Text>
                        </View>
                        
                    </TouchableOpacity>
                </View>


                <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 7, gap: hp(1)}} className="w-full flex-grow" showsVerticalScrollIndicator={false}>
                    {filteredMyPosts.length > 0 ? (
                        filteredMyPosts.map((product, index) => (
                            
                            <View key={index} style={{ width: hp(20), height: wp(60), marginBottom: hp(2)}}>
                                 <ProductReusable key={index} product={product} isMyPosts={true} />
                            </View>
                        ))
                    ) : (
                        <View style = {styles.containertext}>
                            <Text className="text-2xl text-center text-gray-400 mt-4">ไม่พบรายการ...</Text>
                        </View>
                    )}
                </ScrollView>
             </StyledHomeBox>
        </StyledContainer>
    );
}

const styles = StyleSheet.create({
    radio:{
        height: hp(6.5),
        width: wp(44),
        flexDirection: "row",
        alignItems:"center",
        marginBottom:10,
        paddingHorizontal: 15,
        borderRadius:15
    },
    radiotext:{
        fontSize: 18,
        fontWeight:'900'
    },
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

export default MyProducts;