import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getChat, listChats } from "../../graphql/queries";
import { getCurrentUser } from "aws-amplify/auth";
import { createChat } from "../../graphql/mutations";

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
    console.log("allPost :", response.data.listChats.items);
    return response.data.listChats.items
})

export { fetchMyChat , fetchAllChats }