import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        darkMode: false,
        userToken: undefined,
        loading: false,
    },
    reducers: {
        toggleColorScheme: (state) => {
            state.darkMode = !state.darkMode
        },
        updateUserToken: (state, action) => {
            state.userToken = action.payload
        },
        loadingGlobal: (state, action) => {
            state.loading = action.payload
        }
    },
})

export default globalSlice

export const {
    toggleColorScheme,
    updateUserToken,
    loadingGlobal
} = globalSlice.actions;
