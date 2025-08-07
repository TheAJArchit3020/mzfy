// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice";
import loginUserReducer from "../redux/login/loginSlice";
import dashBoardReducer from "../redux/dashBoard/dashboard";

export const store = configureStore({
  reducer: {
    user: userReducer,
    loginuser: loginUserReducer,
    dashBoard: dashBoardReducer,
  },
});

// Infer the `AppDispatch` and `RootState` types from store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
