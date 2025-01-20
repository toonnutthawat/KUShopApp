import { View , Image, StyleSheet } from "react-native";
import { downloadData } from 'aws-amplify/storage';
import { getProperties } from 'aws-amplify/storage';
import { useEffect, useState } from "react";

function ProfileImage({size , src } : { size: number, src?: string | null}){

    const styles = StyleSheet.create({
        profile : {
            width: size,
            height: size,
            borderRadius: 50
        }
    })

    const [img , setImg] = useState()

    useEffect(() => {
        const fetch = async () => {
            await setImage()
        }
        fetch()
    },[])

    async function setImage(){
        if(src){
            try {
                const result = await getProperties({
                  path: src,
                  // Alternatively, path: ({identityId}) => `protected/${identityId}/album/2024/1.jpg`
                });
                console.log('File Properties ', result);
              } catch (error) {
                console.log('Error ', error);
              }
        }
    }

    return(
        <View>
            {
                src ? <Image>

                </Image>
 
                :

                <Image style={styles.profile} source={require("../../assets/profile.jpeg")}>

                </Image>
            }
        </View>
    )
}


export default ProfileImage;