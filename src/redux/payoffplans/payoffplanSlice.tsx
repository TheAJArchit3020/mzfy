import { debts, payoffplans, registeruseruser } from '@managers/apis'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootState } from '@redux/store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface PayoffPlan {
    id: string
}

interface PayoffPlanState {
    items: PayoffPlan[]
    loading: boolean
    error: string | null
}

const initialState: PayoffPlanState = {
    items: [],
    loading: false,
    error: null,
}




// fetch user....
export const fetchPayoffPlan = createAsyncThunk<PayoffPlan, void, { state: RootState; rejectValue: any }>(
    'user/fetchUser',
    async (newUser, { getState, rejectWithValue }) => {

        const _token = (getState().loginuser?.items[0]?.token)
        const storetoken = await AsyncStorage.getItem('token')

        try {
            const resp = await axios.get<PayoffPlan>(
                payoffplans,
                {
                    headers: {
                        Authorization: `Bearer ${_token ? _token : storetoken}`,
                    }
                }
            )
            console.log("fetchPayoffPlan resp : ", resp.data)
            return resp.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)
const PayoffPlanSlice = createSlice({
    name: 'payofplan',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetch user data
        builder
            .addCase(fetchPayoffPlan.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPayoffPlan.fulfilled, (state, action) => {
                state.loading = false
                state.items = [action.payload]
            })
            .addCase(fetchPayoffPlan.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export default PayoffPlanSlice.reducer
