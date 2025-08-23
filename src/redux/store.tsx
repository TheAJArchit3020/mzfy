import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice";
import loginUserReducer from "../redux/login/loginSlice";
import dashBoardReducer from "../redux/dashBoard/dashboard";
import expensesReducer from "../redux/expenseSlice/expenseSlice";
import debtsReducer from "../redux/debts/debtsSlice"
import payoffPlanReducer from "../redux/payoffplans/payoffplanSlice"
import strategyReducer from "../redux/strategies/strategySlice"
import customPlanReducer from "./customplan/customplanSlice"
import chatReducer from "./chat/chatSlices";
import transactionReducer from "../redux/Transacttion/Transaction";
import feedbackReducer from "./feedbacks/feedbackSlices"

export const store = configureStore({
  reducer: {
    user: userReducer,
    loginuser: loginUserReducer,
    dashBoard: dashBoardReducer,
    expenses: expensesReducer,
    debts: debtsReducer,
    payoffplan: payoffPlanReducer,
    strategy: strategyReducer,
    customplan: customPlanReducer,
    transaction: transactionReducer,
    chats: chatReducer,
    feedbacks: feedbackReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
