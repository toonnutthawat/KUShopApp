import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useEffect } from "react";
import { changeCreditStatus, fetchPendingStatusUsers } from "../../store/thunks/userThunk";
import ProfileImage from "../../components/ProfileImage";
import { format } from "date-fns";
import { CreditStatus } from "../../API";

function ManageRequest() {
    const requestedUsers = useAppSelector(state => state.users.requestedUser || [])
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchPendingStatusUsers())
        }
        fetch()
    }, [])

    const manageRequest = async (userID: string , status: CreditStatus) => {
        await dispatch(changeCreditStatus({userID: userID , creditStatus: status}))
        await dispatch(fetchPendingStatusUsers())
    }

    const renderedRequestUsers = requestedUsers.map((user, index) => {
        const formattedDate = format(new Date(user.createdAt), 'hh:mm a : PPP');
        return <View key={index} className="bg-white w-64 mb-4 p-8 rounded-lg">
            <View className="flex flex-row">
                <ProfileImage size={20} src={user.profile}></ProfileImage>
                <Text className="ml-4">{user.id}</Text>
            </View>
            <Text className="mt-2">email: {user.email}</Text>
            <Text className="mt-2">status: {user.credit}</Text>
            <Text className="mt-2">createdAt: {formattedDate}</Text>
            <TouchableOpacity
                style={styles.acceptedButton}
                onPress={() => manageRequest(user.id,CreditStatus.ACCEPTED)}>
                <Text className="text-white">accept</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.rejectedButton}
                onPress={() => manageRequest(user.id,CreditStatus.NOT_YET_VERIFIED)}>
                <Text className="text-white">reject</Text>
            </TouchableOpacity>
        </View>
    })

    return (
        <StyledContainer>
            <StyledHomeBox>
                {renderedRequestUsers}
            </StyledHomeBox>
        </StyledContainer>
    )
}

const styles = StyleSheet.create({
    acceptedButton: {
        backgroundColor: 'green',
        width: 60,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
        padding: 8
    },
    rejectedButton: {
        backgroundColor: 'red',
        width: 60,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
        padding: 8
    }
})

export default ManageRequest;