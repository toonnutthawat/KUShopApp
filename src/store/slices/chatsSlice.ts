import { createSlice } from "@reduxjs/toolkit";
import { Chat } from "../../API";
import { fetchAllChats, fetchMyChat } from "../thunks/chatsThunk";

const chatsSlice = createSlice({
    name: "chats",
    initialState: {
        allChats: null as Chat[] | null,
        myChat: null as Chat | null,
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
    }
})

export const chatReducer = chatsSlice.reducer;