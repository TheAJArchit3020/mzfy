// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/user/userSlice'
import loginUserReducer from "../redux/login/loginSlice"
import debtsReducer from "../redux/debts/debtsSlice"
import payoffPlanReducer from "../redux/payoffplans/payoffplanSlice"


export const store = configureStore({
    reducer: {
        user: userReducer,
        loginuser: loginUserReducer,
        debts: debtsReducer,
        payoffplan: payoffPlanReducer
    },
})

// Infer the `AppDispatch` and `RootState` types from store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
