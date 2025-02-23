import { configureStore } from "@reduxjs/toolkit"
import { usersReducer } from "./slices/userSlice"
import { productsReducer } from "./slices/productSlice"
import { commentReducer } from "./slices/commentsSlice"
import { likeStatusReducer } from "./slices/likeStatusSlice"
import { chatReducer } from "./slices/chatsSlice"
import { messagesReducer } from "./slices/messagesSlice"


const store = configureStore({
    reducer: {
        users: usersReducer,
        products: productsReducer,
        comments: commentReducer,
        likeStatus: likeStatusReducer,
        chats: chatReducer,
        messages: messagesReducer
    }
})

export { store }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch