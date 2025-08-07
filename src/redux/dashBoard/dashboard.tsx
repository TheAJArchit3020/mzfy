import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Define the expected response type
interface DashboardData {
  totalBudget: number;
  totalSpent: number;
  byCategory: any[];
  recentExpenses: any[];
}

// ✅ Define the argument type for the thunk
interface FetchArgs {
  year: string;
  month: string;
}

// ✅ Async thunk to fetch dashboard data
export const fetchDashboardData = createAsyncThunk<DashboardData, FetchArgs>(
  "dashboard/fetchDashboardData",
  async ({ year, month }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get<DashboardData>(
        `https://api.moneezify.com/api/expenses/dashboard?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: token ?? "",
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

// ✅ State type
interface DashboardState {
  loading: boolean;
  error: string | null;
  data: DashboardData | null;
}

// ✅ Initial state
const initialState: DashboardState = {
  loading: false,
  error: null,
  data: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(
        fetchDashboardData.fulfilled,
        (state, action: PayloadAction<DashboardData>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
