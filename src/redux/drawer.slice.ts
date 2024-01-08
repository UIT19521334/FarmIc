import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDrawer, ISubmenu } from "../types";
import { AppDispatch } from "./store";
import { convertToGroupedList, convertToSubDivisionList } from "../utils/drawer.utils";
import { callAPI } from "../services/callAPI";
import { loadingGlobal } from "./global.slice";

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
        status: "",
        message: "",
        factory:{},
        menuList: [
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
                ]
            },
        ],
        subDivisionList : [
            {
                SubDivisionID: "string",
                SubDivisionShortName: "string",
                SubDivisionDescription: "string",
                Factories: [
                    {
                        Username: "trung.vudinh@japfa.com",
                        FactoryID: "0000",
                        FactoryName: "Test WH CENTRAL",
                        ConnString: null,
                        IsDefault: null,
                        Order: null,
                        SectionID: null,
                        BusinessUnitID: "00000",
                        BusinessUnitShortName: "Test WH CENTRAL",
                        SubDivisionID: "9999",
                        SubDivisionShortName: "Test_Subdivision",
                        SubDivisionDescription: "Test_Subdivision",
                        IsCentralUnit: "Y",
                        CentralUnitID: "0000",
                        CentralUnitName: "Test WH CENTRAL",
                        DecimalPlaces: 3
                      }
                ]
            }
        ]
    },
    reducers: {
        updateMenuList: (state, action) => {
            state.menuList = action.payload;
        },
        updateSubDivisionList: (state, action) => {
            state.subDivisionList = action.payload;
        },
        updateFactory: (state, action) => {
            state.factory = action.payload;
        },
        clearMessage: (state) => {
            state.message = "";
        }
    },
})

export default drawerSlice

export const {
    updateMenuList,
    updateSubDivisionList,
    updateFactory,
    clearMessage
} = drawerSlice.actions;

export function getDrawerList(drawer: IDrawer) { //thunk function - action
    return function getDrawerListThunk(dispatch: AppDispatch, getState: Function) {
        // console.log('[getDrawerListThunk]', getState());
        // console.log(">>>", drawer);
        // drawer.MenuGroup = 'Dat test middleware';
        // dispatch(drawerSlice.actions.addDrawer(drawer));
        // console.log('[getDrawerListThunk After]', getState());
    }
}

