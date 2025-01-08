import { View, Image, Text, StyleSheet, TextInput, Button } from "react-native";
import { signUp } from 'aws-amplify/auth';
import { useState } from "react";
import ConfirmSignUpPage from "./ConfirmSignUpPage";
import KuShopTitle from "../components/KuShopTitle";


function SignUpPage() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [confirmSignUp, setConfirmSignUp] = useState(false)

    const handleSignUp = async () => {
        try {
            const { nextStep } = await signUp({
                username: username,
                password: password,
                options: {
                    userAttributes: {
                        email: email
                    }
                }
            })
            if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
                setConfirmSignUp(true)
            }
        }
        catch (e) {
            setErrorMessage((e as Error).message)
        }
    }

    return (
        <View style={{ display: 'flex', flex: 1, backgroundColor: 'green', alignItems: 'center' }}>
            <KuShopTitle title="SignUp"></KuShopTitle>
            {
                confirmSignUp ? <ConfirmSignUpPage username={username}></ConfirmSignUpPage> :
                    <View>
                        <View style={{ marginLeft: 1, backgroundColor: 'white', width: 300, borderRadius: 10, marginTop: 20 }}>
                            <TextInput
                                autoComplete="email"
                                keyboardType="email-address"
                                placeholder="email"
                                value={email}
                                onChangeText={(value) => setEmail(value)}>
                            </TextInput>
                            <TextInput
                                placeholder="username"
                                value={username}
                                onChangeText={(value) => setUsername(value)}>
                            </TextInput>
                            <TextInput
                                placeholder="password"
                                value={password}
                                secureTextEntry={true}
                                onChangeText={(value) => setPassword(value)}>
                            </TextInput>
                            <TextInput
                                placeholder="confirm password"
                                value={confirmPassword}
                                secureTextEntry={true}
                                onChangeText={(value) => setConfirmPassword(value)}>
                            </TextInput>
                        </View>
                        {errorMessage && (
                            <View style={{marginTop: 10}}>
                                <Text style={styles.errorText}>{errorMessage}</Text>
                            </View>
                        )}
                        <View style={{ marginTop: 20 }}>
                            <Button onPress={handleSignUp} title="sign up" disabled={(confirmPassword !== password || ((password && confirmPassword) === ""))}></Button>
                        </View>
                    </View>
            }
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
        fontSize: 14,
        maxWidth: 300
    }
})

export default SignUpPage;