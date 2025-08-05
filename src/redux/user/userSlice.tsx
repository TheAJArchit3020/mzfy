import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'


export interface User {
    id: number
    name: string
    age: number
}

interface UserState {
    items: User[]
    loading: boolean
    error: string | null
}

const initialState: UserState = {
    items: [],
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserDetails(state, action: PayloadAction<User>) {
            state.items.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false
                state.items.push(action.payload)
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})


// 2) Async thunk to POST a new user
export const addUser = createAsyncThunk<
    User
>(
    'user/addUser',
    async (newUser, { rejectWithValue }) => {
        try {
            const resp = await axios.post<User>(
                'https://your.api.endpoint.com/users',
                newUser
            )
            return resp.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const { addUserDetails } = userSlice.actions
export default userSlice.reducer
