import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../API";
import { addPost, fetchAllPosts, fetchMyPosts, removePost } from "../thunks/postsThunk";
import { updateTotalLikes } from "../thunks/likeStatusThunk";

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
      if(action.payload === null) return;
      if (action.payload) {
        state.allPosts.data?.push(action.payload as Post)
        console.log("addPost success in Redux");
      }
    });
    builder.addCase(addPost.rejected, (state) => {
      state.error = "fail to addPost";
      console.log("fail to addPost");
    });
    builder.addCase(fetchMyPosts.fulfilled , (state,action) => {
      state.myPosts.data = action.payload as Post[]
    })
    builder.addCase(fetchMyPosts.rejected, (state) => {
      state.error = "fail to fetchMyPosts";
      console.log("fail to fetchMyPosts");
    });

    builder.addCase(fetchAllPosts.fulfilled , (state,action) => {
      state.allPosts.data = action.payload as Post[]
    })
    builder.addCase(fetchAllPosts.rejected, (state) => {
      state.error = "fail to fetchAllPosts";
      console.log("fail to fetchAllPost");
    });
    builder.addCase(removePost.fulfilled, (state,action) => {
      state.myPosts.data = state.myPosts.data.filter((post) => {
        return post.id !== action.payload.id
      })
    })
    builder.addCase(updateTotalLikes.fulfilled, (state,action) => {
      const index = state.allPosts.data.findIndex((post) => post.id === action.payload.id)
      state.allPosts.data[index].likes = action.payload.likes
    })
  },
  reducers: {},
});

export const postsReducer = postsSlice.reducer;
