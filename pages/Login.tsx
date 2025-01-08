import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TextInput, Image, Button, Text } from "react-native";
import KuShopTitle from "../components/KuShopTitle";
import { useState } from "react";
import { signIn, signOut } from "aws-amplify/auth";

function Login() {
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigation = useNavigation()

    async function handleSignOut(){
            await signOut()
    }
    

    const handleSignIn = async () => {
        try{
            const response = await signIn({
                username: username,
                password: password,
                options: {
                    authFlowType: "USER_PASSWORD_AUTH"
                }
            })
            if(response.isSignedIn){
                navigation.navigate("Home" as never)
                console.log("Success");
            }
            else{
                console.log("fail to login");
                setErrorMessage("fail to login")
            }
        }
        catch(e){
            setErrorMessage((e as Error).message)
        }
    }

    return (
        <View style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: 'green', height: 'auto' }}>
            <KuShopTitle title="Login" />
            <View style={{ marginLeft: 1, backgroundColor: 'white', width: 300, borderRadius: 10, marginTop: 20 }}>
                <TextInput placeholder="username" value={username} onChangeText={(value) => setUsername(value)}></TextInput>
                <TextInput placeholder="password" secureTextEntry={true} value={password} onChangeText={(value) => setPassword(value)}></TextInput>
            </View>
            {errorMessage && (
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
            )}
            <View style={{ marginTop: 20 }}>
                <Button title="login" color='#129601' onPress={handleSignIn}></Button>
            </View>
            <View style={{ marginTop: 20 }}>
                <Button title="sign Out" color='red' onPress={handleSignOut}></Button>
            </View>
            <View style={{ marginTop: 20 }}>
                <Button title="signup" color='blue' onPress={() => navigation.navigate('SignUp' as never)}></Button>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100
    },
    errorText: {
        color: 'red',
        fontSize: 14
    }
})

export default Login;