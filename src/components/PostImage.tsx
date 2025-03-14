import { View , Image, StyleSheet, ImageStyle  } from "react-native";
import { downloadData, getProperties } from 'aws-amplify/storage';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { hp, wp } from "../helpers/common";
import { fetchedImageFromS3 } from "./s3Utils";
import { theme } from "../constants/theme";

interface PostImageProps {
    size: number;
    src?: string | null;
    style?: ImageStyle | ImageStyle[]; // Accepts custom styles
    refreshTrigger?: boolean; // Accept a refresh trigger prop
  }
  function PostImage({ size, src, style , refreshTrigger}: PostImageProps) {
    
    const styles = StyleSheet.create({
        ImageStyles : {
            width: '100%',
            height: hp(size) / 2,
            borderRadius: theme.radius.xl,
            borderCurve : 'continuous',
            marginTop: 10,
            marginBottom: 5,
        }
    })

    const [dowloadedImg, setDowloadedImg] = useState("")
    
    useEffect(() => {
        fetchedImageFromS3()
        console.log("fetchPostImg"); 
    })

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
            // console.log("result", result);

        } catch (error) {
            console.log('Error ', error);

        }
    }




    return(
        <View>
            {(src && (src !== null) )? 
                <Image style={[styles.ImageStyles, style]} source={{uri: dowloadedImg}} className="self-center"></Image>
 
                :

                <Image style={[styles.ImageStyles, style]} source={require("../../assets/defaultPostImg.png")}>

                </Image>
            }
        </View>
    )
}


export default PostImage;