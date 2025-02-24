import { View , Image, StyleSheet, Text, Pressable} from "react-native";
import { ProductCategory } from "../types/ProductCategory";

function ProductCategoryTab({onSelectCategory}){
    return(
        <View className="flex flex-row">
            <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.Electronics)}>
                <Image source={require("../../assets/gadgets.png")} style={styles.categoryImg}></Image>
            </Pressable>
            <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.Clothing)}>
                <Image source={require("../../assets/brand.png")} style={styles.categoryImg}></Image>
            </Pressable>
            <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.HomeAppliances)}>
                <Image source={require("../../assets/small-appliance.png")} style={styles.categoryImg}></Image>
            </Pressable>
            <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.Books)}>
                <Image source={require("../../assets/book.png")} style={styles.categoryImg}></Image>
            </Pressable>
            <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.Toys)}>
                <Image source={require("../../assets/toys.png")} style={styles.categoryImg}></Image>
            </Pressable>
            <Pressable style={styles.container} onPress={() => onSelectCategory(ProductCategory.ETC)}>
                <Image source={require("../../assets/more.png")} style={styles.categoryImg}></Image>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryImg: {
        height: 40,
        width: 40
    },
    container: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 10,
        marginLeft: 5
    }
})


export default ProductCategoryTab;