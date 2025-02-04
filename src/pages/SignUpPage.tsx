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
        <View className="flex-1 bg-kuBGColor items-center justify-center p-4 pt-10">
            {confirmSignUp ? (
                <ConfirmSignUpPage username={username}  email={email}/>
            ) : (
                <View className="bg-kuColor w-full h-full rounded-2xl p-6">
                    <KuShopTitle title="SIGN UP" />
                    <TextInput
                        autoComplete="email"
                        keyboardType="email-address"
                        placeholder="Email"
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        className="bg-gray-100 rounded-xl h-12 px-4 mb-4 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300"
                        placeholderTextColor="#555"
                    />
                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={(value) => setUsername(value)}
                        className="bg-gray-100 rounded-xl h-12 px-4 mb-4 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300"
                        placeholderTextColor="#555"
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(value) => setPassword(value)}
                        className="bg-gray-100 rounded-xl h-12 px-4 mb-4 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300"
                        placeholderTextColor="#555"
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        secureTextEntry={true}
                        onChangeText={(value) => setConfirmPassword(value)}
                        className="bg-gray-100 rounded-xl h-12 px-4 mb-4 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300"
                        placeholderTextColor="#555"
                    />
                    {errorMessage && <Text className="text-red-500 mb-4">{errorMessage}</Text>}
                    <TouchableOpacity
                        onPress={handleSignUp}
                        className={`bg-green-500 rounded-lg h-12 justify-center items-center ${
                            confirmPassword !== password || !password
                                ? 'opacity-50'
                                : 'opacity-100'
                        }`}
                        disabled={confirmPassword !== password || !password}
                    >
                        <Text className="text-white font-bold">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

export default SignUpPage;