// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/user/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
})

// Infer the `AppDispatch` and `RootState` types from store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
