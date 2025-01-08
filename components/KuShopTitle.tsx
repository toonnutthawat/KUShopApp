import { View , Text , Image , StyleSheet} from "react-native";

function KuShopTitle({title} : {title: string}) {
    return (
        <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../assets/KULogo.png')} style={styles.logo}></Image>
            <Text style={{ color: 'white', fontSize: 40, marginLeft: 10 }}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100
    }
})

export default KuShopTitle;