// redux/feedbackSlice.ts
import { feedbacks } from '@managers/apis'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootState } from '@redux/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Payload you POST
export type AnswerValue = string | string[] | number
export interface AnswerItem { questionId: string; answer: AnswerValue }
export interface FeedbackPayload { answers: AnswerItem[] }

// Error shape for rejects
interface RejectedError {
    message: string
    status?: number
    data?: any
}

// Store state
interface FeedbackState {
    items: any[] // server response(s)
    loading: boolean
    error: string | null
}

const initialState: FeedbackState = {
    items: [],
    loading: false,
    error: null,
}

export const fetchFeedback = createAsyncThunk<
    any, // response type from your GET
    void,
    { state: RootState; rejectValue: RejectedError }
>(
    'feedback/fetchFeedback',
    async (_arg, { getState, rejectWithValue }) => {
        const stateToken = getState().loginuser?.items[0]?.token
        const storeToken = await AsyncStorage.getItem('token')
        const token = stateToken ?? storeToken ?? ''

        try {
            const resp = await axios.get(feedbacks, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            })
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

export const addFeedback = createAsyncThunk<
    any,
    FeedbackPayload,
    { state: RootState; rejectValue: RejectedError }
>(
    'feedback/addFeedback',
    async (body, { getState, rejectWithValue, dispatch }) => {

        const stateToken = getState().loginuser?.items[0]?.token
        const storeToken = await AsyncStorage.getItem('token')
        const token = stateToken ?? storeToken ?? ''

        try {
            const resp = await axios.post(feedbacks, body, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            })
            // refresh latest (optional)
            dispatch(fetchFeedback())
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

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // addFeedback
            .addCase(addFeedback.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addFeedback.fulfilled, (state, action) => {
                state.loading = false
                state.items = [action.payload]
            })
            .addCase(addFeedback.rejected, (state, action) => {
                state.loading = false
                const err = action.payload as RejectedError | undefined
                state.error = err?.message ?? 'Something went wrong'
            })

            // fetchFeedback
            .addCase(fetchFeedback.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchFeedback.fulfilled, (state, action) => {
                state.loading = false
                state.items = [action.payload]
            })
            .addCase(fetchFeedback.rejected, (state, action) => {
                state.loading = false
                const err = action.payload as RejectedError | undefined
                state.error = err?.message ?? 'Something went wrong'
            })
    },
})

export default feedbackSlice.reducer
// export const selectFeedbackLoading = (s: RootState) => s.feedback.loading
// export const selectFeedbackError   = (s: RootState) => s.feedback.error
// export const selectFeedbackDoc     = (s: RootState) => s.feedback.items[0]

