import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  expensesDashboard,
  getLogExpenseCatogories,
  logExpenseapi,
  addCategory,
  updateCategory,
  getAllExpensesApi,
} from "@managers/apis";
import axios from "axios";
import { LogExpenseCategoryItem } from "src/commonTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "@reduxjs/toolkit/query";

// Define the interface for the dashboard data
interface ExpensesDashboardData {
  totalBudget: number;
  totalSpent: number;
  byCategory: any[];
  recentExpenses: any[];
  getCatogories: LogExpenseCategoryItem[];
  allExpenses: any[];
  spendingTrend: any[];
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

interface UpdateCategoryPayload {
  id: string;
  budget: number;
  color?: string;
}

const initialState: ExpensesDashboardData = {
  totalBudget: 0,
  totalSpent: 0,
  byCategory: [],
  recentExpenses: [],
  getCatogories: [],
  allExpenses: [],
  spendingTrend: [],
};

// Create async thunk for fetching expenses dashboard data
export const fetchExpensesDashboard = createAsyncThunk<
  any,
  any,
  { state: any; rejectValue: any }
>(
  "expense/fetchExpensesDashboard",
  async (
    { year, month }: { year: number; month: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const _token = getState().loginuser?.items[0]?.token;
      const storetoken = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${expensesDashboard}?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${_token ? _token : storetoken}`,
          },
        }
      );
      console.log("expense dashboard response", response.data);
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
export const logExpense = createAsyncThunk<
  any,
  LogExpensePayload,
  { state: any; rejectValue: any }
>(
  "expense/logExpense",
  async (expenseData: LogExpensePayload, { getState, rejectWithValue }) => {
    try {
      console.log("expense Data", expenseData);
      const _token = getState().loginuser?.items[0]?.token;
      const storetoken = await AsyncStorage.getItem("token");

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
            Authorization: `Bearer ${_token ? _token : storetoken}`,
          },
        }
      );
      console.log("Log Expense", response);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      console.log("log expense error", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

// Create async thunk for fetching expense categories
export const fetchExpenseCategories = createAsyncThunk<
  any,
  void,
  { state: any; rejectValue: any }
>(
  "expense/fetchExpenseCategories",
  async (_, { getState, rejectWithValue }) => {
    try {
      const _token = getState().loginuser?.items[0]?.token;
      const storetoken = await AsyncStorage.getItem("token");

      const response = await axios.get(getLogExpenseCatogories, {
        headers: {
          Authorization: `Bearer ${_token ? _token : storetoken}`,
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
export const addCategoryAsync = createAsyncThunk<
  any,
  AddCategoryPayload,
  { state: any; rejectValue: any }
>(
  "expense/addCategory",
  async (categoryData: AddCategoryPayload, { getState, rejectWithValue }) => {
    try {
      const _token = getState().loginuser?.items[0]?.token;
      const storetoken = await AsyncStorage.getItem("token");

      const response = await axios.post(addCategory, categoryData, {
        headers: {
          Authorization: `Bearer ${_token ? _token : storetoken}`,
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

// Create async thunk for updating categories
export const updateCategoriesAsync = createAsyncThunk<
  any,
  UpdateCategoryPayload[],
  { state: any; rejectValue: any }
>(
  "expense/updateCategories",
  async (
    categoriesData: UpdateCategoryPayload[],
    { getState, rejectWithValue }
  ) => {
    try {
      const _token = getState().loginuser?.items[0]?.token;
      const storetoken = await AsyncStorage.getItem("token");
      console.log("catagories", categoriesData);
      const response = await axios.put(updateCategory, categoriesData, {
        headers: {
          Authorization: `Bearer ${_token ? _token : storetoken}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Update Categories Response:", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      console.log("update categories error", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

// Create async thunk for fetching all expenses by filters
export const fetchAllExpenses = createAsyncThunk<
  any,
  { startDate?: string; endDate?: string; category?: string },
  { state: any; rejectValue: any }
>(
  "expense/fetchAllExpenses",
  async ({ startDate, endDate, category }, { getState, rejectWithValue }) => {
    try {
      const _token = getState().loginuser?.items[0]?.token;
      const storetoken = await AsyncStorage.getItem("token");
      const params: Record<string, string> = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      if (category) params.category = category;

      const query = new URLSearchParams(params).toString();
      const url = query
        ? `${getAllExpensesApi}/?${query}`
        : `${getAllExpensesApi}`;

      console.log("url query", url);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${_token ? _token : storetoken}`,
        },
      });
      console.log("all expenses", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      console.log("fetch all expenses error", error);
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
        state.spendingTrend = action.payload.spendingTrend || [];
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
      })
      .addCase(updateCategoriesAsync.pending, (state) => {
        // Handle loading state for updating categories
      })
      .addCase(updateCategoriesAsync.fulfilled, (state, action) => {
        // Handle successful category updates
        console.log("Categories updated successfully:", action.payload);
        // Update the categories in the store with the updated data
        if (action.payload && Array.isArray(action.payload)) {
          action.payload.forEach((updatedCategory) => {
            const index = state.getCatogories.findIndex(
              (cat) => cat.id === updatedCategory.id
            );
            if (index !== -1) {
              state.getCatogories[index] = {
                ...state.getCatogories[index],
                ...updatedCategory,
              };
            }
          });
        }
      })
      .addCase(updateCategoriesAsync.rejected, (state, action) => {
        // Handle error state for updating categories
        console.error("Failed to update categories:", action.error);
      })
      .addCase(fetchAllExpenses.pending, (state) => {
        // optional: loading state
      })
      .addCase(fetchAllExpenses.fulfilled, (state, action) => {
        state.allExpenses = action.payload || [];
      })
      .addCase(fetchAllExpenses.rejected, (state, action) => {
        console.error("Failed to fetch all expenses:", action.error);
      });
  },
});

export const { clearExpensesDashboard } = expenseSlice.actions;
export default expenseSlice.reducer;
