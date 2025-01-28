import { createSlice } from "@reduxjs/toolkit";
import { LikeStatus } from "../../API";
import { changeLikeStatus, fetchLikeStatus } from "../thunks/likeStatusThunk";
import { act } from "react";

const likeStatusSlice = createSlice({
    name: "likeStatus",
    initialState: {
        data: null as LikeStatus | null,
        error: "",
    },
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchLikeStatus.fulfilled , (state,action) => {
            state.data = action.payload as LikeStatus
        })
        builder.addCase(fetchLikeStatus.rejected , (state) => {
            state.error = "fail to fetchLikeStatus"
            console.log("fail to fetchLikeStatus");
        })
        builder.addCase(changeLikeStatus.fulfilled, (state,action) => {
            state.data.status = action.payload.status
        })
        builder.addCase(changeLikeStatus.rejected , (state) => {
            state.error = "fail to changeLikeStatus"
            console.log("fail to changeLikeStatus");
        })
    }
})

export const likeStatusReducer = likeStatusSlice.reducer;