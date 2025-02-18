import { View , Image, StyleSheet } from "react-native";
import { downloadData, getProperties } from 'aws-amplify/storage';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";

function MessageImage({size , src } : { size: number, src: string }){
    const styles = StyleSheet.create({
        profile : {
            width: size,
            height: size,
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 10
        }
    })

    const [dowloadedImg, setDowloadedImg] = useState("")
    useEffect(() => {
        fetchedImageFromS3()
        console.log("fetchMessageImg");
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
            //console.log("result", result);

        } catch (error) {
            console.log('Error ', error);

        }
    }




    return(
        <View>
            <Image style={styles.profile} source={{uri: dowloadedImg}}>
            </Image>
        </View>
    )
}


export default MessageImage;