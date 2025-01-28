import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPost, deletePost } from "../../graphql/mutations";
import { getCurrentUser } from "aws-amplify/auth";
import { listPosts } from "../../graphql/queries";

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

const fetchMyPosts = createAsyncThunk("fetchMyPosts", async () => {
    const user = await getCurrentUser()
    const response = await client.graphql({
        query: listPosts,
        variables: {
            filter: {
                userID : { 
                    eq : user.username
                }
            }
        }
    })
    console.log("response :", response.data.listPosts.items);
    return response.data.listPosts.items
})

const fetchAllPosts = createAsyncThunk("fetchAllPosts" , async () => {
    const response = await client.graphql({
        query: listPosts,
    })
    return response.data.listPosts.items
})

const removePost = createAsyncThunk("removePost", async (id: string) => {
    const response = await client.graphql({
        query: deletePost,
        variables: {
            input: {id}
        }
    })
    return response.data.deletePost
})

export { addPost , fetchMyPosts , fetchAllPosts , removePost}