import { registeruseruser } from '@managers/apis'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootState } from '@redux/store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface User {
    email: string
    googleId: string
    name: any
    age: any
    profession: any
    currency: any
    personalIncome: any
    totalHouseholdIncome: any
    expenseByCategory: any
    debts: any
    currentStrategy?: string
}

interface UserState {
    current: User
    items: User[]
    loading: boolean
    error: string | null
}

const initialState: UserState = {
    current: {
        email: '',
        googleId: '',
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

export const addUser = createAsyncThunk<User, User, { state: RootState; rejectValue: any }>(
    'user/addUser',
    async (newUser, { getState, rejectWithValue }) => {

        const _token = (getState().loginuser.items[0].token)


        try {
            const resp = await axios.post<User>(
                registeruseruser,
                newUser,
                {
                    headers: {
                        Authorization: `Bearer ${_token}`,
                    }
                }
            )
            console.log("addUser resp : ", resp)
            return resp.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)
// fetch user....
export const fetchUser = createAsyncThunk<User, void, { state: RootState; rejectValue: any }>(
    'user/fetchUser',
    async (newUser, { getState, rejectWithValue }) => {

        const _token = (getState().loginuser?.items[0]?.token)
        const storetoken = await AsyncStorage.getItem('token')

        try {
            const resp = await axios.get<User>(
                registeruseruser,
                {
                    headers: {
                        Authorization: `Bearer ${_token ? _token : storetoken}`,
                    }
                }
            )
            console.log("fetchUser resp : ", resp.data)
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

        // fetch user data
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false
                state.items = [action.payload]
                state.current = initialState.current
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { setField, resetCurrent } = userSlice.actions
export default userSlice.reducer
