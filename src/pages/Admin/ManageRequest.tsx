import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useEffect } from "react";
import { changeCreditStatus, fetchPendingStatusUsers } from "../../store/thunks/userThunk";
import ProfileImage from "../../components/ProfileImage";
import { format } from "date-fns";
import { CreditStatus } from "../../API";
import { hp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import Header from "../../components/Header";
import { th } from "date-fns/locale";

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
        // const formattedDate = format(new Date(user.createdAt), 'hh:mm a : PPP');
        const formattedDate = format(new Date(user.createdAt), "dd MMMM yyyy", { locale: th });
        return <View key={index} className='mt-5' style={styles.memberCard}>
                    <View className="flex-row items-center">
                        <ProfileImage size={hp(6)} src={user.profile}></ProfileImage>
                        <Text className="ml-3 mt-2" style={styles.memberId}>{user.id}</Text>
                    </View>
                    <Text className="mt-2" style={styles.textContent}>อีเมล: {user.email}</Text>
                    <Text className="mt-2" style={styles.textContent}>สถานะ: {user.credit}</Text>
                    <Text className="mt-2" style={styles.textContent}>เป็นสมาชิกตั้งแต่: {formattedDate}</Text>
                    {/* เป็นสมาชิกตั้งแต่ {format(new Date(product.user.createdAt), "dd MMMM yyyy", { locale: th })} */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.acceptedButton}
                            onPress={() => manageRequest(user.id,CreditStatus.ACCEPTED)}>
                            <Text className="text-white">อนุมัติ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.rejectedButton}
                            onPress={() => manageRequest(user.id,CreditStatus.NOT_YET_VERIFIED)}>
                            <Text className="text-white">ปฎิเสธ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
    })

    return (
        <StyledContainer>
            <StyledHomeBox>
                <Header title="จัดการคำขอ" showBackButton={false}></Header>
                <ScrollView>
                    {renderedRequestUsers}
                </ScrollView>
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
        padding: 8,
        flex: 1,
        marginRight: 5,
        flexDirection:'row',
        justifyContent:'center'
    },
    memberCard: {
        backgroundColor: '#F5F5F5',
        padding: 25,
        borderRadius: 10,
        elevation: 3, // For Android shadow
        borderColor: 'grey', // Set your desired border color here
        borderWidth: 1, // Set the desired border width
    },
    button:{
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: theme.colors.kuBGColor,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 5,
        flexDirection:'row',
        justifyContent:'center'
    },
    memberId: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 1,
    },
    textContent: {
        fontSize: 16,
        color: 'black',
    },
    rejectedButton: {
        backgroundColor: 'red',
        width: 60,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
        padding: 8,
        flex: 1,
        marginRight: 5,
        flexDirection:'row',
        justifyContent:'center'
    }
})

export default ManageRequest;