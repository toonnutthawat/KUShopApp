import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPost } from "../../graphql/mutations";
import { getCurrentUser } from "aws-amplify/auth";

const client = generateClient({authMode: "userPool"})

const addPost = createAsyncThunk("addPost", async ({titlePost , contentPost} : {titlePost : string , contentPost : string}) => {
    try{
    const user = await getCurrentUser()
    const response = await client.graphql({
        query: createPost,
        variables: {
            input: {
                title: titlePost,
                content: contentPost,
                likes: 0,
                userID: user.username
            }
        }
    })
    console.log(response.data.createPost);
    return response.data.createPost
    }
    catch(e){
        console.log((e as Error).message);
    }
})

export { addPost }