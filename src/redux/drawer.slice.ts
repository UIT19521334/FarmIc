import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: [
        {id: 1, name: 'detail/screen1', active: false, priority: 'Medium1'},
        {id: 2, name: 'detail/screen2', active: false, priority: 'Medium2'},
        {id: 3, name: 'detail/screen3', active: false, priority: 'Medium3'},
        {id: 4, name: 'detail/screen4', active: false, priority: 'Medium4'}
    ],
    reducers: {
        addDrawer: (state, action) =>{
            state.push(action.payload);
        },
        toogleDrawer: (state, action) => {
            const current = state.find(todo => todo.id === action.payload);
            if (current) {
                current.active = !current.active;
            }
        }
    }
})

export default drawerSlice

export const {
    addDrawer,
    toogleDrawer
  } = drawerSlice.actions;

export function getDrawerList(drawer: any) { //thunk function - action
    return function getDrawerListThunk(dispatch : any, getState : any) {
        console.log('[getDrawerListThunk]', getState());
        console.log({drawer});
        drawer.name = 'Dat test middleware';
        dispatch(drawerSlice.actions.addDrawer);
        console.log('[getDrawerListThunk After]', getState());
    }
}