import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { dashboard } from "@managers/apis";

// ✅ Response type
interface BalanceByDebt {
  balance: string;
  debtName: string;
  color: string;
  _id: string;
}

interface UpcomingTransaction {
  debtTransaction: string;
  debtName: string;
  amount: number;
  dueDate: string;
  _id: string;
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
export const fetchDashboardSummary = createAsyncThunk<DashboardSummary>(
  "dashboard/fetchDashboardSummary",
  async (_, { rejectWithValue }) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODk0NmVmOTZjNGNmM2FiMzEwNzYwOGMiLCJpYXQiOjE3NTQ1NjMwMjAsImV4cCI6MTc1NzE1NTAyMH0.u001fyX4xgn0OlhB8WREJbIbAxwcUeH_9e9jzPJYO40";

      console.log("dashBoard",dashboard);
      const response = await axios.get(dashboard, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
        console.log("response",error);
      return rejectWithValue("Something went wrong");
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
