import { Text, View, Image, TextInput, StyleSheet, Button, TouchableOpacity } from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addProduct, fetchMyProducts } from "../../store/thunks/productsThunk";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { decode } from "base64-arraybuffer";
import { uploadImgToS3 } from "../../store/thunks/imageThunk";
import { pickImage } from "../../components/pickImage";
import { CreditStatus } from "../../API";
import { changeCreditStatus } from "../../store/thunks/userThunk";
import RNPickerSelect from 'react-native-picker-select';
import DropDownPicker from 'react-native-dropdown-picker';
import { ProductCategory } from "../../types/ProductCategory";

function PostPage() {
    const userInfo = useAppSelector(state => state.users.myUser)
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | undefined>(undefined);
    const [selectedImg, setSelectedImg] = useState<ImagePicker.ImagePickerAsset>()
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [items, setItems] = useState(
        Object.values(ProductCategory).map((category) => ({
          label: category,
          value: category
        }))
      );

    const selectImage = async () => {
        const image = await pickImage()
        setSelectedImg(image)
    };

    const handlePostProduct = async () => {
        if (!title || !content || !price || !selectedCategory || !selectedImg) {
            setErrorMessage("All fields are required. Please fill in all details before posting.");
            return;
        }
        if (selectedImg) {
            console.log("IF in Image");
            const filename = `public/product/${selectedImg.fileName}` + '.png';
            await postItem(filename)
            const fileBase64 = await FileSystem.readAsStringAsync(selectedImg.uri, {
                encoding: FileSystem.EncodingType.Base64
            })
            let imageData = decode(fileBase64)
            await dispatch(uploadImgToS3({ filenamePath: filename, data: imageData }))
            setSelectedImg(null)
        } else {
            console.log("No image selected");
        }

    };

    const postItem = async (imgPath: string | null) => {
        await dispatch(addProduct({
            titlePost: title, contentPost: content, imgPath: imgPath,
            productPrice: Number(price),
            category: selectedCategory
        }))
        setContent("")
        setTitle("")
        setPrice("")
        setSelectedCategory(undefined)
        await dispatch(fetchMyProducts())
        navigation.navigate("MyProducts" as never)
    }

    const handlePriceChange = (text) => {
        // Ensure only numbers are entered
        const numericText = text.replace(/[^0-9.]/g, "");
        setPrice(numericText);
      };
    

    return (
        <StyledContainer>
            <StyledHomeBox>
                {
                    (userInfo.credit === CreditStatus.NOT_YET_VERIFIED) &&
                    <View>
                        <Text className="text-xl">Your status has not been verified. Please submit a request.</Text>
                        <View className="mt-4">
                            <Button title="request" color="#004c27" onPress={() => dispatch(changeCreditStatus({
                                userID: userInfo.id, creditStatus: CreditStatus.PENDING
                            }))}></Button>
                        </View>
                    </View>
                }
                {
                    (userInfo.credit === CreditStatus.PENDING) &&
                    <View>
                        <Text className="text-xl">Your status is under review. Please wait for verification from the admin.</Text>
                    </View>
                }
                {
                    (userInfo.credit === CreditStatus.ACCEPTED) &&
                    <View>
                        {
                            selectedImg ? <Image source={{ uri: selectedImg.uri }} style={styles.img}></Image> :
                                <Image source={require("../../../assets/defaultPostImg.png")} style={styles.img}></Image>
                        }
                        <TouchableOpacity className="absolute right-4 top-4 bg-green-500 rounded-lg p-2" onPress={selectImage}>
                            <FontAwesome6 name="add" size={24} color="#004c27" />
                        </TouchableOpacity>

                        <TextInput
                            value={title}
                            onChangeText={(value) => setTitle(value)}
                            placeholder="title"
                            style={styles.textInput}
                        ></TextInput>
                        <TextInput
                            value={content}
                            onChangeText={(value) => setContent(value)}
                            placeholder="content"
                            style={styles.textInput}
                        ></TextInput>
                         {/* <View style={styles.textInput}>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedCategory(value)}
                                items={Object.values(ProductCategory).map((category) => ({
                                    label: category,
                                    value: category,
                                }))}
                            />
                        </View> */}
                        <View style={styles.textInput}>
                           <DropDownPicker
                                 open={open}
                                 value={selectedCategory}
                                 items={items}
                                 setOpen={setOpen}
                                 setValue={setSelectedCategory}
                                 setItems={setItems}     
                           />

                        </View>
                        <TextInput
                            keyboardType="numeric"
                            value={price} 
                            onChangeText={handlePriceChange} // Convert input back to number
                            placeholder="price"
                            style={styles.textInput}
                        ></TextInput>
                        {errorMessage && (
                            <Text style={{ color: "red", marginTop: 10 , width: 300}}>{errorMessage}</Text>
                        )}
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={handlePostProduct}
                                style={[
                                    { 
                                        padding: 4, 
                                        alignItems: 'center', 
                                        borderRadius: 10,
                                    },
                                    !title || !content || !price || !selectedCategory || !selectedImg ? 
                                    { backgroundColor: "#A9A9A9" } : 
                                    { backgroundColor: "#004c27" } // Disabled button style
                                ]}
                                disabled={!title || !content || !price || !selectedCategory || !selectedImg} // Disable button if any required field is null
                            >
                                <Text style={{ color: 'white' }}>Post</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </StyledHomeBox>
        </StyledContainer>
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        width: 300
    },
    img: {
        width: 300,
        height: 200,
        borderRadius: 10
    },
    picker: {
        height: 50,
        width: "100%",
    },
    pickerContainer: {
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5
    },
})

export default PostPage;