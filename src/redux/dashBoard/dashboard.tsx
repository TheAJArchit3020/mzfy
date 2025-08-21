import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { dashboard } from "@managers/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "@redux/store";

// ✅ Response type
interface BalanceByDebt {
  balance: string;
  debtName: string;
  color: string;
  _id: string;
}

interface UpcomingTransaction {
  debtTransaction?: string;
  debtName?: string;
  amount?: number;
  dueDate?: string;
  _id?: string;
}

interface DashboardSummary {
  _id: string;
  user: string;
  __v: number;
  balanceByDebt: BalanceByDebt[];
  createdAt: string;
  debtFreeDate: string;
  payoffPct: number;
  totalBalance: number;
  totalDebtPaid: number;
  upcomingTransactions: UpcomingTransaction[];
  updatedAt: string;
}

// ✅ Async thunk
export const fetchDashboardSummary = createAsyncThunk<DashboardSummary, void, { state: RootState; rejectValue: any }>(
  "dashboard/fetchDashboardSummary",
  async (_, { getState, rejectWithValue }) => {

    const _token = (getState().loginuser?.items[0]?.token)
    const storetoken = await AsyncStorage.getItem('token')
    try {

      const response = await axios.get(dashboard, {
        headers: {
          Authorization: `Bearer ${_token ? _token : storetoken}`,
        },
      });
      return response.data;
    } catch (err: unknown) {
      console.log("err res : ", err)

      if (axios.isAxiosError(err)) {

        const statusCode = err.response?.status
        const errorData = err.response?.data

        return rejectWithValue({
          message: err.message,
          status: statusCode,
          data: errorData,
        })
      } else {
        // Non-Axios error (e.g. coding bug, thrown manually)
        console.log("Unexpected error:", err)
        return rejectWithValue({ message: (err as Error).message })
      }
    }
  }
);

// ✅ State
interface DashboardState {
  loading: boolean;
  error: string | null;
  data: DashboardSummary | null;
}

// ✅ Initial state
const initialState: DashboardState = {
  loading: false,
  error: null,
  data: null,
};

// ✅ Slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(
        fetchDashboardSummary.fulfilled,
        (state, action: PayloadAction<DashboardSummary>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
