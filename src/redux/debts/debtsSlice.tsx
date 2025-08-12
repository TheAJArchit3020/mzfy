import { debtpage, debts, registeruseruser } from '@managers/apis'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootState } from '@redux/store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Debts {
    name: string
    creditorName: string
    principal: any
    balance: any
    minPaymentAmount: any
    apr: any
    nextDueDate: any
    tagColor: any
}

export interface AllDebts {
    totalBalance: any
    totalPaid: any
    inProgressDebts: any
    completedDebts: any
}

interface DebtsState {
    current: Debts
    items: Debts[]
    alldebts: AllDebts[]
    loading: boolean
    error: string | null
}

const initialState: DebtsState = {
    current: {
        name: '',
        creditorName: '',
        principal: '',
        balance: '',
        minPaymentAmount: '',
        apr: '',
        nextDueDate: '',
        tagColor: '',
    },
    items: [],
    alldebts: [],
    loading: false,
    error: null,
}

type SetFieldPayload = {
    field: keyof Debts
    value: any
}

export const addDebts = createAsyncThunk<Debts, Debts, { state: RootState; rejectValue: any }>(
    'debts/addDebts',
    async (data, { getState, rejectWithValue }) => {

        const _token = (getState().loginuser?.items[0]?.token)
        const storetoken = await AsyncStorage.getItem('token')


        console.log("data : ", data)


        try {
            const resp = await axios.post<Debts>(
                debts,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${_token ? _token : storetoken}`,
                    }
                }
            )
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
                console.log("Unexpected error:", err)
                return rejectWithValue({ message: (err as Error).message })
            }
        }
    }
)


// fetch user....
export const fetchDebtsById = createAsyncThunk<Debts, string, { state: RootState; rejectValue: any }>(
    'debts/fetchDebtsById',
    async (id, { getState, rejectWithValue }) => {

        const _token = (getState().loginuser?.items[0]?.token)
        const storetoken = await AsyncStorage.getItem('token')

        try {
            const resp = await axios.get<Debts>(
                `${debts}/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${_token ? _token : storetoken}`,
                    }
                }
            )
            console.log("fetchDebtsById resp : ", resp.data)
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

export const fetchAllDebts = createAsyncThunk<AllDebts, void, { state: RootState; rejectValue: any }>(
    'debts/fetchAllDebts',
    async (newUser, { getState, rejectWithValue }) => {

        const _token = (getState().loginuser?.items[0]?.token)
        const storetoken = await AsyncStorage.getItem('token')

        try {
            const resp = await axios.get<AllDebts>(
                debtpage,
                {
                    headers: {
                        Authorization: `Bearer ${_token ? _token : storetoken}`,
                    }
                }
            )
            console.log("fetchDebts resp : ", resp.data)
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


const debtSlice = createSlice({
    name: 'debts',
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
            .addCase(addDebts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addDebts.fulfilled, (state, action) => {
                state.loading = false
                state.items.push(action.payload)
                state.current = initialState.current
            })
            .addCase(addDebts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

        // fetch user data
        builder
            .addCase(fetchDebtsById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchDebtsById.fulfilled, (state, action) => {
                state.loading = false
                state.items = [action.payload]
                state.current = initialState.current
            })
            .addCase(fetchDebtsById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

        // fetch all debts...

        builder
            .addCase(fetchAllDebts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAllDebts.fulfilled, (state, action) => {
                state.loading = false
                state.alldebts = [action.payload]
            })
            .addCase(fetchAllDebts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { setField, resetCurrent } = debtSlice.actions
export default debtSlice.reducer
