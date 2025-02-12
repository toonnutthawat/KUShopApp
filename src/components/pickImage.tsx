import * as ImagePicker from "expo-image-picker";

type PickImageFunction = () => Promise<ImagePicker.ImagePickerAsset | null>;

export const pickImage: PickImageFunction = async () : Promise<ImagePicker.ImagePickerAsset> => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        return result.assets[0];
    }
};
