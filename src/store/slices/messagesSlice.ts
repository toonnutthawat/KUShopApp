import { createSlice } from "@reduxjs/toolkit";
import { Message } from "../../API";
import { addMesage, fetchMessage } from "../thunks/messagesThunk";

const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        data: null as Message[] | null,
        error: ""
    },
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchMessage.fulfilled, (state,action) => {
            state.data = action.payload as unknown as Message[]
        })
        builder.addCase(fetchMessage.rejected, (state) => {
            console.log("fail to fetchMessages"); 
        })
        builder.addCase(addMesage.fulfilled, (state,action) => {
            state.data.push(action.payload as Message)
        })
        builder.addCase(addMesage.rejected, (state) => {
            console.log("fail to addMessage"); 
        })
    }
})


export const messagesReducer = messagesSlice.reducer;