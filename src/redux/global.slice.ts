import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

import { callAPI } from "../services/callAPI";
import { convertToGroupedList, convertToSubDivisionList } from "../utils/drawer.utils";
import { updateMenuList, updateSubDivisionList } from "./drawer.slice";

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        darkMode: false,
        user: {},
        loading: false,
        message: "",
        status: "",
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
        updateUser: (state, action) => {
            state.user = action.payload
        },
        loadingGlobal: (state, action) => {
            state.loading = action.payload
        },
        showToast: (state, action) => {
            state.toast = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(signIn.pending, (state) => {
            state.loading = true
            state.status = "pending"
        }).addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
            state.user = action.payload;
            state.loading = false
            state.status = "success"
            state.message = 'Login success'
        }).addCase(signIn.rejected, (state, action) => {
            state.loading = false
            state.status = "error"
            state.message = action.error.message ? action.error.message : "Login failed"
        });
    },
})

export default globalSlice

export const {
    toggleColorScheme,
    updateUser,
    loadingGlobal,
    showToast,
} = globalSlice.actions;


export const signIn = createAsyncThunk('global/signIn', async (_, thunkAPI) => {
    // 1. Get user by email
    const user: any = await callAPI('PermissionService/GetUserByEmail?username=trung.vudinh@japfa.com&os=Windows&deviceName=N244-ITVDTRUNG&ipAddress=10.94.13.15')
    const data = user
    // 2. Get factory access of user
    const factories: any = await callAPI('PermissionService/GetFactoryAccessOfUser?username=trung.vudinh@japfa.com')
    const subDivisionList = convertToSubDivisionList(factories)
    thunkAPI.dispatch(updateSubDivisionList(subDivisionList))
    // 3. Get menu access of user
    const menu: any = await callAPI('PermissionService/GetMenuAccessOfUser?username=trung.vudinh@japfa.com')
    const menuList = convertToGroupedList(menu)
    thunkAPI.dispatch(updateMenuList(menuList))

    return data;
})