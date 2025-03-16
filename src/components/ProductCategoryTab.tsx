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
                    <Text>อิเล็กทรอนิกส์</Text>
                </Pressable>
                <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.Clothing)}>
                    <Image source={require("../../assets/pic2-r.png")} style={styles.categoryImg}></Image>
                    <Text>เสื้อผ้า</Text>
                </Pressable>
                <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.HomeAppliances)}>
                    <Image source={require("../../assets/pic3-r.png")} style={styles.categoryImg}></Image>
                    <Text>เครื่องใช้ไฟฟ้า</Text>
                </Pressable>
                <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.Books)}>
                    <Image source={require("../../assets/pic4-r.png")} style={styles.categoryImg}></Image>
                    <Text>หนังสือ</Text>
                </Pressable>
                <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.Toys)}>
                    <Image source={require("../../assets/pic5-r.png")} style={styles.categoryImg}></Image>
                    <Text>ของเล่น</Text>
                </Pressable>
                <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.ETC)}>
                    <Image source={require("../../assets/pic6-r.png")} style={styles.categoryImg}></Image>
                    <Text>อื่นๆ</Text>
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
    }
})


export default ProductCategoryTab;