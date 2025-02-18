import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { downloadData, uploadData } from "aws-amplify/storage";
import { useState } from "react";

const client = generateClient()

const uploadImgToS3 = createAsyncThunk("uploadImgToS3" , async ({filenamePath , data} : {filenamePath : string , data: ArrayBuffer }) =>{
    try{
            const result = uploadData({
                path: filenamePath,
                    data: data,
                    options: {
                        contentType: 'image/jpeg'
                    }
            }).result;
    console.log("uploadImg Success");
    
    return (await result).path
        }
        catch(error) {
            console.log("error", error);
            
        }
})

const dowloadImgFromS3 = createAsyncThunk("dowloadImgFromS3" , async (imgPath : string) => {
        const [img , setImg] = useState("")
            try {
                const result = await downloadData({
                    path: imgPath,
                }).result
                if (result?.body) {
                const blob = await result.body.blob();
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = async () => {
                    const base64data = reader.result as string;
                    setImg(base64data)
                };
                }
                //console.log("result",result);
                return img
            } catch (error) {
                console.log('Error ', error);
            }
})

export { uploadImgToS3 , dowloadImgFromS3 }