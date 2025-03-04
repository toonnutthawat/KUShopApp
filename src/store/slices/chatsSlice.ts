import { createSlice } from "@reduxjs/toolkit";
import { Chat, Product } from "../../API";
import { addProductWithChat, fetchAllChats, fetchMyChat, fetchProductWithinChat, removeProductWithinChat } from "../thunks/chatsThunk";

const chatsSlice = createSlice({
    name: "chats",
    initialState: {
        allChats: null as Chat[] | null,
        myChat: null as Chat | null,
        productWithinChat: null as Product | null,
        error: ""
    },
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchMyChat.fulfilled, (state,action) => {
            state.myChat = action.payload as Chat
        })
        builder.addCase(fetchMyChat.rejected, (state) => {
            console.log("error to fetchMyChat");
        })
        builder.addCase(fetchAllChats.fulfilled, (state,action) => {
            state.allChats = action.payload as Chat[]
        })
        builder.addCase(fetchAllChats.rejected, (state) => {
            console.log("error to fetchAllChats");
        })
        builder.addCase(addProductWithChat.fulfilled, (state,action) => {
            console.log("action.payload",action.payload);
            state.myChat.ProductID = action.payload.ProductID
            state.myChat = action.payload as Chat
            console.log("state.myChat : ",state.myChat);
        })
        builder.addCase(addProductWithChat.rejected, (state,action) => {
            console.log("fail to addProductWithChat");
            console.log((action.error as Error).message);
        })
        builder.addCase(removeProductWithinChat.fulfilled, (state,action) => {
            const index = state.allChats.findIndex((chat) => chat.id === action.payload.id)
            state.allChats[index].ProductID = null
          })
          builder.addCase(removeProductWithinChat.rejected, (state,action) => {
            console.log((action.error as Error).message);
          })
        builder.addCase(fetchProductWithinChat.fulfilled, (state, action) => {
            state.productWithinChat = action.payload as Product
        })
        builder.addCase(fetchProductWithinChat.rejected, (state, action) => {
            console.log((action.error as Error).message);
        })
    }
})

export const chatReducer = chatsSlice.reducer;