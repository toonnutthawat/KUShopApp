import { View , Image, StyleSheet, Text, Pressable, ScrollView} from "react-native";
import { ProductCategory } from "../types/ProductCategory";
import React, { useRef, useEffect, useState  } from "react";

function ProductCategoryTab({onSelectCategory}){
    return(
        <View className="flex flex-row">
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}> 
            
                <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.Electronics)}>
                    <Image source={require("../../assets/pic1-r.png")} style={styles.categoryImg}></Image>
                    <Text style={styles.categoryText}>อิเล็กทรอนิกส์</Text>
                </Pressable>
                <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.Clothing)}>
                    <Image source={require("../../assets/pic2-r.png")} style={styles.categoryImg}></Image>
                    <Text style={styles.categoryText}>เสื้อผ้า</Text>
                </Pressable>
                <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.HomeAppliances)}>
                    <Image source={require("../../assets/pic3-r.png")} style={styles.categoryImg}></Image>
                    <Text style={styles.categoryText}>เครื่องใช้ไฟฟ้า</Text>
                </Pressable>
                <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.Books)}>
                    <Image source={require("../../assets/pic4-r.png")} style={styles.categoryImg}></Image>
                    <Text style={styles.categoryText}>หนังสือ</Text>
                </Pressable>
                <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.Toys)}>
                    <Image source={require("../../assets/pic5-r.png")} style={styles.categoryImg}></Image>
                    <Text style={styles.categoryText}>ของเล่น</Text>
                </Pressable>
                <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.ETC)}>
                    <Image source={require("../../assets/pic6-r.png")} style={styles.categoryImg1}></Image>
                    <Text style={styles.categoryText}>อื่นๆ</Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryImg: {
        height: 50,
        width: 50,
        resizeMode:'contain',
        justifyContent:'center'
    },
    categoryImg1: {
        height: 50,
        width: 35,
        resizeMode:'contain',
        justifyContent:'center'
    },
    scrollContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10, // Add some spacing
    },
    container: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 10,
        marginLeft: 5,
        alignItems:'center'
    },
    categoryText: {
        fontSize: 14, // Adjust size as needed
        fontWeight: 'bold', // Make the text bold
        color: '#333', // Dark gray for readability
        marginTop: 5, // Spacing between image and text
        textAlign: 'center', // Center the text
    },
})


export default ProductCategoryTab;