import { View , Image, StyleSheet } from "react-native";
import { downloadData } from 'aws-amplify/storage';
import { getProperties } from 'aws-amplify/storage';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";

function ProfileImage({size = hp(4.5) , src , isChatPage } : { size: number, src?: string | null ; isChatPage? : boolean | null}){

    const styles = StyleSheet.create({
        profile : {
            width: size,
            height: size,
            borderRadius: theme.radius.md,
            borderCurve: 'continuous',
            borderColor:theme.colors.darkLight,
            borderWidth: 1
        }
    })

    const dispatch = useAppDispatch()
    const [dowloadedImg, setDowloadedImg] = useState("")
    const userInfo = useAppSelector(state => state.users.myUser)

    useEffect(() => {
        fetchedImageFromS3()
        console.log("fetchProfileImgFromSRC");
    },[src])


    async function fetchedImageFromS3() {
        if (!src) return;
        try {
            const result = await downloadData({
                path: src,
            }).result
            if (result?.body) {
                const blob = await result.body.blob();
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = async () => {
                    const base64data = reader.result as string;
                    setDowloadedImg(base64data)         
                };
            }
            //console.log("result", result);

        } catch (error) {
            console.log('Error ', error);

        }
    }




    return(
        <View>
            {
                (src && (src !== null) )? <Image style={styles.profile} source={{uri: dowloadedImg}}>

                </Image>
 
                :

                <Image style={styles.profile} source={require("../../assets/profile.jpeg")}>

                </Image>
            }
        </View>
    )
}


export default ProfileImage;