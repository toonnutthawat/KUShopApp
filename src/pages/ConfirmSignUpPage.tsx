import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { confirmSignUp } from "aws-amplify/auth";
import { useNavigation } from "@react-navigation/native";
import KuShopTitle from "../components/KuShopTitle";
import { useAppDispatch } from "../hook";
import { addUser } from "../store/thunks/userThunk";
import { StyledContainer, StyledHomeBox } from "../components/StyleContainer";

function ConfirmSignUpPage({ username , email}: { username: string , email: string}) {
    const [otp, setOtp] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigation = useNavigation();
    const dispatch = useAppDispatch()

    const handleConfirmSignUp = async () => {
        try {
            const { nextStep } = await confirmSignUp({
                username: username,
                confirmationCode: otp,
            });

            if (nextStep.signUpStep === "DONE") {
                dispatch(addUser({usernameOfUser: username , emailOfUser: email}))
                navigation.navigate("Login" as never);
            }
        } catch (e) {
            setErrorMessage((e as Error).message);
        }
    };

    return (
        <StyledContainer>
            <StyledHomeBox>
            <View style={styles.container}>
            <KuShopTitle title="Confirm Sign Up" />
            <View style={styles.card}>            
                <TextInput
                    placeholder="Enter OTP"
                    value={otp}
                    onChangeText={(value) => setOtp(value)}
                    style={styles.input}
                />
            </View>
            {errorMessage && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
            )}
            <TouchableOpacity
                style={[styles.button, otp === "" && styles.disabledButton]}
                disabled={otp === ""}
                onPress={handleConfirmSignUp}
            >
                <Text style={styles.buttonText}>Confirm Sign Up</Text>
            </TouchableOpacity>
        </View>
            </StyledHomeBox>
        </StyledContainer>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    card: {
        backgroundColor: "#ffffff",
        width: "85%",
        borderRadius: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        fontSize: 16,
        paddingVertical: 5,
        color: "#333",
    },
    errorContainer: {
        marginTop: 10,
    },
    errorText: {
        color: "red",
        fontSize: 14,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#129601",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        width: "85%",
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: "#a0c6a0",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ConfirmSignUpPage;