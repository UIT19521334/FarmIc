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
import { View, Text, Alert } from 'react-native'
import React from 'react'
import store from '../redux/store'

export const callAPI = async (endpoint: string) => {
  const baseUrl = store.getState().global.baseUrl;
  const URL = baseUrl + endpoint;
  return fetch(URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      // Authorization: ,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err: any) => { 
      Alert.alert(err)
     })
}

