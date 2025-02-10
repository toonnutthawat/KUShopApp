import React from 'react'
import {Pressable ,StyleSheet, Text, View } from 'react-native'
import { theme } from '../constants/theme'
import Icon from '../../assets/icons'
import { useNavigation } from "@react-navigation/native";


const BackButton = ({size = 26}) => {
    const navigation = useNavigation();

    return (
        <Pressable style = {styles.button} onPress={() => navigation.goBack()}> 
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
