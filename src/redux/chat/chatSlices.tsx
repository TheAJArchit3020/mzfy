import { chatwithAI } from '@managers/apis'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootState } from '@redux/store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Chat {
    message: string
}


interface ChatState {
    current: Chat
    items: Chat[]
    loading: boolean
    error: string | null
}

const initialState: ChatState = {
    current: {
        message: '',
    },
    items: [],
    loading: false,
    error: null,
}

type SetFieldPayload = {
    field: keyof Chat
    value: any
}

export const addChat = createAsyncThunk<Chat, Chat, { state: RootState; rejectValue: any }>(
    'chats/addChat',
    async (data, { getState, rejectWithValue }) => {

        const _token = (getState().loginuser?.items[0]?.token)
        const storetoken = await AsyncStorage.getItem('token')


        try {
            const resp = await axios.post<Chat>(
                chatwithAI,
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

const chatSlices = createSlice({
    name: 'chats',
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
            .addCase(addChat.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addChat.fulfilled, (state, action) => {
                state.loading = false
                state.items.push(action.payload)
                state.current = initialState.current
            })
            .addCase(addChat.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

    },
})

export const { setField, resetCurrent } = chatSlices.actions
export default chatSlices.reducer
