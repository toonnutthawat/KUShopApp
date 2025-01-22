// components/StyledContainers.js
import React from "react";
import { View, StyleSheet } from "react-native";

export function StyledContainer({ children }) {
    return <View style={styles.container}>{children}</View>;
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
        marginTop: 20,
        display: 'flex',
        alignItems: 'center'
    },
});
