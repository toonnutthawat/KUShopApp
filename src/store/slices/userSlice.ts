import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../API";
import { addUser, changeCreditStatus, changePhoneNumber, editImgUser, fetchAllUsers, fetchMyUser, fetchPendingStatusUsers } from "../thunks/userThunk";

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null as User[] | null,
        myUser: null as User | null,
        requestedUser: null as User[] | null,
        allUsers: null as User[] | null,
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
        builder.addCase(changeCreditStatus.fulfilled, (state,action) => {
            if(state.myUser){
                state.myUser.credit = action.payload.credit
            }
        })
        builder.addCase(changePhoneNumber.fulfilled, (state,action) => {
            if(state.myUser){
                state.myUser.phone = action.payload.phone
            }
        })
        builder.addCase(fetchPendingStatusUsers.fulfilled, (state,action) => {
            state.requestedUser = action.payload
        })
        builder.addCase(fetchAllUsers.fulfilled, (state,action) => {
            state.allUsers = action.payload
        })

    },
    reducers:{}

})

export const usersReducer = userSlice.reducer