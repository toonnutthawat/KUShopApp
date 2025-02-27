import { Text, View, StyleSheet, Button, Image, TouchableOpacity, TextStyle } from "react-native";
import { useAppDispatch, useAppSelector } from "../hook";
import { useEffect, useState } from "react";
import { editImgUser, fetchMyUser } from "../store/thunks/userThunk";
import ProfileImage from "../components/ProfileImage";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { StyledContainer, StyledHomeBox } from "../components/StyleContainer";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "aws-amplify/auth";
import { fetchUserAttributes } from 'aws-amplify/auth'
import { decode } from 'base64-arraybuffer'
import { uploadImgToS3 } from "../store/thunks/imageThunk";
import Entypo from '@expo/vector-icons/Entypo';
import { pickImage } from "../components/pickImage";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";
import Icon from "../../assets/icons";
import Header from "../components/Header";
import { fetchFavoriteProducts } from "../store/thunks/productsThunk";

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
    //console.log("selectedImage: ", selectedImage);


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

    async function handleSignOut() {
        await signOut();
        navigation.navigate("Login" as never);
    }

    function cancelEditImg(){
        setEditImg(false)
        setSelectedImage(null)
    }

    return (
        <StyledContainer>
            <Header title = "Profile"showBackButton={false}></Header>
            <StyledHomeBox>
                {
                    (editImg && selectedImage) ? <Image source={{ uri: selectedImage.uri }} style={styles.profile}></Image> : 
                    
                        <ProfileImage size={100} src={userInfo.profile}></ProfileImage>
                }

                        <TouchableOpacity onPress={selectImage} className="absolute" style={{top: 90, left: 220}}>
                            <View className="rounded-full p-2" style={{backgroundColor: "#004c27"}}>
                                <Entypo name="camera" size={20} color="white"/>
                            </View>
                        </TouchableOpacity>
                    
    
                {
                    selectedImage && (
                        <View className="flex flex-row mt-4">
                            <TouchableOpacity onPress={() => uploadIMG()} style={styles.saveButton}><Text className="text-white">Save</Text></TouchableOpacity>
                            <TouchableOpacity onPress={cancelEditImg} style={styles.cancelButton}><Text className="text-white">Cancel</Text></TouchableOpacity>
                        </View>
                    )
                }
                {
                    userInfo && (
                        <View style={{ marginTop: 20 }}>
                            <Text>
                                username : {userInfo.id}
                            </Text>
                            <Text>
                                email : {userInfo.email}
                            </Text>
                        </View>
                    )
                }
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("MyProducts" as never)}
                    style={ styles.myPostStyles}
                >
                    <Text style={styles.myPosttext}>MyProducts</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("MyFavoriteProducts" as never)}
                    style={styles.myPostStyles}
                >
                    <Text style={styles.myPosttext}>Favorite Products</Text>
                </TouchableOpacity>
                {
                    isAdmin && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate("ManageStatusRequest" as never)}
                            style={{
                                backgroundColor: "#004c27",
                                padding: 4,
                                alignItems: 'center',
                                borderRadius: 10,
                                width: 200,
                                marginTop: 20
                            }}
                        >
                            <Text style={{ color: 'white' }}>Manage Status Request</Text>
                        </TouchableOpacity>
                    )
                }
                {/* <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSignOut}
                    style={{
                        backgroundColor: "red",
                        padding: 4,
                        alignItems: 'center',
                        borderRadius: 10,
                        width: 200,
                        marginTop: 20
                    }}
                >
                    <Text style={{ color: 'white' }}>sign out</Text>
                </TouchableOpacity> */}

                <TouchableOpacity style = {styles.logoutButton} onPress={handleSignOut}>
                    <Icon name = "logout" color = {theme.colors.rose}/>
                </TouchableOpacity>

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
    logoutButton:{
        padding:5,
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
        width: 100,
        height: 100,
        borderRadius: 50
    },
    saveButton: {
        backgroundColor: '#004d26',
        display: 'flex',
        alignItems: 'center',
        width: 60,
    },
    cancelButton: {
        backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        width: 60,
    },
    myPostStyles: {
        backgroundColor: "#004c27",
        padding: 4,
        alignItems: 'center',
        borderRadius: 10,
        width: 200,
        marginTop: 20,
        height: hp(3)
    },
    myPosttext: {
        fontSize: hp(2),
        color: 'white',
        fontWeight: theme.fonts.semibold as TextStyle['fontWeight'],
    },

})

export default ProfilePage;