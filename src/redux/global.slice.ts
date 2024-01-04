import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        darkMode: false,
    },
    reducers: {
        toggleColorScheme: (state) => {
            state.darkMode = !state.darkMode
        },
    },
})

export default globalSlice

export const {
    toggleColorScheme,
} = globalSlice.actions;
