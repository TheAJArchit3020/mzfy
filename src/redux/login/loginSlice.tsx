import { checkuser, registeruseruser } from '@managers/apis'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface login_user {
    idToken: any
    token?: any
    detailsExists?: boolean
    userId?: string
}

interface login_user_state {
    current: login_user
    items: login_user[]
    loading: boolean
    error: string | null
}

const initialState: login_user_state = {
    current: {
        idToken: '',
    },
    items: [],
    loading: false,
    error: null,
}

type SetFieldPayload = {
    field: keyof login_user
    value: any
}

// check user ...

export const checkUser = createAsyncThunk<login_user, login_user>(
    'user/checkUser',
    async (newUser, { rejectWithValue }) => {

        console.log("new user", newUser)
        try {
            const resp = await axios.post<login_user>(
                checkuser,
                newUser
            )

            console.log("checkUser resp : ", resp)
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


// register user data ...

// export const registerUser = createAsyncThunk<login_user, login_user>(
//     'user/registerUser',
//     async (data, { rejectWithValue }) => {

//         console.log("new user", data)
//         try {
//             const resp = await axios.post<login_user>(
//                 registeruseruser,
//                 data
//             )

//             console.log("registeruseruser resp : ", resp)
//             return resp.data
//         } catch (err: any) {
//             if (axios.isAxiosError(err)) {

//                 const statusCode = err.response?.status
//                 const errorData = err.response?.data

//                 return rejectWithValue({
//                     message: err.message,
//                     status: statusCode,
//                     data: errorData,
//                 })
//             } else {
//                 // Non-Axios error (e.g. coding bug, thrown manually)
//                 console.log("Unexpected error:", err)
//                 return rejectWithValue({ message: (err as Error).message })
//             }
//         }
//     }
// )

const loginUserSlice = createSlice({
    name: 'loginuser',
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

        // check user data

        builder
            .addCase(checkUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(checkUser.fulfilled, (state, action) => {
                state.loading = false
                state.items = [action.payload]
                state.current = initialState.current
            })
            .addCase(checkUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })


        // register user data
        // builder
        //     .addCase(registerUser.pending, (state) => {
        //         state.loading = true
        //         state.error = null
        //     })
        //     .addCase(registerUser.fulfilled, (state, action) => {
        //         state.loading = false
        //         state.items.push(action.payload)
        //         state.current = initialState.current
        //     })
        //     .addCase(registerUser.rejected, (state, action) => {
        //         state.loading = false
        //         state.error = action.payload as string
        //     })
    },
})

export const { setField, resetCurrent } = loginUserSlice.actions
export default loginUserSlice.reducer
