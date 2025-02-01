import { generateClient } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { listMessages } from "../../graphql/queries";
import { createMessage } from "../../graphql/mutations";
import { getCurrentUser } from "aws-amplify/auth";

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
    return response.data.listMessages.items
})

const addMesage = createAsyncThunk("addMessage" , async ({chatID , messageContent} : {chatID : string , messageContent : string}) => {
    const user = await getCurrentUser()
    const response = await client.graphql({
        query: createMessage,
        variables: {
            input: {
                content: messageContent,
                userID: user.username,
                chatID: chatID
            }
        }
    })

    return response.data.createMessage
})

export { fetchMessage , addMesage }