import { useNavigation } from "@react-navigation/native";
import { View, TextInput, Text, TouchableOpacity, TextStyle, StyleSheet, Pressable } from "react-native";
import { Alert } from 'react-native'
import { useState } from "react";
import { signIn, signOut } from "aws-amplify/auth";
import KuShopTitle from "../components/KuShopTitle";
import Button from "../components/Button";
import Input from "../components/Input";
import { StatusBar } from 'expo-status-bar'
import ScreenWrapper from "../components/ScreenWrapper";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import Icon from "../../assets/icons";
import BackButton from "../components/BackButton";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleSignIn = async () => {

        if(!username.trim() || !password.trim()){
            Alert.alert('Login', "please fill all the fields!")
            return;
        }
        setLoading(true);
        await signOut()
        try {
            const response = await signIn({
                username: username,
                password: password,
                options: {
                    authFlowType: "USER_PASSWORD_AUTH",
                },
            });
            if (response.isSignedIn) {
                navigation.navigate("Home" as never);
                console.log("Success");
            } else {
                console.log("Fail to login");
                setErrorMessage("Fail to login");
            } setLoading(false);
        } catch (e) {
            setErrorMessage((e).message);
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper bg = {theme.colors.kuColor}> 
            <StatusBar style = "dark"></StatusBar>
            <View style = {styles.container}>
            <BackButton/>

                {/* Welcome */}
                <View>
                    <Text style ={styles.welcomeText}>สวัสดี,</Text>
                    <Text style ={styles.welcomeText}>ยินดีต้อนรับ!</Text>
                </View>

                {/* form */}
                <View style = {styles.form}>
                <Input
                    icon = {<Icon name = "user" size = {26} strokeWidth = {1.6} />}
                    placeholder="ชื่อผู้ใช้"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#555"
                />
                <Input
                    icon = {<Icon name = "lock" size = {26} strokeWidth = {1.6} />}
                    placeholder="รหัสผ่าน"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#555"
                />
                </View>
                {errorMessage && <Text className="text-red-600 text-center mb-2">{errorMessage}</Text>}
                <Button buttonStyle = {styles.chatButton} title = {'เข้าสู่ระบบ'}  loading = {loading} onPress={handleSignIn}/>
                {/* <TouchableOpacity className="mt-4" onPress={() => navigation.navigate("SignUp" as never)}>
                    <Text className="text-blue-600 font-semibold text-center">Don't have an account? Sign Up</Text>
                </TouchableOpacity>
                <Pressable onPress={() => navigation.navigate("SignUp" as never)}>
                        <Text style={[styles.footerText, {color:theme.colors.primaryDark,fontWeight: theme.fonts.semibold as TextStyle['fontWeight']}]}>Sign up</Text>
                </Pressable> */}

                {/* footer */}
                <View style={styles.footer}>
                    <Text style = {styles.footerText}>
                        ยังไม่มีบัญชี?
                    </Text>
                    <Pressable onPress={() => navigation.navigate("SignUp" as never)}>
                        <Text style={[styles.footerText, {color:theme.colors.primaryDark,fontWeight: theme.fonts.semibold as TextStyle['fontWeight']}]}>สร้างบัญชีเลย!</Text>
                    </Pressable>
                </View>
            </View>
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
    chatButton:{
        backgroundColor: theme.colors.primary
    }
})

export default Login;