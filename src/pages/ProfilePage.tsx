import { Text, View, StyleSheet } from "react-native";
import KuShopTitle from "../components/KuShopTitle";
import { useAppDispatch, useAppSelector } from "../hook";
import { useEffect } from "react";
import { fetchMyUser } from "../store/thunks/userThunk";

function ProfilePage() {

    const userInfo = useAppSelector(state => state.users.myUser)
    const dispatch = useAppDispatch()
    console.log("userInfo" , userInfo);
    

    useEffect(() => {
        dispatch(fetchMyUser())
        console.log("userInfo" , userInfo);
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.homeBox}>
                <Text>
                  
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#004d26",
        alignItems: "center",
        justifyContent: "flex-start", // Aligns content at the top
    },
    homeBox: {
        backgroundColor: "#d5f0e8",
        width: "85%",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20,
        marginTop: 20
    },

})

export default ProfilePage;