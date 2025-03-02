import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet, Pressable, TouchableOpacity, TextStyle } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import ProfileImage from './ProfileImage';
import {  Product, ProductStatus } from '../API';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../hook';
import { changeToSoldProductStatus, fetchAllProducts , removeProduct } from '../store/thunks/productsThunk';
import PostImage from './PostImage';
import { fetchedImageFromS3 } from './s3Utils';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';
import Icon from '../../assets/icons';
import { format } from 'date-fns';

// Define the navigation stack types
type RootStackParamList = {
    ProductDetail: { product: Product };
    // Add other routes here if needed
};

// Define the navigation prop for this component
type PostReusableNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;


const ProductReusable = ({ product, isMyPosts, className }: { product: Product, isMyPosts?: Boolean | null; className?: string }) => {
    const navigation = useNavigation<PostReusableNavigationProp>()
    const dispatch = useAppDispatch()

    const removeProductByID = async () => {
        await dispatch(removeProduct(product.id))
        await dispatch(fetchAllProducts(null))
    }

    const changeProductStatus = async () => {
        await dispatch(changeToSoldProductStatus(product.id))
        await dispatch(fetchAllProducts(null))
    }
    const createAt = format(new Date(product.createdAt), 'MMM dd');

    const shadowStyles={
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation:1
    }
    const liked = false;

    return (

        <TouchableOpacity  onPress={() => navigation.navigate('ProductDetail', { product })} style={[styles.container, shadowStyles]} >

            <View style = {styles.header}>
                <View style = {styles.userInfo}>
                    <ProfileImage size={hp(4.5)} src={product.user.profile} />
                    <View style = {{gap:2}}>
                        <Text style = {styles.username}>{product.userID}</Text>
                        <Text style = {styles.postTime}>{createAt}</Text>
                    </View>
                </View>
                { isMyPosts && 
                <>
                <TouchableOpacity className="absolute top-0 right-2 bg-red-500 rounded-full w-10 h-10 flex items-center justify-center" onPress={removeProductByID}>
                     <Text className="text-white text-xs">X</Text>
                </TouchableOpacity>
                </>
                }   
            </View>

            <View style = {styles.content}>
                <View style = {styles.postBody}>
                    <Text style = {styles.titleText} numberOfLines={1}>{product.title}</Text>
                </View>
                <View className='flex justify-center'>
                {
                     (product.status === ProductStatus.SOLD) && (
                        <View className='absolute z-10 bg-slate-400 opacity-75 
                        flex items-center justify-center rounded-lg' style={{width: '100%', height: '100%'}}>
                            <Text className='text-white'>Out of Stock</Text>
                        </View>
                     )
                    }
                    <PostImage size={25} src={product.image}/>
                </View>
                    <View className='mt-1'>
                            <Text style = {styles.priceText}>฿ {product.price}</Text>
                    </View>
            </View>
            <View>

                { (isMyPosts && (product.status === ProductStatus.AVAILABLE)) && 

            <TouchableOpacity className='bg-blue-500 p-2 flex items-center rounded-lg' style={{width: 80}} onPress={changeProductStatus}>
                    <Text className='text-white'>Sold</Text>
                </TouchableOpacity>
                }
            </View>
            
    
        </TouchableOpacity>


        // <Pressable onPress={() => navigation.navigate('ProductDetail', { product })}>
        //     <View className={`bg-white w-full rounded-2xl mb-4 p-4 mt-5 ${className}`}>
        //         <PostImage size={25} src={product.image}/>
        //         { isMyPosts && 
        //         <TouchableOpacity className="absolute top-2 right-2 bg-red-500 rounded-full w-10 h-10 flex items-center justify-center" onPress={removeProductByID}>
        //              <Text className="text-white text-xs">X</Text>
        //         </TouchableOpacity>
        //         }
        //         <View className='mb-5'>
        //             <Text className='mt-5 mb-2'>Title: {product.title}</Text>
        //             {/* <Text style={{ marginTop: 5 }}>Content: {product.content}</Text> */}
        //             <View className="flex flex-row items-center mt-1 mb-2">
        //                 <AntDesign name="like1" size={24} color="#004c27" />
        //                 <Text className='ml-2 mt-2'>{product.likes}</Text>
        //             </View>
        //             <View className="flex flex-row items-center mt-1 mb-2">
        //                 <ProfileImage size={20} src={product.user.profile}/>
        //                 <Text className='ml-2 mt-2'>{product.userID}</Text>
        //             </View>
        //             <View className='mt-1'>
        //                 <Text className='text-4xl'>฿ {product.price}</Text>
        //             </View>
        //         </View>
        //     </View>
        // </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 10,
        marginBottom: 15,
        borderRadius: theme.radius.xxl * 1.1,
        borderCurve: 'continuous',
        padding: 10,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: theme.colors.gray,
        shadowColor: '#000',
    },
    deleteButton: {
        backgroundColor: 'red',
        position: 'absolute',
        margin: 10,
        right: 0,
        borderRadius: 50,
        width: 30,
        display: 'flex',
        alignItems: 'center'
    },
    priceText:{
        fontSize:18,
        fontWeight: theme.fonts.bold as TextStyle['fontWeight']
    },
    header:{
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    username:{
        fontSize: hp(1.7),
        color: theme.colors.dark,
        fontWeight: theme.fonts.semibold as TextStyle['fontWeight']
    },
    postTime:{
        fontSize: hp(1.4),
        color: theme.colors.textLight,
        fontWeight: theme.fonts.medium as TextStyle['fontWeight']
    },
    userInfo:{
        flexDirection : 'row',
        alignItems: 'center',
        gap: 8
    },
    content:{
        gap : 10,
    },
    postBody:{
        marginLeft:5,
    },
    postMedia:{
        height: hp(40),
        width: '100%',
        borderRadius: theme.radius.xl,
        borderCurve : 'continuous'
    },
    footer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap : 15
    },
    footerButton:{
        marginLeft: 5,
        flexDirection: 'row',
        alignItems:'center',
        gap: 4
    },
    count:{

    },
    titleText:{
        fontWeight: theme.fonts.medium as TextStyle['fontWeight']
    }
})

export default ProductReusable;