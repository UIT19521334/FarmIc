// src/app/store.ts

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import thunk, { ThunkMiddleware } from 'redux-thunk';
import drawerSlice from './drawer.slice';
import { useDispatch } from 'react-redux';
import globalSlice from './global.slice';

const store = configureStore({
    reducer: {
        drawer: drawerSlice.reducer,
        global: globalSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
    })
});
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>;
export default store
