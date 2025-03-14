import React from 'react'
import {Pressable ,StyleSheet, Text, ViewStyle } from 'react-native'
import { theme } from '../constants/theme'
import Icon from '../../assets/icons'
import { useNavigation } from "@react-navigation/native";

interface BackButtonProps {
    size?: 26,
    backButtonStyle?: ViewStyle;
    navigatedPath?: String | null;
}
const BackButton: React.FC<BackButtonProps> = ({size = 26, backButtonStyle , navigatedPath}) => {
    const navigation = useNavigation();

    return (
        <Pressable style = {[styles.button, backButtonStyle]} onPress={!navigatedPath ? () => navigation.goBack() : () => navigation.navigate(`${navigatedPath}` as never)}> 
            <Icon name = "arrowLeft" strokeWidth= {2.5} size = {size} color = {theme.colors.text}></Icon>
        </Pressable>
    ) 
}

export default BackButton

const styles = StyleSheet.create({
    button : {
        alignSelf :'flex-start',
        padding : 5,
        borderRadius: theme.radius.sm,
        backgroundColor: 'rgba(0,0,0,0.07)'
    }
})
