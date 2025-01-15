import { configureStore } from "@reduxjs/toolkit"
import { usersReducer } from "./slices/userSlice"

const store = configureStore({
    reducer: {
        users: usersReducer
    }
})

export { store }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch