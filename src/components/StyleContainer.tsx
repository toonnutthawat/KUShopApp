// components/StyledContainers.js
import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import ProfileImage from "./ProfileImage";
import { useAppDispatch, useAppSelector } from "../hook";
import { fetchMyUser } from "../store/thunks/userThunk";
import ScreenWrapper from "./ScreenWrapper";
import { theme } from "../constants/theme";
import BackButton from "./BackButton";
import { wp } from "../helpers/common";



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
        <ScreenWrapper bg = {theme.colors.kuColor}>
            
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
          
        </ScreenWrapper>
    );
}

export function StyledHomeBox({ children }) {
    return <View style={styles.homeBox}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.kuColor,
        alignItems: "center",
        justifyContent: "flex-start", // Aligns content at the top
    },
    homeBox: {
        backgroundColor: theme.colors.kuColor,
        width: "100%",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        elevation: 5,
        marginBottom: 0,
        marginTop: 30,
        display: 'flex',
        alignItems: 'center'
    },
});