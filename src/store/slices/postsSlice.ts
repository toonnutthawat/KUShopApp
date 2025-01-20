import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../API";
import { addPost } from "../thunks/postsThunk";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    myPosts: {
      data: null as Post[] | null,
      error: "",
    },
    allPosts: {
      data: null as Post[] | null,
      error: "",
    },
    error: "",
  },
  extraReducers(builder) {
    builder.addCase(addPost.fulfilled, (state, action) => {
      if (action.payload) {
        state.allPosts.data.push(action.payload);
        console.log("addPost success in Redux");
      }
    });
    builder.addCase(addPost.rejected, (state) => {
      state.error = "fail to addPost";
      console.log("fail to addPost");
    });
  },
  reducers: {},
});

export const postsReducer = postsSlice.reducer;
