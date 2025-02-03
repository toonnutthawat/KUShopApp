import { useNavigation } from "@react-navigation/native";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { signIn, signOut } from "aws-amplify/auth";
import KuShopTitle from "../components/KuShopTitle";

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
            setErrorMessage((e).message);
        }
    };

    return (
        <View className="flex-1 bg-kuColor items-center justify-center p-4 pt-10 "> 
            <View className="bg-kuColor w-full h-full rounded-2xl p-6 ">
                <KuShopTitle title="LOGIN" />
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    className="bg-gray-100 rounded-xl h-12 px-4 mb-4 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300"
                    placeholderTextColor="#555"
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    className="bg-gray-100 rounded-xl h-12 px-4 mb-4 border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300"
                    placeholderTextColor="#555"
                />
                {errorMessage && <Text className="text-red-600 text-center mb-2">{errorMessage}</Text>}
                <TouchableOpacity className="bg-green-700 py-3 rounded-md items-center mt-2 shadow-md" onPress={handleSignIn}>
                    <Text className="text-white font-bold text-lg">Login</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-blue-500 py-3 rounded-md items-center mt-4 shadow-md" onPress={handleSignOut}>
                    <Text className="text-white font-bold">Sign Out</Text>
                </TouchableOpacity>
                <TouchableOpacity className="mt-4" onPress={() => navigation.navigate("SignUp" as never)}>
                    <Text className="text-blue-600 font-semibold text-center">Don't have an account? Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Login;