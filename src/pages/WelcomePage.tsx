import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from "@react-navigation/native";
import React from 'react';
import { Image, StyleSheet, Pressable, Text, View, TextStyle } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';
import Button from '../components/Button';
import { useRouter } from 'expo-router';

const Welcome: React.FC = () => {
    const navigation = useNavigation();

    return (
        <ScreenWrapper bg= {theme.colors.kuColor}>
            <StatusBar style="dark" />
            <View style={styles.container}>
                {/* Welcome Image */}
                <Image 
                    style={styles.welcomeImage} 
                    resizeMode="contain" 
                    source={require('../../assets/kuLogoEdit.png')} 
                />

                {/* Title & Punchline */}
                <View style={{gap:20}}>
                    <Text style={styles.title}>Welcome to KUShop Secondhand store!</Text>
                    <Text style={styles.punchline}>
                        a place where you can buy cheap and reasonable price items!
                    </Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Button
                        title="Getting Started"
                        buttonStyle={{ marginHorizontal: wp(3) }}
                        onPress={() => navigation.navigate("SignUp" as never)}
                    />
                    <View style={styles.bottomTextContainer}>
                        <Text style={styles.loginText}>Already have an account?</Text>
                        <Pressable onPress={() => navigation.navigate("Login" as never)}> 
                            <Text 
                                style={[styles.loginText, { color: theme.colors.primaryDark, fontWeight: "600" }]}
                            >
                                Login
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container:{
        flex : 1,
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor: theme.colors.kuColor,
        marginHorizontal: wp(4)
    },
    welcomeImage:{
        height: hp(30),
        width : wp(100),
        alignSelf:'center',
    },
    title:{
        color: theme.colors.text,
        fontSize : hp(4),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold as TextStyle['fontWeight'],
    },
    punchline:{
        textAlign: 'center',
        paddingHorizontal:wp(10),
        fontSize : hp(1.7),
        color: theme.colors.text
    },
    footer:{
        gap:30,
        width:'100%'
    },
    bottomTextContainer:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        gap: 5
    },
    loginText:{
        textAlign:'center',
        color : theme.colors.text,
        fontSize: hp(1.6),
    }
})