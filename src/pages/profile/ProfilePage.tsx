import { Alert,Text, View, StyleSheet, Button, Image, TouchableOpacity, TextStyle, Pressable } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useEffect, useState } from "react";
import { editImgUser, fetchMyUser } from "../../store/thunks/userThunk";
import ProfileImage from "../../components/ProfileImage";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "aws-amplify/auth";
import { fetchUserAttributes } from 'aws-amplify/auth'
import { decode } from 'base64-arraybuffer'
import { uploadImgToS3 } from "../../store/thunks/imageThunk";
import Entypo from '@expo/vector-icons/Entypo';
import { pickImage } from "../../components/pickImage";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import Icon from "../../../assets/icons";
import Header from "../../components/Header";
import { fetchFavoriteProducts } from "../../store/thunks/productsThunk";
import Feather from '@expo/vector-icons/Feather';
import EditPhoneNumber from "./EditPhoneNumber";

const imgDir = FileSystem.documentDirectory + 'images/'

function ProfilePage() {
    const userInfo = useAppSelector(state => state.users.myUser)
    const [images, setImages] = useState<string[]>()
    const dispatch = useAppDispatch()
    const [editImg, setEditImg] = useState(false)
    const [selectedImage, setSelectedImage] = useState<ImagePicker.ImagePickerAsset>()
    const [imgFile, setImgFile] = useState("")
    const [dowloadedImg, setDowloadedImg] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const navigation = useNavigation()
    const [editPhone, setEditPhone] = useState(false)

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
        const fetch = async () => {
            await dispatch(fetchMyUser())
        }
        fetch()
    }, [])

    const selectImage = async () => {
        setEditImg(true)
        const image = await pickImage()
        setSelectedImage(image)
    };

    const uploadIMG = async () => {
        if (selectedImage) {
            console.log("IF in Image");
            const filename = `public/profile/${userInfo.id}` + '.png';
            const fileBase64 = await FileSystem.readAsStringAsync(selectedImage.uri, {
                encoding: FileSystem.EncodingType.Base64
            })
            let imageData = decode(fileBase64)
            await dispatch(editImgUser({ userID: userInfo.id, imgPath: filename }));
            await dispatch(uploadImgToS3({ filenamePath: filename, data: imageData }))
            await dispatch(fetchMyUser());
            setEditImg(false)
            setSelectedImage(null)
        } else {
            console.log("No image selected");
        }
    };

    const handleSignOut = () => {
        Alert.alert(
            "Confirm", // Title
            "คุณต้องการออกจากระบบใช่หรือไม่?", // Message
            [
                {
                    text: "ยกเลิก",
                    style: "cancel",
                },
                {
                    text: "ตกลง",
                    onPress: async () => {
                        try {
                            console.log("User confirmed!");
                            await signOut();
                            navigation.navigate("Welcome" as never);
                        } catch (error) {
                            console.error("Error signing out:", error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };
    

    function cancelEditImg() {
        setEditImg(false)
        setSelectedImage(null)
    }

    function onEditPhone() {
        setEditPhone(false)
    }

    return (
        <StyledContainer>
            <Header title="โปรไฟล์" showBackButton={false}></Header>
            {editPhone &&
                <Pressable className="absolute left-4 top-4" onPress={() => setEditPhone(false)}>
                    <Icon name="arrowLeft" strokeWidth={2.5} color={theme.colors.text}></Icon>
                </Pressable>
            }
            <StyledHomeBox>
                {
                    (editImg && selectedImage) ? (
                        <Image source={{ uri: selectedImage.uri }} style={styles.profile} />
                    ) : userInfo.profile ? (
                        <ProfileImage size={100} src={userInfo.profile} />
                    ) : (
                        <ProfileImage size={100} />
                    )
                }

                <TouchableOpacity onPress={selectImage} className="absolute" style={{ top: 90, left: 220 }}>
                    <View className="rounded-full p-2" style={{ backgroundColor: "#004c27" }}>
                        <Entypo name="camera" size={20} color="white" />
                    </View>
                </TouchableOpacity>


                {
                    selectedImage && (
                        <View className="flex flex-row mt-4">
                            <TouchableOpacity onPress={() => uploadIMG()} style={styles.saveButton}><Text className="text-white">ยืนยัน</Text></TouchableOpacity>
                            <TouchableOpacity onPress={cancelEditImg} style={styles.cancelButton}><Text className="text-white">ยกเลิก</Text></TouchableOpacity>
                        </View>
                    )
                }

                {!editPhone ? (
                    <>
                        {userInfo && (
                            <View className="p-6 rounded-xl shadow-md shadow-black-400 mt-9">
                                <Text className="text-2xl text-black-800" >ชื่อผู้ใช้ : {userInfo.id}</Text>
                                <Text className="text-2xl text-black-700 mt-5" >อีเมล : {userInfo.email}</Text>
                                <View className="flex flex-row items-center mt-5">
                                    <Text className="text-2xl text-black-700">เบอร์ติดต่อ : {userInfo.phone}</Text>
                                    <Pressable onPress={() => setEditPhone(true)} className="ml-2 p-1">
                                        <Feather name="edit" size={20} color= {theme.colors.kuBGColor} />
                                    </Pressable>
                                </View>
                            </View>
                        )}

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate("MyProducts" as never)}
                            style={styles.myPostStyles}
                        >
                            <Text style={styles.myPosttext}>สินค้าของฉัน</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate("MyFavoriteProducts" as never)}
                            style={styles.myPostStyles}
                        >
                            <Text style={styles.myPosttext}>รายการโปรด</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate("MyProductsPurchased" as never)}
                            style={styles.myPostStyles}
                        >
                            <Text style={styles.myPosttext}>ประวัติการซื้อสินค้า</Text>
                        </TouchableOpacity>

                        {isAdmin && (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate("ManageStatusRequest" as never)}
                                style={styles.myPostStyles}
                            >
                                <Text style={styles.myPosttext}>จัดการคำขอสถานะ</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
                            <Icon name="logout" color={theme.colors.rose} />
                        </TouchableOpacity>
                    </>
                ) : <EditPhoneNumber handleEditPhone={onEditPhone}></EditPhoneNumber>}
            </StyledHomeBox>
        </StyledContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#004d26",
        alignItems: "center",
        justifyContent: "flex-start", // Aligns content at the top
    },
    logoutButton: {
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: '#fee2e2',
        marginTop: 30
    },
    homeBox: {
        display: "flex",
        alignItems: 'center',
        backgroundColor: "#d5f0e8",
        width: "85%",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20,
        marginTop: 20
    },
    profile: {
        width: 101,  // Set width
        height: 101, // Set height
        borderRadius: 10, // Remove or adjust for rounded corners (not a full circle)
        resizeMode: "cover", // Ensure proper fit
    },
    saveButton: {
        backgroundColor: '#007A4D', // Slightly brighter green for better contrast
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        width: 80,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3, // For Android shadow
    },
    cancelButton: {
        backgroundColor: '#D32F2F', // Deep red for a softer look
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        width: 80,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3, // For Android shadow
    },
    myPostStyles: {
        backgroundColor: "#004c27",
        padding: 4,
        alignItems: 'center',
        borderRadius: 10,
        width: wp(54),
        marginTop: 20,
        height: hp(5),
        justifyContent: "center"
    },
    myPosttext: {
        fontSize: hp(2),
        color: 'white',
        fontWeight: theme.fonts.semibold as TextStyle['fontWeight'],
    },

})

export default ProfilePage;