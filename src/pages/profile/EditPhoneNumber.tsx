import { Alert,TextInput, View ,Text, TouchableOpacity} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hook";
import { hp } from "../../helpers/common";
import { useState } from "react";
import {
    sendUserAttributeVerificationCode,
    type VerifiableUserAttributeKey
  } from 'aws-amplify/auth';
import {
    confirmUserAttribute,
    updateUserAttribute,
    type UpdateUserAttributeOutput
  } from 'aws-amplify/auth';
import { changePhoneNumber, fetchMyUser } from "../../store/thunks/userThunk";

function EditPhoneNumber({handleEditPhone}){
    const userInfo = useAppSelector(state => state.users.myUser)
    const [phone , setPhone] = useState("")
    console.log(phone);
    
    const [phoneVerified, setPhoneVerified] = useState(false)
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const dispatch = useAppDispatch()
    const [errorMessage, setErrorMessage] = useState("");

    // Function to validate Thai phone number format
    const validatePhoneNumber = () => {
    // Regular expression for a valid Thai phone number
    const thaiPhoneRegex = /^(0[689]\d{8})$/;

    if (thaiPhoneRegex.test(phone)) {
        // Convert the phone number to E.164 format
        const formattedPhone = `+66${phone.substring(1)}`;
        setErrorMessage("");
        Alert.alert(
            "Confirm", // Title
            "คุณต้องการเปลี่ยนเบอร์โทรศัพท์ใช่หรือไม่?", // Message
            [
                {
                    text: "ยกเลิก",
                    style: "cancel",
                },
                {
                    text: "ตกลง",
                    onPress: () => {
                        console.log("User confirmed!");
                        handleUpdateUserAttribute(formattedPhone);
                    },
                },
            ],
            { cancelable: false }
        );
    } else {
        setErrorMessage("Invalid phone number format. Example: 0812345678");
    }
};


    async function handleUpdateUserAttribute(formattedPhone : string) {
        try {
            const output = await updateUserAttribute({
                userAttribute: {
                    attributeKey: "phone_number",
                    value: formattedPhone
                }
            });
            handleUpdateUserAttributeNextSteps(output);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleUpdateUserAttributeNextSteps(output: UpdateUserAttributeOutput) {
        const { nextStep } = output;
        console.log(nextStep);
        if (nextStep.updateAttributeStep === 'CONFIRM_ATTRIBUTE_WITH_CODE') {
            console.log(`Confirmation code sent to ${nextStep.codeDeliveryDetails?.deliveryMedium}.`);
            setOtpSent(true);
        } else if (nextStep.updateAttributeStep === 'DONE') {
            console.log("Phone number was successfully updated.");
            await dispatch(changePhoneNumber({phoneNumber: phone}))
            await dispatch(fetchMyUser())
            //handleSendUserAttributeVerificationCode("phone_number")
            setPhoneVerified(true);
            handleEditPhone()
        }
    }

    // async function handleSendUserAttributeVerificationCode(
    //     key: VerifiableUserAttributeKey
    //   ) {
    //     try {
    //       await sendUserAttributeVerificationCode({
    //         userAttributeKey: key
    //       });
    //       setOtpSent(true);
    //       console.log("sent success");

    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    // async function handleConfirmOtp() {
    //     try {
    //         await confirmUserAttribute({
    //             userAttributeKey: "phone_number",
    //             confirmationCode: otp,
    //         });
    //         alert("Phone number verified successfully!");
    //         await dispatch(changePhoneNumber({phoneNumber: phone}))
    //         await dispatch(fetchMyUser())
    //         handleEditPhone()
    //     } catch (error) {
    //         console.log(error);
    //         setErrorMessage("Invalid OTP. Please try again.");
    //     }
    // }

    return(
        <View className="mt-4">
            <View>
                <View>
                    <Text className = 'mt-2'style={{ textAlign: "center", width: "100%",fontSize: 18, fontWeight:'500' }}>แก้ไขเบอร์โทรศัพท์</Text>
                    <TextInput
                        className="bg-white rounded-lg"
                        style={{
                            backgroundColor: "#fff",
                            padding: 10,
                            borderRadius: 8,
                            alignItems: "center",
                            marginTop: 10,
                            width :hp(30)
                        }}
                        value={phone}
                        onChangeText={(value) => setPhone(value)}
                        placeholder="กรอกเบอร์โทรศัพท์ใหม่"
                        keyboardType="phone-pad"
                        
                    >    
                    </TextInput>
                    {errorMessage ? <Text style={{ color: "red", marginTop: 4, width: hp(30) }}>{errorMessage}</Text> : null}
                </View>
                <TouchableOpacity
                    onPress={validatePhoneNumber}
                    style={{
                        backgroundColor: "#004c27",
                        padding: 10,
                        borderRadius: 8,
                        alignItems: "center",
                        marginTop: 10
                    }}
                >
                        <Text style={{ color: "white", fontWeight: "bold" }}>ยืนยัน</Text>
                    </TouchableOpacity>
                </View>
            
        </View>
    )
}

export default EditPhoneNumber;