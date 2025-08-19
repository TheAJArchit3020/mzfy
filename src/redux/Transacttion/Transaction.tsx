import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTransaction, logTransaction } from "@managers/apis";
import axios from "axios";
import { TransactionState, TransactionData } from "src/commonTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "@reduxjs/toolkit/query";

// Define the initial state
const initialState: TransactionState = {
  transaction: {
    _id: "",
    user: "",
    debt: {
      _id: "",
      name: "",
    },
    openingBalance: 0,
    paymentAmount: 0,
    principalComponent: 0,
    interestComponent: 0,
    closingBalance: 0,
    dueDate: "",
    status: "",
    note: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
  loading: false,
  error: "",
};

// Create async thunk for fetching transaction data
export const getTransactionData = createAsyncThunk<
  any,
  any,
  { state: any; rejectValue: any }
>(
  "transaction/getTransactionData",
  async (transactionId: string, { getState, rejectWithValue }) => {
    try {
      const storetoken = await AsyncStorage.getItem("token");
      const _token = getState().loginuser?.items[0]?.token;

      const response = await axios.get(`${getTransaction}/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${_token ? _token : storetoken}`,
        },
      });
      console.log("Transaction data:", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      console.log("get transaction error", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

export const logPayment = createAsyncThunk<
  any,
  { transactionId: string; amount: number },
  { state: any; rejectValue: any }
>(
  "transaction/logPayment",
  async ({ transactionId, amount }, { getState, rejectWithValue }) => {
    try {
      const storetoken = await AsyncStorage.getItem("token");
      const _token = getState().loginuser?.items[0]?.token;
      console.log("token", storetoken);
      console.log("api", `${logTransaction}/${transactionId}/log`);
      const response = await axios.post(
        `${logTransaction}/${transactionId}/log`,
        { amountPaid: amount },
        {
          headers: {
            Authorization: `Bearer ${_token ? _token : storetoken}`,
          },
        }
      );
      console.log("log payment data:", response.data);
      return response.data;
    } catch (error: unknown) {
      console.log("log payment error", error);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    // Add any synchronous reducers here if needed
    clearTransaction: (state) => {
      state.transaction = null;
      state.error = null;
    },
    setTransaction: (state, action) => {
      state.transaction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionData.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
        state.error = null;
      })
      .addCase(getTransactionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Failed to fetch transaction data:", action.error);
      });
  },
});

export const { clearTransaction, setTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
