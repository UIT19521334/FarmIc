// src/app/store.ts

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import thunk, { ThunkMiddleware } from 'redux-thunk';
import drawerSlice from './drawer.slice';

const store = configureStore({
    reducer: {
        drawer: drawerSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store
