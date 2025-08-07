import { registeruseruser } from '@managers/apis'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface User {
    name: any
    age: any
    profession: any
    currency: any
    personalIncome: any
    totalHouseholdIncome: any
    expenseByCategory: any
    debts: any
}

interface UserState {
    current: User
    items: User[]
    loading: boolean
    error: string | null
}

const initialState: UserState = {
    current: {
        name: '',
        age: '',
        profession: '',
        currency: '',
        personalIncome: '',
        totalHouseholdIncome: '',
        expenseByCategory: {},
        debts: [],
    },
    items: [],
    loading: false,
    error: null,
}

type SetFieldPayload = {
    field: keyof User
    value: any
}

export const addUser = createAsyncThunk<User, User>(
    'user/addUser',
    async (newUser, { rejectWithValue }) => {
        try {
            const resp = await axios.post<User>(
                registeruseruser,
                newUser,
                {
                    headers: {
                        // standard Bearer scheme; change if your API expects something else
                        // Authorization: `Bearer ${token}`
                    }
                }
            )
            return resp.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
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
            .addCase(addUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false
                state.items.push(action.payload)
                state.current = initialState.current
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { setField, resetCurrent } = userSlice.actions
export default userSlice.reducer
