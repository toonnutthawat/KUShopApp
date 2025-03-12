import { View , Image, StyleSheet, Text, Pressable} from "react-native";
import { ProductCategory } from "../types/ProductCategory";

function ProductCategoryTab({onSelectCategory}){
    return(
        <View className="flex flex-row">
            <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.Electronics)}>
                <Image source={require("../../assets/pic1-r.png")} style={styles.categoryImg}></Image>
            </Pressable>
            <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.Clothing)}>
                <Image source={require("../../assets/pic2-r.png")} style={styles.categoryImg}></Image>
            </Pressable>
            <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.HomeAppliances)}>
                <Image source={require("../../assets/pic3-r.png")} style={styles.categoryImg}></Image>
            </Pressable>
            <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.Books)}>
                <Image source={require("../../assets/pic4-r.png")} style={styles.categoryImg}></Image>
            </Pressable>
            <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.Toys)}>
                <Image source={require("../../assets/pic5-r.png")} style={styles.categoryImg1}></Image>
            </Pressable>
            <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.ETC)}>
                <Image source={require("../../assets/pic6-r.png")} style={styles.categoryImg}></Image>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryImg: {
        height: 40,
        width: 40
    },
    categoryImg1: {
        width: 40,  // Set the width you want
        height: 30, // Set the height you want
        justifyContent:'center'
      
    },
    container: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 10,
        marginLeft: 5,
        justifyContent:'center'
    }
})


export default ProductCategoryTab;