// src/actions/userActions.ts

// import { AppThunk } from '../app/store';
// import { getUserStart, getUserSuccess, getUserFailure } from '../features/userSlice';

// export const fetchUser = (): AppThunk => async (dispatch) => {
//   try {
//     dispatch(getUserStart());
//     // Simulate an API call
//     const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
//     const data = await response.json();
//     dispatch(getUserSuccess(data));
//   } catch (error) {
//     dispatch(getUserFailure(error.message));
//   }
// };
import { View, Text } from 'react-native'
import React from 'react'

export const callAPI = () => {
  console.log("AAA");
}

