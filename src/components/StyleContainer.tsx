// components/StyledContainers.js
import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import ProfileImage from "./ProfileImage";
import { useAppDispatch, useAppSelector } from "../hook";
import { fetchMyUser } from "../store/thunks/userThunk";



export function StyledContainer({ children }) {

    const userInfo = useAppSelector(state => state.users.myUser)
    const dispatch = useAppDispatch()

    useEffect(() => {
        //dispatch(fetchMyUser())
        const fetch = async () => {
            await dispatch(fetchMyUser())
        }
        fetch()
    }, [])

    return (
        <ScrollView style={{flex: 1, backgroundColor: "#004d26"}}>
            <View style={styles.container}>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, right: 40, position: 'absolute' }}>
                    {
                        userInfo && (
                            <><ProfileImage size={20} src={userInfo.profile}></ProfileImage><Text style={{ color: 'white', marginLeft: 5 }}>{userInfo.id}</Text></>
                        )
                    }
                </View>
                {children}
            </View>
        </ScrollView>
    );
}

export function StyledHomeBox({ children }) {
    return <View style={styles.homeBox}>{children}</View>;
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
        marginTop: 40,
        display: 'flex',
        alignItems: 'center'
    },
});
