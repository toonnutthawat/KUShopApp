import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, listMessages } from "../../graphql/queries";
import { createMessage } from "../../graphql/mutations";
import { getCurrentUser } from "aws-amplify/auth";
import { User } from "../../API";

const client = generateClient()

const fetchMessage = createAsyncThunk("fetchMessages" , async (chatID : string) => {
    const response = await client.graphql({
        query: listMessages,
        variables: {
            filter: {
                chatID: {
                    eq: chatID
                }
            }
        }
    })

    const userPromises = response.data.listMessages.items.map(async (post) => {
            const userResponse = await client.graphql({
                query: getUser,
                variables: { id: post.userID }
            });
            return { ...post, user: userResponse.data.getUser as User}; // Merge user details into post
    });
    const messagesWithUsers = await Promise.all(userPromises);
    return messagesWithUsers
})

const addMesage = createAsyncThunk("addMessage" , async ({chatID , messageContent, imgPath} : {chatID : string , messageContent : string, imgPath?: string | null }) => {
    const user = await getCurrentUser()
    const response = await client.graphql({
        query: createMessage,
        variables: {
            input: {
                content: messageContent,
                userID: user.username,
                chatID: chatID,
                image: imgPath
            }
        }
    })


    return response.data.createMessage
})

export { fetchMessage , addMesage }