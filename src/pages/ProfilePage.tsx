import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import KuShopTitle from "../components/KuShopTitle";
import { useAppDispatch, useAppSelector } from "../hook";
import { useEffect, useState } from "react";
import { editImgUser, fetchMyUser } from "../store/thunks/userThunk";
import ProfileImage from "../components/ProfileImage";
import * as ImagePicker from 'expo-image-picker'
import { downloadData, getProperties, uploadData } from 'aws-amplify/storage';
import { StyledContainer, StyledHomeBox } from "../components/StyleContainer";
import { useNavigation } from "@react-navigation/native";

function ProfilePage() {

    const userInfo = useAppSelector(state => state.users.myUser)
    const dispatch = useAppDispatch()
    const [editImg, setEditImg] = useState(false)
    const [image, setImage] = useState("")
    const [imgFile, setImgFile] = useState("")
    const navigation = useNavigation()
    // dispatch(fetchMyUser())
    console.log("userInfo", userInfo);


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
            setImage(result.assets[0].uri);
            //   setImgFile(result.assets[0].file)
        }

    };

    const uploadIMG = async () => {
        if (image) {
            console.log("IF in Image");
            const filename = `public/profile/${userInfo.id}`;
            await dispatch(editImgUser({ userID: userInfo.id, imgPath: filename }));

            try {
                const result = uploadData({
                    path: filename,
                    data: image,
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

    async function dowloadImageFromS3() {
        try {
            const result = await downloadData({
                path: userInfo.profile,
                // Alternatively, path: ({identityId}) => `protected/${identityId}/album/2024/1.jpg`
            }).result;
            const blob = await result.body.blob()
            const reader = new FileReader()
            reader.onloadend = () => {
                setImgFile(reader.result as string)
            }
            reader.readAsDataURL(blob)
            console.log('File Properties ', result);
            console.log("ImgFile", imgFile);
        } catch (error) {
            console.log('Error ', error);
        }
    }

    return (
        <StyledContainer>
            <StyledHomeBox>
                {
                    (editImg && image) ? <Image source={{ uri: image }} style={styles.profile}></Image> :

                        <ProfileImage size={100}></ProfileImage>
                }

                {
                    editImg && (
                        <Button title="uploadImgage" onPress={pickImage}></Button>
                    )
                }
                {
                    image && (
                        <Button title="upload to S3" onPress={uploadIMG}></Button>
                    )
                }
                {/* <Button title="edit img" onPress={() => setEditImg(!editImg)} />
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