import { useState } from "react";
import { View, Image, Text, StyleSheet, TextInput, Button } from "react-native";
import { confirmSignUp } from "aws-amplify/auth";
import { useNavigation } from "@react-navigation/native";
function ConfirmSignUpPage({ username }: { username: string }) {
    const [otp, setOtp] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigation = useNavigation()

    const handleConfirmSignUp = async () => {
        try{
            const { nextStep} = await confirmSignUp({
                username: username,
                confirmationCode: otp
            })
            if(nextStep.signUpStep === "DONE"){
                navigation.navigate("Login" as never)
            }
        }
        catch(e){
            setErrorMessage((e as Error).message)
        }
    }

    return (
        <View>
            <View style={{ marginLeft: 1, backgroundColor: 'white', width: 300, borderRadius: 10, marginTop: 20 }}> 
                <TextInput
                    placeholder="otp"
                    value={otp}
                    onChangeText={(value) => setOtp(value)}>
                </TextInput>
            </View>
            {errorMessage && (
                    <View style={{marginTop: 10}}>
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                )}
            <View style={{ marginTop: 20 }}>
                    <Button title="confirm signUp" disabled={(otp === "")} onPress={handleConfirmSignUp}></Button>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100
    },
    errorText : {
        color: 'red',
        fontSize: 14
    }
})

export default ConfirmSignUpPage;