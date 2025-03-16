import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Alert } from "react-native";
import { confirmSignUp } from "aws-amplify/auth";
import { useNavigation } from "@react-navigation/native";
import KuShopTitle from "../components/KuShopTitle";
import { useAppDispatch } from "../hook";
import { addUser } from "../store/thunks/userThunk";
import { StyledContainer, StyledHomeBox } from "../components/StyleContainer";
import Header from "../components/Header";
import { hp, wp } from "../helpers/common";

function ConfirmSignUpPage({ username , email , phone}: { username: string , email: string , phone: string}) {
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
                dispatch(addUser({usernameOfUser: username , emailOfUser: email, phoneNumber: phone}))
                navigation.navigate("Welcome" as never);
                Alert.alert("สำเร็จ", "ลงทะเบียนสำเร็จ", [{ text: "OK" }]);
            }
        } catch (e) {
            setErrorMessage((e as Error).message);
        }
    };

    return (
        <StyledContainer>
            <Header title="ยืนยัน OTP" showBackButton={false}></Header>
            <View style={styles.container}>
                <KuShopTitle title="" />
                <View style={styles.card}>            
                    <TextInput
                        placeholder="กรอกรหัสยืนยัน OTP"
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
                    <Text style={styles.buttonText}>ยืนยัน OTP</Text>
                </TouchableOpacity>
        </View>
            
        </StyledContainer>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal:wp(5),
        alignItems:'center'
    },
    card: {
        backgroundColor: "#ffffff",
        width: "100%",
        borderRadius: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 20,
        paddingHorizontal: wp(15)
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
        alignItems:'center'
    },
});

export default ConfirmSignUpPage;