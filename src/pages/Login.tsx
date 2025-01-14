import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import KuShopTitle from "../components/KuShopTitle";
import { useState } from "react";
import { signIn, signOut } from "aws-amplify/auth";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigation = useNavigation();

    async function handleSignOut() {
        await signOut();
    }

    const handleSignIn = async () => {
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
            }
        } catch (e) {
            setErrorMessage((e as Error).message);
        }
    };

    return (
        <View style={styles.container}>

            {/* Login Box */}
            <View style={styles.loginBox}>
                <KuShopTitle title="LOGIN" />
                <TextInput
                    placeholder="username"
                    value={username}
                    onChangeText={(value) => setUsername(value)}
                    style={styles.input}
                    placeholderTextColor="#555"
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    style={styles.input}
                    placeholderTextColor="#555"
                />
                {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                {/* Sign Out and Sign Up Buttons */}
                <TouchableOpacity style={styles.signUpButton} onPress={handleSignOut}>
                    <Text style={styles.signUpButtonText}>Sign Out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={() => navigation.navigate("SignUp" as never)}
                >
                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#004d26',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logoText: {
        fontSize: 60,
        color: '#fff',
        fontWeight: 'bold',
    },
    universityName: {
        fontSize: 18,
        color: '#fff',
    },
    loginBox: {
        backgroundColor: '#d5f0e8',
        width: '85%',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 40,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    loginButton: {
        backgroundColor: '#004d26',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    signUpButton: {
        backgroundColor: '#4f87c7',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default Login;