import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef } from 'react';
import { ADLoginView, ReactNativeAD } from './components';
import { Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { signIn } from '../../../redux/global.slice';
import { useAppDispatch } from '../../../redux/store';

const CLIENT_ID = 'd14ca098-eb8e-4cbb-a748-09ff6035c55f';
const OUTLOOK = 'https://outlook.office365.com';

export default function LoginAzure() {
  const dispatch = useAppDispatch();

  const onLoginSuccess = async (credentials: any) => {
    try {
      const strAccessToken = await credentials[OUTLOOK].access_token;
      AsyncStorage.setItem('userToken', JSON.stringify(strAccessToken));
      const userToken = JSON.stringify(strAccessToken);
      dispatch(signIn(userToken))
    } catch (error : any) {
      Alert.alert(error);
    }
  };

  const onLoginSuccessWithoutAccount = () => {
    try {
      const strAccessToken = `eyJ0eXAiOiJKV1QiLCJub25jZSI6ImJpcjhDYU80WHhkVlg3Tm1DMkNNVVppR0p3VnVKTlZsaFdWbHlHbzVQTUEiLCJhbGciOiJSUzI1NiIsIng1dCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSIsImtpZCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSJ9.eyJhdWQiOiJodHRwczovL291dGxvb2sub2ZmaWNlMzY1LmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzA4YzY3ZDI3LThmZTMtNDY2My04MzQ5LTY4YmMxYWNlMmViZS8iLCJpYXQiOjE1OTcyOTk0MTAsIm5iZiI6MTU5NzI5OTQxMCwiZXhwIjoxNTk3MzAzMzEwLCJhY2N0IjowLCJhY3IiOiIxIiwiYWlvIjoiRTJCZ1lGaHJWWFJNUENMRXE5TzdiKzdSZjZhTCtCbkZ6Y1B2enB4amFqRjFBZlBwREVFQSIsImFtciI6WyJwd2QiXSwiYXBwX2Rpc3BsYXluYW1lIjoiTG9naW4iLCJhcHBpZCI6ImQxNGNhMDk4LWViOGUtNGNiYi1hNzQ4LTA5ZmY2MDM1YzU1ZiIsImFwcGlkYWNyIjoiMCIsImVuZnBvbGlkcyI6W10sImZhbWlseV9uYW1lIjoiVnUgRGluaCIsImdpdmVuX25hbWUiOiJLaG9hIiwiaXBhZGRyIjoiMTE1Ljc1LjEuMjI2IiwibmFtZSI6IlZ1IERpbmggS2hvYSAoSE8gSkNWIC0gSVQpIiwib2lkIjoiYzkwYmZjZDUtNzNmNC00NmE5LWJmM2EtYjkwMTNlOGFkZjZlIiwicHVpZCI6IjEwMDMyMDAwQ0MwNDA1M0YiLCJzY3AiOiJVc2VyLlJlYWQiLCJzaWQiOiI2Y2RhMjg3Yy03YjhiLTQ4MjYtOGY5Mi0yMzZmY2U0ZGRiZjkiLCJzdWIiOiJWWWkzVVhFcHRqVEpZQVljdlpqbmxnZ2dsdDBoNC13VmlsLXVjdjZOcDJnIiwidGlkIjoiMDhjNjdkMjctOGZlMy00NjYzLTgzNDktNjhiYzFhY2UyZWJlIiwidW5pcXVlX25hbWUiOiJraG9hLnZ1ZGluaEBqYXBmYS5jb20iLCJ1cG4iOiJraG9hLnZ1ZGluaEBqYXBmYS5jb20iLCJ1dGkiOiJMZmNJSXdRV0NrR1VteTdxckswNkFBIiwidmVyIjoiMS4wIn0.lAOAaLipN275ej4Rx6-jFH67wuquOQuH2RdF9K3tO-rPiEIrBqml6ewH4_cqFZNkI2WnnWNGpPV9GhVa5qU1yyVrUBqkuHQQUCZi2RWXj1YRrb-v_kHD3a8u5wgIENmFoJN3piu5GmmKLF4pXEQTVILEHY0aqQ4VDkNDEqvdfEipnIOkLiOLs9L-KjoRkAuWWczcWeL9I42H7ylc7SKxmxhMm8M89Q4DAOk0k3fekmo4j7P1kAuh2VuwWkRHIjMt5XoDRDFFbDWRTIWaVRlFktNqSPLRuGKn1HUUI9jCjnCeS0yEjcGBhPKSZEBD4b51fTk2hCAMrwlDnFRrISGjuQ`;
      AsyncStorage.setItem('userToken', JSON.stringify(strAccessToken));
    } catch (error:any) {
      Alert.alert(error);
    }
  };

  const rNativeAd = useRef(
    new ReactNativeAD({
      client_id: CLIENT_ID,
      resources: [OUTLOOK],
      client_secret: null,
      login_hint: null,
      prompt: null,
      redirect_uri:null,
      tenant: null,
      token_uri: null
    }),
  ).current;

  return (
    <SafeAreaView style={{flex : 1}}>
      <ADLoginView
        context={rNativeAd}
        onSuccess={(e: any) => onLoginSuccess(e)}
        hideAfterLogin
        needLogout
      />
    </SafeAreaView>
  );
}
