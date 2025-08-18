import { getstrategy, registeruseruser, selectstrategy } from '@managers/apis'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootState } from '@redux/store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Strategy {
    strategy: string
}

interface StrategyState {
    current: Strategy
    items: Strategy[]
    loading: boolean
    error: string | null
}

const initialState: StrategyState = {
    current: {
        strategy: '',
    },
    items: [],
    loading: false,
    error: null,
}

type SetFieldPayload = {
    field: keyof Strategy
    value: any
}

export const addStrategy = createAsyncThunk<Strategy, string, { state: RootState; rejectValue: any }>(
    'strategy/addStrategy',
    async (strategy, { getState, rejectWithValue }) => {

        const _token = (getState().loginuser?.items[0]?.token)
        const storetoken = await AsyncStorage.getItem('token')

        try {
            const resp = await axios.post<Strategy>(
                selectstrategy,
                { strategy },
                {
                    headers: {
                        Authorization: `Bearer ${_token ? _token : storetoken}`,
                    }
                }
            )
            console.log("Strategy resp : ", resp)
            return resp.data
        } catch (err: any) {
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
)

export const fetchStrategy = createAsyncThunk<Strategy, void, { state: RootState; rejectValue: any }>(
    'strategy/fetchStrategy',
    async (_: void, { getState, rejectWithValue }) => {

        const _token = (getState().loginuser?.items[0]?.token)
        const storetoken = await AsyncStorage.getItem('token')


        try {
            const resp = await axios.get<Strategy>(
                getstrategy,
                {
                    headers: {
                        Authorization: `Bearer ${_token ? _token : storetoken}`,
                    }
                }
            )
            console.log("fetch Strategy resp : ", resp)
            return resp.data
        } catch (err: any) {
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
)

const strategySlice = createSlice({
    name: 'strategy',
    initialState,
    reducers: {
        /** Generic setter for any User field */
        setField(state, action: PayloadAction<SetFieldPayload>) {
            const { field, value } = action.payload
            state.current[field] = value
        },
        /** Reset the current form back to blank */
        resetCurrent(state) {
            state.current = initialState.current
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addStrategy.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addStrategy.fulfilled, (state, action) => {
                state.loading = false
                state.current = initialState.current
            })
            .addCase(addStrategy.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })


        // fetch strategy data
        builder
            .addCase(fetchStrategy.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchStrategy.fulfilled, (state, action) => {
                state.loading = false
                state.items = [action.payload]
                state.current = initialState.current
            })
            .addCase(fetchStrategy.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })


    },
})

export const { setField, resetCurrent } = strategySlice.actions
export default strategySlice.reducer
