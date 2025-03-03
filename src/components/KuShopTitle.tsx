import { View, Text, Image } from "react-native";

function KuShopTitle({ title }: { title: string }) {
    return (
        <View className="items-center mt-5">
            <Image
                source={require('../../assets/KULogo.png')}
                className="w-24 h-24 object-contain mr-3" // Add margin-right for spacing
            />
            <Text className="text-black text-5xl text-center"> 
                  {title}
            </Text>
        </View>
    );
}



export default KuShopTitle;