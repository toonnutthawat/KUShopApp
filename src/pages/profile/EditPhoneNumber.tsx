import { TextInput, View ,Text, TouchableOpacity} from "react-native";
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
        handleUpdateUserAttribute(formattedPhone);
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
           // handleSendUserAttributeVerificationCode("phone_number")
            await dispatch(changePhoneNumber({phoneNumber: phone}))
            await dispatch(fetchMyUser())
            setPhoneVerified(true);
            handleEditPhone()
        }
    }

    async function handleSendUserAttributeVerificationCode(
        key: VerifiableUserAttributeKey
      ) {
        try {
          await sendUserAttributeVerificationCode({
            userAttributeKey: key
          });
        } catch (error) {
          console.log(error);
        }
      }

    async function handleConfirmOtp() {
        try {
            await confirmUserAttribute({
                userAttributeKey: "phone_number",
                confirmationCode: otp,
            });
            alert("Phone number verified successfully!");
            setPhoneVerified(true);
        } catch (error) {
            console.log(error);
            setErrorMessage("Invalid OTP. Please try again.");
        }
    }

    return(
        <View className="mt-4">
            { !phoneVerified ? (
            <View>
                <View>
                    <Text>phone number</Text>
                    <TextInput
                        className="bg-white rounded-lg"
                        style={{ width: hp(30) }}
                        value={phone}
                        onChangeText={(value) => setPhone(value)}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                    >

                    </TextInput>
                    {errorMessage ? <Text style={{ color: "red", marginTop: 4, width: hp(30) }}>{errorMessage}</Text> : null}
                </View><TouchableOpacity
                    onPress={validatePhoneNumber}
                    style={{
                        backgroundColor: "#004c27",
                        padding: 10,
                        borderRadius: 8,
                        alignItems: "center",
                        marginTop: 10
                    }}
                >
                        <Text style={{ color: "white", fontWeight: "bold" }}>Request for verification code</Text>
                    </TouchableOpacity>
                </View>)
            :
            <View>
                {otpSent && (
                        <View>
                            <Text>Enter OTP</Text>
                            <TextInput
                                className="bg-white rounded-lg"
                                style={{ width: hp(30) }}
                                value={otp}
                                onChangeText={(value) => setOtp(value)}
                                placeholder="Enter OTP"
                                keyboardType="number-pad"
                            />
                            <TouchableOpacity
                                onPress={handleConfirmOtp}
                                style={{
                                    backgroundColor: "#004c27",
                                    padding: 10,
                                    borderRadius: 8,
                                    alignItems: "center",
                                    marginTop: 10
                                }}
                            >
                                <Text style={{ color: "white", fontWeight: "bold" }}>
                                    Verify OTP
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
            </View>
            }
        </View>
    )
}

export default EditPhoneNumber;