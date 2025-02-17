import { View , Image, StyleSheet } from "react-native";
import { downloadData, getProperties } from 'aws-amplify/storage';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { hp, wp } from "../helpers/common";

function PostImage({size , src } : { size: number, src?: string | null}){
    const styles = StyleSheet.create({
        profile : {
            width: wp(84),
            height: hp(size),
            borderRadius: 10,
            marginTop: 10
        }
    })

    const [dowloadedImg, setDowloadedImg] = useState("")
    useEffect(() => {
        fetchedImageFromS3()
    },[])

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
            console.log("result", result);

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

                <Image style={styles.profile} source={require("../../assets/defaultPostImg.png")}>

                </Image>
            }
        </View>
    )
}


export default PostImage;