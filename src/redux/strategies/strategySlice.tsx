import { getallcustomplans, getstrategy, selectstrategy } from '@managers/apis'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootState } from '@redux/store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'



export interface StrategyPlan {
    _id: string
    avalanche?: any
    snowball?: any
    hybrid?: any
    custom?: any
    createdAt: string
    updatedAt: string
    user: string
    isDeleted?: boolean
    plans?: any

}



export interface Strategy {
    strategy: string
    plans?: any
    avalanche?: any
    snowball?: any
    hybrid?: any
    custom?: any
}

interface StrategyState {
    current: Strategy
    items: StrategyPlan[]
    customitems: any
    loading: boolean
    error: string | null
}

const initialState: StrategyState = {
    current: {
        strategy: '',
    },
    items: [],
    customitems: [],
    loading: false,
    error: null,
}

type SetFieldPayload = {
    field: keyof Strategy
    value: any
}

/**
 * Select a strategy (post to backend)
 */
export const addStrategy = createAsyncThunk<Strategy, string, { state: RootState; rejectValue: any }>(
    'strategy/addStrategy',
    async (strategy, { getState, rejectWithValue }) => {
        const _token = getState().loginuser?.items[0]?.token
        const storetoken = await AsyncStorage.getItem('token')

        try {
            const resp = await axios.post<Strategy>(
                selectstrategy,
                { strategy },
                {
                    headers: {
                        Authorization: `Bearer ${_token ?? storetoken}`,
                    },
                }
            )
            return resp.data
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue({
                    message: err.message,
                    status: err.response?.status,
                    data: err.response?.data,
                })
            }
            return rejectWithValue({ message: (err as Error).message })
        }
    }
)

/**
 * Fetch all strategy plans
 */
export const fetchStrategy = createAsyncThunk<StrategyPlan[], void, { state: RootState; rejectValue: any }>(
    'strategy/fetchStrategy',
    async (_: void, { getState, rejectWithValue }) => {
        const _token = getState().loginuser?.items[0]?.token
        const storetoken = await AsyncStorage.getItem('token')

        try {
            const resp = await axios.get<StrategyPlan[]>(getstrategy, {
                headers: { Authorization: `Bearer ${_token ?? storetoken}` },
            })
            return resp.data // this is an array
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue({
                    message: err.message,
                    status: err.response?.status,
                    data: err.response?.data,
                })
            }
            return rejectWithValue({ message: (err as Error).message })
        }
    }
)

/**
 * Fetch all custom strategies
 */
export const fetchAllCustomStrategy = createAsyncThunk<any, void, { state: RootState; rejectValue: any }>(
    'strategy/fetchAllCustomStrategy',
    async (_: void, { getState, rejectWithValue }) => {
        const _token = getState().loginuser?.items[0]?.token
        const storetoken = await AsyncStorage.getItem('token')

        try {
            const resp = await axios.get(getallcustomplans, {
                headers: { Authorization: `Bearer ${_token ?? storetoken}` },
            })

            const __data = resp.data
            console.log("resp : ", __data)
            return resp.data
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue({
                    message: err.message,
                    status: err.response?.status,
                    data: err.response?.data,
                })
            }
            return rejectWithValue({ message: (err as Error).message })
        }
    }
)

const strategySlice = createSlice({
    name: 'strategy',
    initialState,
    reducers: {
        setField(state, action: PayloadAction<SetFieldPayload>) {
            const { field, value } = action.payload
            state.current[field] = value
        },
        resetCurrent(state) {
            state.current = initialState.current
        },
    },
    extraReducers: (builder) => {
        // addStrategy
        builder
            .addCase(addStrategy.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addStrategy.fulfilled, (state) => {
                state.loading = false
                state.current = initialState.current
            })
            .addCase(addStrategy.rejected, (state, action) => {
                state.loading = false
                state.error = (action.payload as any)?.message ?? 'Error adding strategy'
            })

        // fetchStrategy
        builder
            .addCase(fetchStrategy.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchStrategy.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
                state.current = initialState.current
            })
            .addCase(fetchStrategy.rejected, (state, action) => {
                state.loading = false
                state.error = (action.payload as any)?.message ?? 'Error fetching strategies'
            })

        // fetchAllCustomStrategy
        builder
            .addCase(fetchAllCustomStrategy.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAllCustomStrategy.fulfilled, (state, action) => {
                state.loading = false
                state.customitems = action.payload
            })
            .addCase(fetchAllCustomStrategy.rejected, (state, action) => {
                state.loading = false
                state.error = (action.payload as any)?.message ?? 'Error fetching custom strategies'
            })
    },
})

export const { setField, resetCurrent } = strategySlice.actions
export default strategySlice.reducer
