import React from 'react';
import { PaperProvider, MD3DarkTheme, MD3LightTheme, adaptNavigationTheme, Snackbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { darkScheme, lightScheme } from './themes/theme';
import { StatusBar, Text, View } from 'react-native';
import AppNavigator from './navigator/AppNavigator';
import Loading from './components/Loading';

const Setup = () => {
    const darkMode = useSelector((state: RootState) => state.global.darkMode);
    const theme = darkMode ? { ...MD3DarkTheme, colors: darkScheme.colors } : { ...MD3LightTheme, colors: lightScheme.colors };
    return (
        <PaperProvider theme={theme}>
            <Loading/>
            <AppNavigator/>
        </PaperProvider>
    );
};

export default Setup;
