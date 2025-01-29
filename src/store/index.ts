import { configureStore } from "@reduxjs/toolkit"
import { usersReducer } from "./slices/userSlice"
import { postsReducer } from "./slices/postsSlice"
import { commentReducer } from "./slices/commentsSlice"
import { likeStatusReducer } from "./slices/likeStatusSlice"
import { chatReducer } from "./slices/chatsSlice"


const store = configureStore({
    reducer: {
        users: usersReducer,
        posts: postsReducer,
        comments: commentReducer,
        likeStatus: likeStatusReducer,
        chats: chatReducer,
    }
})

export { store }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch