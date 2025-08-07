import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { dashboard } from "@managers/apis";

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
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODkzNTg0OWU5YzQ4YzFmY2U5MDgwZTAiLCJpYXQiOjE3NTQ0ODY4NTcsImV4cCI6MTc1NzA3ODg1N30.ClKTYxCT_WT3kfiw7Hl20q9xjyXs730h_CeIff6Fhak";

      const response = await axios.get<DashboardData>(
        `${dashboard}?year=${year}&month=${month}`,
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

