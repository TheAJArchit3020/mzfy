import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  expensesDashboard,
  getLogExpenseCatogories,
  logExpenseapi,
  addCategory,
} from "@managers/apis";
import axios from "axios";
import { LogExpenseCategoryItem } from "src/commonTypes";

// Define the interface for the dashboard data
interface ExpensesDashboardData {
  totalBudget: number;
  totalSpent: number;
  byCategory: any[];
  recentExpenses: any[];
  getCatogories: LogExpenseCategoryItem[];
}

interface LogExpensePayload {
  amount: string;
  category: string;
  date: string;
  description: string;
}

interface AddCategoryPayload {
  name: string;
  color: string;
  budget: string;
}

const initialState: ExpensesDashboardData = {
  totalBudget: 0,
  totalSpent: 0,
  byCategory: [],
  recentExpenses: [],
  getCatogories: [],
};

// Create async thunk for fetching expenses dashboard data
export const fetchExpensesDashboard = createAsyncThunk(
  "expense/fetchExpensesDashboard",
  async (
    { year, month }: { year: number; month: number },
    { rejectWithValue }
  ) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODk1OTU3NzczNDIwN2JjNjUwNjBhM2YiLCJpYXQiOjE3NTQ2MzM1OTEsImV4cCI6MTc1NzIyNTU5MX0.ktTEN2QSPBL7HgMdPlVylpsyKmU4rvezRSQx3zDQj1k";

      const response = await axios.get(
        `${expensesDashboard}?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      console.log("expense dashboard error", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

// Create async thunk for logging expense
export const logExpense = createAsyncThunk(
  "expense/logExpense",
  async (expenseData: LogExpensePayload, { rejectWithValue }) => {
    try {
      console.log("expense Data", expenseData);
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODk1YWFhYTBmOWExMmNkMjU3Y2ZkZGIiLCJpYXQiOjE3NTQ2MzkwMTgsImV4cCI6MTc1NzIzMTAxOH0.HIwRS5e4lkh6Ai6XQp_Wjs0YHZgpiiaycrMtKjCNfkQ";

      const response = await axios.post(
        `${logExpenseapi}`,
        {
          amount: expenseData.amount,
          date: expenseData.date,
          category: expenseData.category,
          description: expenseData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Log Expense", response);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      console.log("log expense error", error.message);
      return rejectWithValue("Something went wrong");
    }
  }
);

// Create async thunk for fetching expense categories
export const fetchExpenseCategories = createAsyncThunk(
  "expense/fetchExpenseCategories",
  async (_, { rejectWithValue }) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODk1YWFhYTBmOWExMmNkMjU3Y2ZkZGIiLCJpYXQiOjE3NTQ2MzkwMTgsImV4cCI6MTc1NzIzMTAxOH0.HIwRS5e4lkh6Ai6XQp_Wjs0YHZgpiiaycrMtKjCNfkQ";

      const response = await axios.get(getLogExpenseCatogories, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      console.log("fetch categories error", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

// Create async thunk for adding a new category
export const addCategoryAsync = createAsyncThunk(
  "expense/addCategory",
  async (categoryData: AddCategoryPayload, { rejectWithValue }) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODk1YWFhYTBmOWExMmNkMjU3Y2ZkZGIiLCJpYXQiOjE3NTQ2MzkwMTgsImV4cCI6MTc1NzIzMTAxOH0.HIwRS5e4lkh6Ai6XQp_Wjs0YHZgpiiaycrMtKjCNfkQ";

      const response = await axios.post(addCategory, categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Add Category Response:", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      console.log("add category error", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    // Add any synchronous reducers here if needed
    clearExpensesDashboard: (state) => {
      state.totalBudget = 0;
      state.totalSpent = 0;
      state.byCategory = [];
      state.recentExpenses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpensesDashboard.pending, (state) => {
        // Handle loading state if needed
      })
      .addCase(fetchExpensesDashboard.fulfilled, (state, action) => {
        state.totalBudget = action.payload.totalBudget || 0;
        state.totalSpent = action.payload.totalSpent || 0;
        state.byCategory = action.payload.byCategory || [];
        state.recentExpenses = action.payload.recentExpenses || [];
      })
      .addCase(fetchExpensesDashboard.rejected, (state, action) => {
        console.error("Failed to fetch expenses dashboard:", action.error);
      })
      .addCase(logExpense.pending, (state) => {
        // Handle loading state for logging expense
      })
      .addCase(logExpense.fulfilled, (state, action) => {
        console.log("Expense logged successfully:", action.payload);
      })
      .addCase(logExpense.rejected, (state, action) => {
        console.error("Failed to log expense:", action.error);
      })
      .addCase(fetchExpenseCategories.pending, (state) => {
        // Handle loading state for fetching categories
      })
      .addCase(fetchExpenseCategories.fulfilled, (state, action) => {
        // Update state with the fetched categories
        state.getCatogories = action.payload || [];
      })
      .addCase(fetchExpenseCategories.rejected, (state, action) => {
        // Handle error state for fetching categories
        console.error("Failed to fetch expense categories:", action.error);
      })
      .addCase(addCategoryAsync.pending, (state) => {
        // Handle loading state for adding category
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        // Handle successful category addition
        console.log("Category added successfully:", action.payload);
        // Optionally refresh categories after adding
        // You can dispatch fetchExpenseCategories here if needed
      })
      .addCase(addCategoryAsync.rejected, (state, action) => {
        // Handle error state for adding category
        console.error("Failed to add category:", action.error);
      });
  },
});

export const { clearExpensesDashboard } = expenseSlice.actions;
export default expenseSlice.reducer;
