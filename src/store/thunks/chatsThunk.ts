import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getChat, getUser, listChats } from "../../graphql/queries";
import { getCurrentUser } from "aws-amplify/auth";
import { createChat } from "../../graphql/mutations";
import { User } from "../../API";

const client = generateClient()

const fetchMyChat = createAsyncThunk("fetchMyChat", async (friendID : string) => {
    const user = await getCurrentUser()
    const response1 = await client.graphql({
        query: getChat,
        variables: {
            id: user.username + ":" + friendID
        }
    })

    const response2 = await client.graphql({
        query: getChat,
        variables: {
            id: friendID + ":" + user.username
        }
    })

    if(response1.data.getChat !== null) {
        console.log(response1);
        return response1.data.getChat
    }

    else if(response2.data.getChat !== null) {
        console.log(response2);
        return response2.data.getChat
    }
    
    else{
        const response = await client.graphql({
            query: createChat,
            variables: {
                input: {
                    userID2: friendID,
                    id: user.username + ":" + friendID,
                    userID: user.username
                }
            }
        })
        console.log(response);
        return response.data.createChat
    }
})

const fetchAllChats = createAsyncThunk("fetchAllChats", async () => {
    const user = await getCurrentUser()
    const response = await client.graphql({
        query: listChats,
        variables: {
            filter: { 
                or: [
                    { userID: { eq: user.username } },
                    { userID2: { eq: user.username } }
                ] 
            }
            
        }
    })
        const userPromises = response.data.listChats.items.map(async (post) => {
            const userResponse = await client.graphql({
                query: getUser,
                variables: { id: post.userID }
            });
            const userResponse2 = await client.graphql({
                query: getUser,
                variables: { id: post.userID2 }
            });
            
            return { ...post, user: userResponse.data.getUser ,user2: userResponse2.data.getUser}; // Merge user details into post
        });
        const chatsWithUsers = await Promise.all(userPromises);

        //console.log(chatsWithUsers);
        
    return  chatsWithUsers
})

export { fetchMyChat , fetchAllChats }