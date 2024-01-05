import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        darkMode: false,
        userToken: undefined,
        loading: false,
        toast: {
            type: "success",
            message: "",
        },
        baseUrl: 'https://supplysouth.japfa.com.vn:62150/api/',
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
        },
        showToast: (state, action) => {
            state.toast = action.payload
        }
    },
})

export default globalSlice

export const {
    toggleColorScheme,
    updateUserToken,
    loadingGlobal,
    showToast,
} = globalSlice.actions;


export function signIn(userToken: any) { //thunk function - action
    return function signInThunk(dispatch: AppDispatch, getState: Function) {
        dispatch(globalSlice.actions.loadingGlobal(true));
        // Xử lý login - để tạm trong này cho có vẻ loading
        setTimeout(() => {
            dispatch(globalSlice.actions.loadingGlobal(false));
            dispatch(globalSlice.actions.updateUserToken("Dat test token"));
        }, 2000);

    }
}