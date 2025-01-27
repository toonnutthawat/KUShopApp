import { View, Image, Text, StyleSheet } from "react-native"
import { StyledContainer, StyledHomeBox } from "../../components/StyleContainer";
import AntDesign from '@expo/vector-icons/AntDesign';
import ProfileImage from "../../components/ProfileImage";
import { format } from 'date-fns'
import FontAwesome from '@expo/vector-icons/FontAwesome';

function PostDetail({ route }) {
    const { post } = route.params
    const formattedDate = format(new Date(post.createdAt), 'PPP');
    console.log(post);

    return (
        <StyledContainer>
            <StyledHomeBox>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                    <Image source={require("../../../assets/defaultPostImg.png")} style={{ width: 200, marginTop: 20 }} />
                    <View style={[{ marginBottom: 20 }]}>
                        <Text style={[{ marginTop: 10 }, styles.text]}>หัวข้อ: {post.title}</Text>
                        <Text style={[{ marginTop: 10 }, styles.text]}>รายละเอียด: {post.content}</Text>
                        <Text style={[{ marginTop: 10 }, styles.text]}>โพสต์วันที่: {formattedDate}</Text>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                            <ProfileImage size={20} />
                            <Text style={[{ marginLeft: 10 }, styles.text]}>{post.userID}</Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                            <AntDesign name="like1" size={30} color="#004c27" />
                            <Text style={[{ marginLeft: 10 }, styles.text]}>{post.likes}</Text>
                        </View>
                        <View style={{marginTop: 10}}>
                            <FontAwesome name="comments" size={30} color="#004c27" />
                        </View>
                    </View>
                </View>
            </StyledHomeBox>
        </StyledContainer>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20
    }
})

export default PostDetail