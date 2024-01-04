import React from 'react';
import RouterRoot, { DefaultTheme } from 'react-native-auto-route';
import { PaperProvider, MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { darkScheme, lightScheme } from './themes/theme';
import { StatusBar, Text, View } from 'react-native';

const Setup = () => {
    const darkMode = useSelector((state: RootState) => state.global.darkMode);
    const theme = darkMode ? { ...MD3DarkTheme, colors: darkScheme.colors } : { ...MD3LightTheme, colors: lightScheme.colors };
    const { appTheme }: any = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });
    return (
        <PaperProvider theme={theme}>
            <RouterRoot theme={appTheme} />
        </PaperProvider>
    );
};

export default Setup;
