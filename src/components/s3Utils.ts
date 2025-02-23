import { downloadData } from 'aws-amplify/storage';
import { useEffect } from 'react';
import { fetchAllPosts, fetchMyPosts } from '../store/thunks/productsThunk';
import { useAppDispatch } from '../hook';

export async function fetchedImageFromS3(src?: string): Promise<string | null> {

    const dispatch = useAppDispatch()

    if (!src) return null;
    try {
        const result = await downloadData({ path: src }).result;
        if (result?.body) {
            const blob = await result.body.blob();
            const reader = new FileReader();
            return new Promise((resolve) => {
                reader.readAsDataURL(blob);
                reader.onloadend = () => resolve(reader.result as string);
            });
        }
        console.log("result", result);
    } catch (error) {
        console.log('Error fetching image from S3: ', error);
    }
    return null;
}
