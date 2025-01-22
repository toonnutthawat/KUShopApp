import { configureStore } from "@reduxjs/toolkit"
import { usersReducer } from "./slices/userSlice"
import { postsReducer } from "./slices/postsSlice"

const store = configureStore({
    reducer: {
        users: usersReducer,
        posts: postsReducer
    }
})

export { store }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch