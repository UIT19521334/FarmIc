import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDrawer, ISubmenu } from "../types";
import { AppDispatch } from "./store";
import { convertToGroupedList } from "../utils/drawer.utils";
import { callAPI } from "../services/callAPI";
import { loadingGlobal } from "./global.slice";

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
        status: "",
        message: "",
        subdivision: "",
        central: "",
        drawerList: [
            {
                MenuGroup: "MASTER",
                SubMenu: [
                    {
                        Username: null,
                        MenuID: "101",
                        MenuName: "Goods Group",
                        MenuGroup: "MASTER",
                        MenuIcon: "ViewGrid",
                        MenuLink: "FARM_IC.Master.View.ucGroupGood",
                        OrderIndex: null,
                        CreatedTime: null
                    },
                    {
                        Username: null,
                        MenuID: "102",
                        MenuName: "Good",
                        MenuGroup: "MASTER",
                        MenuIcon: "Puzzle",
                        MenuLink: "FARM_IC.Master.View.ucGood",
                        OrderIndex: null,
                        CreatedTime: null
                    }

                ]
            },
        ],
    },
    reducers: {
        addDrawer: (state, action) => {
            state.drawerList.push(action.payload);
        },
        changeDrawer: (state, action) => {
            state.drawerList = action.payload;
        },
        clearMessage: (state) => {
            state.message = "";
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchDrawer.pending, (state) => {
            state.status = 'loading';
        }).addCase(fetchDrawer.fulfilled, (state, action: PayloadAction<any>) => {
            state.drawerList = action.payload;
            state.status = 'success';
            state.message = 'Loading drawer success'
        }).addCase(fetchDrawer.rejected, (state, action) => {
            state.status = 'failed'
            state.message = action.error.message ? action.error.message : "Loading drawer failed"
        });
    }
})

export default drawerSlice

export const {
    addDrawer,
    clearMessage
} = drawerSlice.actions;

export function getDrawerList(drawer: IDrawer) { //thunk function - action
    return function getDrawerListThunk(dispatch: AppDispatch, getState: Function) {
        console.log('[getDrawerListThunk]', getState());
        console.log(">>>", drawer);
        drawer.MenuGroup = 'Dat test middleware';
        dispatch(drawerSlice.actions.addDrawer(drawer));
        console.log('[getDrawerListThunk After]', getState());
    }
}

export const fetchDrawer = createAsyncThunk('drawer/fetchDrawer', async (_, thunkAPI) => {
    thunkAPI.dispatch(loadingGlobal(true))
    
    const res: any = await callAPI('PermissionService/GetMenuAccessOfUser?username=dat.nguyenducchi@japfa.com')
    const data = convertToGroupedList(res)
    thunkAPI.dispatch(loadingGlobal(false))
    return data;
})
