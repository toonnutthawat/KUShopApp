import { View } from "react-native";
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import KuShopTitle from "../../components/KuShopTitle";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";

function AllProducts(){
    const navigation = useNavigation()

    return(
        <StyledContainer>
            <StyledHomeBox>
                    <KuShopTitle title={"Shop"}></KuShopTitle>
                    <MaterialIcons name="post-add" size={30} color="#004c27" className="absolute right-4 top-4" onPress={() => navigation.navigate("AddProduct" as never)}/>
            </StyledHomeBox>
        </StyledContainer>
    )
}

export default AllProducts;