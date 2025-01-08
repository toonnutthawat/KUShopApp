import { View , Text , Button, StyleSheet} from "react-native"
import KuShopTitle from "../components/KuShopTitle"
import { getCurrentUser, signOut } from "aws-amplify/auth"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"

function Home(){
    const [user , setUser] = useState("")
    const navigation = useNavigation()

    const getUserInfo = async () => {
        const response = await getCurrentUser()
        setUser(response.username)
    }

    useEffect(() => {
        getUserInfo()
    },[])

    async function handleSignOut(){
        await signOut()
        navigation.navigate("Login" as never)
    }
    return(
        <View style={{display: 'flex',flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: 'green', height: 'auto'}}>
            <KuShopTitle title="Home"/>
            <Text style={styles.username}>{user}</Text>
            <Button title="log out" color="red" onPress={handleSignOut}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    username: {
        fontSize: 20,
        color: 'white',
        marginTop: 20,
        marginBottom: 20
    }
})

export default Home