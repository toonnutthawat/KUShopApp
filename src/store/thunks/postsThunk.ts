import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPost, deletePost } from "../../graphql/mutations";
import { getCurrentUser } from "aws-amplify/auth";
import { getUser, listPosts } from "../../graphql/queries";
import { Post, User } from "../../API";

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
    const userPromises = response.data.listPosts.items.map(async (post) => {
        const userResponse = await client.graphql({
            query: getUser,
            variables: { id: post.userID }
        });
        return { ...post, user: userResponse.data.getUser as User}; // Merge user details into post
    });
    const postsWithUsers = await Promise.all(userPromises);
   
    return postsWithUsers
})

const fetchAllPosts = createAsyncThunk("fetchAllPosts" , async () => {
    const response = await client.graphql({
        query: listPosts,
    })
    const userPromises = response.data.listPosts.items.map(async (post) => {
        const userResponse = await client.graphql({
            query: getUser,
            variables: { id: post.userID }
        });
        return { ...post, user: userResponse.data.getUser as User}; // Merge user details into post
    });
    const postsWithUsers = await Promise.all(userPromises);
    
    return postsWithUsers
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