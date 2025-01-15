import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { signUp } from "aws-amplify/auth";
import { useState } from "react";
import ConfirmSignUpPage from "./ConfirmSignUpPage";
import KuShopTitle from "../components/KuShopTitle";

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmSignUp, setConfirmSignUp] = useState(false);

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
        <View style={styles.container}>
            {confirmSignUp ? (
                <ConfirmSignUpPage username={username}  email={email}/>
            ) : (
                <View style={styles.formContainer}>
                    <KuShopTitle title="SIGN UP" />
                    <TextInput
                        autoComplete="email"
                        keyboardType="email-address"
                        placeholder="Email"
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        style={styles.input}
                        placeholderTextColor="#555"
                    />
                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={(value) => setUsername(value)}
                        style={styles.input}
                        placeholderTextColor="#555"
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(value) => setPassword(value)}
                        style={styles.input}
                        placeholderTextColor="#555"
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        secureTextEntry={true}
                        onChangeText={(value) => setConfirmPassword(value)}
                        style={styles.input}
                        placeholderTextColor="#555"
                    />
                    {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
                    <TouchableOpacity
                        onPress={handleSignUp}
                        style={[
                            styles.signUpButton,
                            confirmPassword !== password || !password
                                ? styles.disabledButton
                                : null,
                        ]}
                        disabled={confirmPassword !== password || !password}
                    >
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#004d26",
        alignItems: "center",
        justifyContent: "center",
    },
    formContainer: {
        backgroundColor: "#d5f0e8",
        width: "85%",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 5,
        height: 40,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
    },
    signUpButton: {
        backgroundColor: "#004d26",
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    disabledButton: {
        backgroundColor: "#ccc",
    },
    signUpButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default SignUpPage;