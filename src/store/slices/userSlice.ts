import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../API";
import { addUser, fetchMyUser } from "../thunks/userThunk";

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null as User[] | null,
        myUser: null as User | null,
        error: ""
    },
    extraReducers(builder){
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.data.push(action.payload as User)
            console.log("SUCCESS");
        })
        builder.addCase(addUser.rejected, (state, action) => {
            state.error = "error to creteUser"
            console.log("error to creteUser");
        })
        builder.addCase(fetchMyUser.fulfilled, (state,action) => {
            state.myUser = action.payload
        })
        builder.addCase(fetchMyUser.rejected, (state) => {
            state.error = "error to fetchMyUser"
        })
    },
    reducers:{}

})

export const usersReducer = userSlice.reducer