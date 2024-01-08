import React, { useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';

import { RootState, useAppDispatch } from '../../redux/store';
import { Button, Snackbar } from 'react-native-paper';
import { loadingGlobal, toggleColorScheme } from '../../redux/global.slice';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

export default function HomeScreen() {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const globalMessage = useSelector((state: RootState) => state.global.message);
    const globalStatus = useSelector((state: RootState) => state.global.status);
    // Handle loading drawer when go to app
    useEffect(() => {
        if (globalStatus === 'error') {
            Toast.show({
                type: 'error',
                text1: globalMessage,
            });
        }
        if (globalStatus === 'success') {
            Toast.show({
                type: 'success',
                text1: globalMessage,
            });
        }
    }, [dispatch, globalStatus]);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
            <Button onPress={() => dispatch(toggleColorScheme())}>Change theme</Button>
        </View>
    );
}
