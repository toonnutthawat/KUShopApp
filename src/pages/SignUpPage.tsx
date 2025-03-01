import { View, TextInput, Text, TouchableOpacity, StyleSheet, TextStyle, Pressable } from "react-native";
import { StatusBar } from 'expo-status-bar'
import { signUp } from "aws-amplify/auth";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ConfirmSignUpPage from "./ConfirmSignUpPage";
import KuShopTitle from "../components/KuShopTitle";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import ScreenWrapper from "../components/ScreenWrapper";
import BackButton from "../components/BackButton";
import Input from "../components/Input";
import Icon from "../../assets/icons";
import Button from "../components/Button";

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmSignUp, setConfirmSignUp] = useState(false);
    const navigation = useNavigation();

    const handleSignUp = async () => {
        try {
            const { nextStep } = await signUp({
                username: username,
                password: password,
                options: {
                    userAttributes: {
                        email: email,
                    },
                },
            });
            if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
                setConfirmSignUp(true);
            }
        } catch (e) {
            setErrorMessage((e as Error).message);
        }
    };

    return (
        <ScreenWrapper bg = {theme.colors.kuColor}>
            <StatusBar style = "dark"></StatusBar>
                {confirmSignUp ? (
                    <ConfirmSignUpPage username={username}  email={email}/>
                ) : (
                    
                    <View style = {styles.container}>
                        <BackButton/>
                            <View>
                                <Text style ={styles.welcomeText}>Let's</Text>
                                <Text style ={styles.welcomeText}>Get Started</Text>
                            </View>

                        <View style = {styles.form}>
                            <Input
                                icon = {<Icon name = "mail" size = {26} strokeWidth = {1.6} />}
                                autoComplete="email"
                                keyboardType="email-address"
                                placeholder="Email"
                                value={email}
                                onChangeText={(value) => setEmail(value)}     
                                placeholderTextColor="#555"
                            />
                            <Input
                                icon = {<Icon name = "user" size = {26} strokeWidth = {1.6} />}
                                placeholder="Username"
                                value={username}
                                onChangeText={(value) => setUsername(value)}
                                placeholderTextColor="#555"
                            />
                            <Input
                                icon = {<Icon name = "lock" size = {26} strokeWidth = {1.6} />}
                                placeholder="Password"
                                value={password}
                                secureTextEntry={true}
                                onChangeText={(value) => setPassword(value)}
                                placeholderTextColor="#555"
                            />
                            <Input
                                icon = {<Icon name = "lock" size = {26} strokeWidth = {1.6} />}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                secureTextEntry={true}
                                onChangeText={(value) => setConfirmPassword(value)}
                                placeholderTextColor="#555"
                            />
                            {errorMessage && <Text className="text-red-500 mb-4">{errorMessage}</Text>}
                            
                            {/* button */}
                            <Button title = {'Sign up'}  onPress = {handleSignUp}/>

                            {/* footer */}
                            <View style={styles.footer}>
                                <Text style = {styles.footerText}>
                                    Already have an account!
                                </Text>
                                <Pressable onPress={() => navigation.navigate("Login" as never)}>
                                    <Text style={[styles.footerText, {color:theme.colors.primaryDark,fontWeight: theme.fonts.semibold as TextStyle['fontWeight']}]}>Login</Text>
                                </Pressable>
                            </View>

                        </View>      
                    </View>
                ) 
            }        
    </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        gap:45,
        paddingHorizontal:wp(5),
    },
    welcomeText:{
        fontSize: hp(4),
        fontWeight: theme.fonts.bold as TextStyle['fontWeight'],
        color: theme.colors.text,
    },
    form:{
        gap:25,
    },
    forgotPassword:{
        textAlign: 'right',
        fontWeight: theme.fonts.semibold as TextStyle['fontWeight'],
        color:theme.colors.text,
    },
    footer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        gap:5,
    },
    footerText:{
        textAlign: 'center',
        color : theme.colors.text,
        fontSize: hp(1.6)
    },
    button: {
        backgroundColor: theme.colors.primary,
        height: hp(6.6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.radius.xl
    },
    text: {
        fontSize: hp(2.5),
        color: 'white',
        fontWeight: theme.fonts.bold as TextStyle['fontWeight'],
    },
})

export default SignUpPage;