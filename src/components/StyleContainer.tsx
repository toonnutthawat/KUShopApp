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
        <View className="flex-1 bg-kuBGColor p-4 pt-10">
            <View className="flex-1 bg-kuBGColor p-4 pt-10 mt-2">
                <View className="flex-row absolute right-10 mt-2">
                      {userInfo && (
                        <>
                          <ProfileImage size={20} />
                          <Text className="text-white ml-2 mt-1">{userInfo.id}</Text>
                        </>
                      )}
                </View>
                {children}
            </View>
        </View>
    );
}

export function StyledHomeBox({ children }) {
    return <View className="flex-1 w-full max-w-md bg-kuColor rounded-2xl p-4 pt-10 flex-1">{children}</View>;
}