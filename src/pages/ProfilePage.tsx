import { Text, View, Image, TouchableOpacity, Button } from "react-native";
import KuShopTitle from "../components/KuShopTitle";
import { useAppDispatch, useAppSelector } from "../hook";
import { useEffect, useState } from "react";
import { editImgUser, fetchMyUser } from "../store/thunks/userThunk";
import ProfileImage from "../components/ProfileImage";
import * as ImagePicker from 'expo-image-picker';
import { downloadData, uploadData } from 'aws-amplify/storage';
import { StyledContainer, StyledHomeBox } from "../components/StyleContainer";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "aws-amplify/auth";

function ProfilePage() {
    const userInfo = useAppSelector(state => state.users.myUser);
    const dispatch = useAppDispatch();
    const [editImg, setEditImg] = useState(false);
    const [image, setImage] = useState("");
    const [imgFile, setImgFile] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchMyUser());
        };
        fetch();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadIMG = async () => {
        if (image) {
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

    async function handleSignOut() {
        await signOut();
        navigation.navigate("Login" as never);
    }

    return (
        <StyledContainer>
            <StyledHomeBox>
                <View className="items-center mb-6">
                    {editImg && image ? (
                        <Image source={{ uri: image }} className="w-24 h-24 rounded-full" />
                    ) : (
                        <ProfileImage size={100} />
                    )}
                </View>

                {editImg && (
                    <Button title="Choose Image" onPress={pickImage} />
                )}

                {image && (
                    <Button title="Upload to S3" onPress={uploadIMG} />
                )}

                {userInfo && (
                    <View className="mt-6">
                        <Text className="text-lg font-semibold">Username: {userInfo.id}</Text>
                        <Text className="text-lg text-gray-600">Email: {userInfo.email}</Text>
                    </View>
                )}

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("MyPosts" as never)}
                    className="w-48 bg-green-700 py-3 rounded-xl items-center shadow-md hover:bg-green-800 mt-6"
                >
                    <Text className="text-white font-bold text-lg">My Posts</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSignOut}
                    className="w-48 bg-red-600 py-3 rounded-xl items-center shadow-md hover:bg-red-700 mt-4"
                >
                    <Text className="text-white font-bold text-lg">Sign Out</Text>
                </TouchableOpacity>
            </StyledHomeBox>
        </StyledContainer>
    );
}

export default ProfilePage;