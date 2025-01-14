import { View , Text , Image , StyleSheet} from "react-native";

function KuShopTitle({title} : {title: string}) {
    return (
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/KULogo.png')} style={styles.logo} />
                    <Text style={styles.title}>{title}</Text>
                </View>
    )
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center', // Center the logo and title horizontally
        marginBottom: 20, // Add spacing below the logo-title section
        marginTop : 10
    },
    logo: {
        width: 100, // Adjust width of the logo
        height: 100, // Adjust height of the logo
        resizeMode: 'contain', // Maintain the aspect ratio of the logo
    },
    title: {
        color: 'black',
        fontSize: 40,
        marginTop: 10, // Add spacing between the logo and title
        textAlign: 'center',
    },
});

export default KuShopTitle;