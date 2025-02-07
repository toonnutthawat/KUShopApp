import { View , Text, Button } from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import { useAppDispatch, useAppSelector } from "../../hook";
import { CreditStatus } from "../../API";
import { changeCreditStatus } from "../../store/thunks/userThunk";


function AddProduct(){
    const userInfo = useAppSelector(state => state.users.myUser || null)
    const dispatch = useAppDispatch()

    return(
        <StyledContainer>
            <StyledHomeBox>
                {
                    (userInfo.credit === CreditStatus.NOT_YET_VERIFIED) &&
                    <View>
                        <Text className="text-xl">Your status has not been verified. Please submit a request.</Text>
                        <View className="mt-4">
                            <Button title="request" color="#004c27" onPress={() => dispatch(changeCreditStatus({
                                userID : userInfo.id , creditStatus: CreditStatus.PENDING
                            }))}></Button>
                        </View>
                    </View> 
                }
                {
                    (userInfo.credit === CreditStatus.PENDING) && 
                    <View>
                        <Text className="text-xl">Your status is under review. Please wait for verification from the admin.</Text>
                    </View>
                }
                {
                    (userInfo.credit === CreditStatus.ACCEPTED) && 
                    <View>
                        <Text>Accepted</Text>
                    </View>
                }
            </StyledHomeBox>
        </StyledContainer>
    )
}

export default AddProduct;