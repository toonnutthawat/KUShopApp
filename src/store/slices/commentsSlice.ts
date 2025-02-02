import { createSlice } from "@reduxjs/toolkit";
import { addComment, fetchCommentByPost } from "../thunks/commentsThunk";
import { act } from "react";
import { Comment } from "../../API";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        data: null as Comment[] | null,
        error: ""
    },
    reducers:{},
    extraReducers(builder){
        builder.addCase(addComment.fulfilled , (state,action) => {
            state.data.push(action.payload as Comment)
        })
        builder.addCase(addComment.rejected, (state) => {
            state.error = "fail to addComment"
            console.log("fail to add Comment")
        })
        builder.addCase(fetchCommentByPost.fulfilled, (state,action) => {
            state.data = action.payload
        })
        builder.addCase(fetchCommentByPost.rejected, (state) => {
            state.error = "fail to fetchComments"
            console.log("fail to fetchComments")
        })
    }
})

export const commentReducer = commentsSlice.reducer;
