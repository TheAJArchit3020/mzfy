import { customplan, registeruseruser, selectstrategy } from '@managers/apis'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootState } from '@redux/store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface CustomPlan {
    name: string
    debtOrder: any
    extraPayments: any
}

interface CustomPlanState {
    current: CustomPlan
    items: CustomPlan[]
    loading: boolean
    error: string | null
}

const initialState: CustomPlanState = {
    current: {
        name: 'My Aggressive Payoff',
        debtOrder: [],
        extraPayments: []
    },
    items: [],
    loading: false,
    error: null,
}

type SetFieldPayload = {
    field: keyof CustomPlan
    value: any
}

export const addCustomPlan = createAsyncThunk<CustomPlan, CustomPlan, { state: RootState; rejectValue: any }>(
    'customplan/addCustomPlan',
    async (data, { getState, rejectWithValue }) => {

        const _token = (getState().loginuser?.items[0]?.token)
        const storetoken = await AsyncStorage.getItem('token')

        console.log("data", data)


        try {
            const resp = await axios.post<CustomPlan>(
                customplan,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${_token ? _token : storetoken}`,
                    }
                }
            )
            console.log("addCustomPlan resp : ", resp)
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

const customPlanSlice = createSlice({
    name: 'customplan',
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
            .addCase(addCustomPlan.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addCustomPlan.fulfilled, (state, action) => {
                state.loading = false
                state.items.push(action.payload)
                state.current = initialState.current
            })
            .addCase(addCustomPlan.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })


    },
})

export const { setField, resetCurrent } = customPlanSlice.actions
export default customPlanSlice.reducer
