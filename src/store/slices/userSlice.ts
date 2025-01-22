import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../API";
import { addUser, editImgUser, fetchMyUser } from "../thunks/userThunk";

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
        builder.addCase(fetchMyUser.fulfilled, (state, action) => {
            state.myUser = action.payload as User
          });
        builder.addCase(fetchMyUser.rejected, (state) => {
            state.error = "error to fetchMyUser"
        })
        builder.addCase(editImgUser.fulfilled, (state,action) => {
            if(state.myUser){
                state.myUser.profile = action.payload
            }
        })

    },
    reducers:{}

})

export const usersReducer = userSlice.reducer