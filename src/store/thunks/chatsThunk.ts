import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getChat, getProduct, getUser, listChats } from "../../graphql/queries";
import { getCurrentUser } from "aws-amplify/auth";
import { createChat, updateChat } from "../../graphql/mutations";
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
        //console.log(response);
        console.log("fetchMyChat");
        
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

const addProductWithChat = createAsyncThunk("addProductWithChat" , async ({chatID , productID}: {chatID : string , productID : string}) => {
    const response = await client.graphql({
        query: updateChat,
        variables: {
            input: {
                id: chatID,
                ProductID: productID
            }
        }
        
    })
    console.log(response);
    fetchMyChat(chatID)
    return response.data.updateChat
    
})

const fetchProductWithinChat = createAsyncThunk("fetchProductWithinChat", async (productID : string) => {
    const response = await client.graphql({
        query: getProduct,
        variables: {
            id: productID
        }
    })
    return response.data.getProduct
})

const removeProductWithinChat = createAsyncThunk("removeProductWithinChat" , async (chatID : string) => {
    try{
    const response = await client.graphql({
        query: updateChat,
        variables: {
            input: {
                id: chatID,
                ProductID: null
            }
        }
    })
    return response.data.updateChat
}catch(e){
    console.log((e as Error).message);
    
}
})


export { fetchMyChat , fetchAllChats , addProductWithChat , fetchProductWithinChat, removeProductWithinChat}