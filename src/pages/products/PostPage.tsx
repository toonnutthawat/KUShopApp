import { Alert, Text, View, Image, TextInput, StyleSheet, Button, TouchableOpacity, TextStyle } from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addProduct, fetchAllProducts, fetchMyProducts } from "../../store/thunks/productsThunk";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { decode } from "base64-arraybuffer";
import { uploadImgToS3 } from "../../store/thunks/imageThunk";
import { pickImage } from "../../components/pickImage";
import { CreditStatus } from "../../API";
import { changeCreditStatus, fetchMyUser } from "../../store/thunks/userThunk";
import RNPickerSelect from 'react-native-picker-select';
import DropDownPicker from 'react-native-dropdown-picker';
import { ProductCategory } from "../../types/ProductCategory";
import { hp } from "../../helpers/common";
import { theme } from "../../constants/theme";

import Icon from "../../../assets/icons";
import Header from "../../components/Header";

import { fetchUserAttributes } from "aws-amplify/auth";


function PostPage() {
    const userInfo = useAppSelector(state => state.users.myUser)
    console.log("userInfo : ",userInfo);
    
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | undefined>(undefined);
    const [selectedImg, setSelectedImg] = useState<ImagePicker.ImagePickerAsset>()
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isAdmin , setIsAdmin] = useState(false)
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

    useEffect(() => {
            const fetch = async () => {
                const response = await fetchUserAttributes();
                if (response.nickname === "admin") {
                    setIsAdmin(true)
                }
            }
            fetch()
            //fetchedImageFromS3()
        }, [])

        useEffect(() => {
            //dispatch(fetchMyUser())
            const fetch = async () => {
                await dispatch(fetchMyUser())
            }
            fetch()
        }, [])

    const handlePostProduct = async () => {
        if (!title || !content || !price || !selectedCategory || !selectedImg) {
            setErrorMessage("กรุณากรอกข้อมูลให้ครบถ้วนก่อนทำการโพสต์");
            return;
        }

        Alert.alert(
            'Confirm',
            'คุณต้องการโพสต์สินค้านี้ใช่หรือไม่?',  // Confirmation message
            [
              {
                text: 'Cancel',
                onPress: () => console.log('User canceled the post'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: async () => {
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
                        setErrorMessage("")
                    } else {
                        console.log("No image selected");
                    }
                  console.log('Product posted!');
                  await dispatch(fetchAllProducts({category: null})) 
                  await dispatch(fetchMyProducts({isSold: false}))
                   // Show success alert after posting
                   Alert.alert("สำเร็จ", "โพสต์สินค้าสำเร็จ", [{ text: "OK" }]);
                  // You can insert your posting logic here (e.g., uploading to S3, etc.)
                },
              },
            ],
            { cancelable: false }
          );

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
        await dispatch(fetchMyProducts({isSold: false}))
        navigation.navigate("MyProducts" as never)
    }

    const handlePriceChange = (text: string) => {
        const numericText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        const priceValue = Number(numericText);
    
        if (priceValue < 100 || priceValue > 100000) {
            setErrorMessage("ราคาต้องอยู่ระหว่าง 100 ถึง 100,000 บาท");
        } else {
            setErrorMessage(null);
        }
    
        setPrice(numericText);
    };
    
    

    return (
        <StyledContainer>
            {
                (isAdmin) ? 
                <StyledHomeBox>
                    <View>
                        <Text className="text-xl mt-4">ผู้ดูแลระบบไม่สามารถส่งคำขอตรวจสอบหรือเพิ่มผลิตภัณฑ์ได้</Text>
                    </View>
                </StyledHomeBox>
                
                :
            <StyledHomeBox>
                <Header title="โพสต์สินค้า" showBackButton={false}></Header>
                {
                    (userInfo.credit === CreditStatus.NOT_YET_VERIFIED) &&
                    <View>
                        <Text className="text-xl mt-4">สถานะของคุณยังไม่ได้รับการตรวจสอบ กรุณาส่งคำขอ</Text>
                        <View className="mt-4">
                            <Button title="ส่งคำขอโพสต์สินค้า" color="#004c27" onPress={() => dispatch(changeCreditStatus({
                                userID: userInfo.id, creditStatus: CreditStatus.PENDING
                            }))}></Button>
                        </View>
                    </View>
                }
                {
                    (userInfo.credit === CreditStatus.PENDING) &&
                    <View style = {styles.containertext}>
                        <Text className="text-xl">สถานะของคุณอยู่ระหว่างการตรวจสอบ</Text>
                        <Text className="text-xl">กรุณารอการยืนยันจากผู้ดูแลระบบ</Text>
                    </View>
                }
                {
                    (userInfo.credit === CreditStatus.ACCEPTED) &&
                    <View>
                        {
                            selectedImg ? <Image source={{ uri: selectedImg.uri }} style={styles.img}></Image> :
                                <Image source={require("../../../assets/defaultPostImg.png")} style={styles.img}></Image>
                        }
                        <View className="absolute right-4 top-4 flex flex-col items-end space-y-2">
                            <TouchableOpacity className="bg-white rounded-lg p-2 opacity-75 mt-3" onPress={selectImage}>
                                <FontAwesome6 name="add" size={20} color="#004c27" />
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-white rounded-lg p-2 opacity-75 mt-5" onPress={() => setSelectedImg(null)} style={styles.removeButton}>
                                <Icon name="delete" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            value={title}
                            onChangeText={(value) => setTitle(value)}
                            placeholder="ระบุชื่อสินค้า..."
                            style={styles.textInput}
                        ></TextInput>
                        <TextInput
                            value={content}
                            onChangeText={(value) => setContent(value)}
                            placeholder="รายละเอียดของสินค้า..."
                            style={styles.detailInput}
                            multiline={true} // Ensures text can wrap inside
                        ></TextInput>
                        <View style={styles.textInput}>
                           <DropDownPicker
                                 open={open}
                                 value={selectedCategory}
                                 items={items}
                                 setOpen={setOpen}
                                 setValue={setSelectedCategory}
                                 setItems={setItems}
                                 placeholder="เลือกหมวดหมู่" // Change this text
                           />
                        </View>
                        <TextInput
                            keyboardType="numeric"
                            value={price} 
                            onChangeText={handlePriceChange} // Convert input back to number
                            placeholder="ราคา..."
                            style={styles.textInput}
                        ></TextInput>
                        {errorMessage && (
                            <Text style = {styles.errorMessage}>{errorMessage}</Text>
                        )}
                        <View style={{ marginTop: 20 , alignContent:'center'}}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={handlePostProduct}
                                style={[
                                    { 
                                        padding: 4, 
                                        alignItems: 'center', 
                                        borderRadius: theme.radius.xl,
                                        backgroundColor: theme.colors.primary,
                                        height: hp(6.6),
                                        justifyContent: 'center'
                                    },
                                    !title || !content || !price || !selectedCategory || !selectedImg ? 
                                    { backgroundColor: "#A9A9A9" } : 
                                    { backgroundColor: theme.colors.primary} // Disabled button style
                                ]}
                                 // Disable button if any required field is null
                            >
                                <Text style={styles.postText}>โพสต์สินค้า</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </StyledHomeBox>
            }
        </StyledContainer>
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        width: 300,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    containertext:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 7,
        gap: hp(1),
        justifyContent: 'center',  // This will center the content horizontally
        alignItems: 'center',      // This will center the content vertically
        flexGrow: 1,          
    },
    errorMessage: {
        textAlign: 'center',
        fontSize: 16,
        color: 'red',
        marginTop: 20,
    },
    detailInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        width: 300, // Increased width
        height: 150, // Increased height
        padding: 15, // Increased padding
        borderWidth: 1,
        borderColor: '#ccc',
    },
    img: {
        width: 300,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginTop: 10
    },
    removeButton: {
        marginLeft:"auto",
        borderRadius: 10,
        padding: 5,
    },
    picker: {
        height: 30,
        width: "100%",
    },
    pickerContainer: {
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    button: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    buttonEnabled: {
        backgroundColor: "#004c27",
    },
    buttonDisabled: {
        backgroundColor: "#A9A9A9",
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
    },
    postText:{
        fontWeight: theme.fonts.semibold as TextStyle['fontWeight'],
        fontSize: 20,
        color: 'white'
    }
    
})

export default PostPage;