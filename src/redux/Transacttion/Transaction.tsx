import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTransaction } from "@managers/apis";
import axios from "axios";
import { TransactionState, TransactionData } from "src/commonTypes";

// Define the initial state
const initialState: TransactionState = {
  transaction: {
    _id: "6895aab80f9a12cd257cfdfa",
    user: "6895aaaa0f9a12cd257cfddb",
    debt: {
      _id: "6895aab80f9a12cd257cfde4",
      name: "Credit Card"
    },
    openingBalance: 19164.93,
    paymentAmount: 500,
    principalComponent: 420.15,
    interestComponent: 79.85,
    closingBalance: 18744.78,
    dueDate: "2025-11-15T00:00:00.000Z",
    status: "upcoming",
    note: "",
    createdAt: "2025-08-08T07:43:52.350Z",
    updatedAt: "2025-08-08T07:43:52.350Z",
    __v: 0
  },
  loading: false,
  error: null,
};

// Create async thunk for fetching transaction data
export const getTransactionData = createAsyncThunk(
  "transaction/getTransactionData",
  async (transactionId: string, { rejectWithValue }) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODliMGU4ZDM3MDg0MzRmMDExZmM0MzAiLCJpYXQiOjE3NTQ5OTIzMDgsImV4cCI6MTc1NzU4NDMwOH0.ImXIM1ZJwGBWYpdD5qCRGuWx4xJ-RoQ1xX9Nh4He5rY"

      const response = await axios.get(`${getTransaction}/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
