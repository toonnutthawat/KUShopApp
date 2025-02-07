import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "../hook";
import { useEffect, useState } from "react";
import { editImgUser, fetchMyUser } from "../store/thunks/userThunk";
import ProfileImage from "../components/ProfileImage";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { downloadData, getProperties, uploadData } from 'aws-amplify/storage';
import { StyledContainer, StyledHomeBox } from "../components/StyleContainer";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "aws-amplify/auth";
import Storage, { getUrl } from "@aws-amplify/storage";
import { fetchUserAttributes } from 'aws-amplify/auth';

const imgDir = FileSystem.documentDirectory + 'images/'

const ensureDirectoryExist = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir)
    if(!dirInfo.exists){
        await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true})
    }
}

function ProfilePage() {
    const userInfo = useAppSelector(state => state.users.myUser)
    const [images, setImages] = useState<string[]>()
    const dispatch = useAppDispatch()
    const [editImg, setEditImg] = useState(false)
    const [selectedImage, setSelectedImage] = useState("")
    const [imgFile, setImgFile] = useState("")
    const [imgBlob , setImgBlob] = useState<Blob | null>()
    const [dowloadedImg , setDowloadedImg] = useState("")
    const [isAdmin ,setIsAdmin] = useState(false)
    const navigation = useNavigation()
    console.log("selectedImage: " ,selectedImage);

    useEffect(() => {
        console.log(dowloadedImg);
    }, [dowloadedImg]);

    useEffect(() => {
        const fetch = async () => {
            const response = await fetchUserAttributes();
            if(response.nickname === "admin"){
                setIsAdmin(true)
            }
        }
        fetch()
    },[])



    useEffect(() => {
        //dispatch(fetchMyUser())
        const fetch = async () => {
            await dispatch(fetchMyUser())
        }
        fetch()
    }, [])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log("result : ", result.assets[0]);

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            saveImage(result.assets[0].uri)
            //handleImagePicked(result)
        }
        

    };

    // const fetchImageFromUri = async (uri) => {
    //     const response = await fetch(uri)
    //     const blob = await response.blob()
    //     return blob
    // }

    //  const handleImagePicked = async (imageResult) => {
    //     if(imageResult.canceled){
    //         console.log("picked error");
    //     }
    //     else{
    //         const img = await fetchImageFromUri(imageResult.uri)
    //         setImgBlob(img)
    //         console.log("blob img" , img);
    //         await uploadIMG(img)
    //     }
    // }


    const uploadIMG = async (blobIMG : Blob) => {
        if (selectedImage) {
            console.log("IF in Image");
            const filename = `public/profile/${userInfo.id}`;
            await dispatch(editImgUser({ userID: userInfo.id, imgPath: filename }));

            try {
                const result = uploadData({
                    path: filename,
                    data: selectedImage,
                    options: {
                        contentType: 'image/jpeg'
                    }
                }).result;

                console.log("Succeeded: ", result);
                await dispatch(fetchMyUser());
            } catch (error) {
                console.log("Error: ", error);
            }
        } else {
            console.log("No image selected");
        }
    };

    const saveImage = async (uri: string) => {
        await ensureDirectoryExist();
        const filename = userInfo.id
        const dest = imgDir + filename
        await FileSystem.copyAsync({from: uri,to: dest})
        setImages([...images,dest])

    }

    async function dowloadImageFromS3() {
        try {
            const result = await getUrl({
                path: userInfo.profile,
            })
            // if (result?.body) {
            //                 // Convert ResponseBodyMixin to Blob
            // const blob = await result.body.blob();

            // // Convert Blob to Base64
            // const reader = new FileReader();
            // reader.readAsDataURL(blob);
            // reader.onloadend = async () => {
            //     const base64data = reader.result as string;
            //     setDowloadedImg(base64data);
            //     // console.log("dowloadedImg",dowloadedImg);
            //     // console.log("Image URI (Base64):", base64data);
            // };
            // }
            //setDowloadedImg(result.url.)
            console.log("result",result);
            

        } catch (error) {
            console.log('Error ', error);
        }
    }

        async function handleSignOut() {
            await signOut();
            navigation.navigate("Login" as never);
        }
        
    return (
        <StyledContainer>
            <StyledHomeBox>
                {
                    (editImg && selectedImage) ? <Image source={{uri : selectedImage}} style={styles.profile}></Image> :

                        <ProfileImage size={100}></ProfileImage>
                }
                
                {/* {
                    (dowloadedImg) ? 
                        <Image source={{uri: dowloadedImg}} style={{width: 100 , height: 100}} alt="Image"  onError={(e) => console.log("Error loading image", e.nativeEvent.error)}></Image> :
                        <ProfileImage size={100}></ProfileImage>
                    
                }
                

                {
                    editImg && (
                        <Button title="uploadImgage" onPress={pickImage}></Button>
                    )
                }
                {
                    selectedImage && (
                        <Button title="upload to S3" onPress={() => uploadIMG(imgBlob)}></Button>
                    )
                }
                <Button title="edit img" onPress={() => setEditImg(!editImg)} />
                <Button title="downloadImgFromS3" onPress={dowloadImageFromS3} /> */}
                {/* <Image source={{ uri: imgFile }} style={styles.profile}></Image> */}
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
                    onPress={() => navigation.navigate("MyPosts" as never)}
                    style={{ backgroundColor: "#004c27", 
                        padding: 4, 
                        alignItems: 'center', 
                        borderRadius: 10 , 
                        width: 200,
                        marginTop: 20
                    }}
                >
                    <Text style={{ color: 'white' }}>MyPosts</Text>
                </TouchableOpacity>
                {
                    isAdmin && (
                        <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("ManageStatusRequest" as never)}
                        style={{ backgroundColor: "#004c27", 
                            padding: 4, 
                            alignItems: 'center', 
                            borderRadius: 10 , 
                            width: 200,
                            marginTop: 20
                        }}
                    >
                        <Text style={{ color: 'white' }}>Manage Status Request</Text>
                    </TouchableOpacity>
                    )
                }
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSignOut}
                    style={{ backgroundColor: "red", 
                        padding: 4, 
                        alignItems: 'center', 
                        borderRadius: 10 , 
                        width: 200,
                        marginTop: 20
                    }}
                >
                    <Text style={{ color: 'white' }}>sign out</Text>
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
    }

})

export default ProfilePage;