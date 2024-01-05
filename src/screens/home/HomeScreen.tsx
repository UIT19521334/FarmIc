import React from 'react';
import { StatusBar, Text, View } from 'react-native';

import { RootState, useAppDispatch } from '../../redux/store';
import { clearMessage, fetchDrawer } from '../../redux/drawer.slice';
import { Button, Snackbar } from 'react-native-paper';
import { toggleColorScheme } from '../../redux/global.slice';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
    const dispatch = useAppDispatch();
    const theme = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
            <Button onPress={() => dispatch(fetchDrawer())}>Fetch drawer</Button>
            <Button onPress={() => dispatch(toggleColorScheme())}>Change theme</Button>
        </View>
    );
}
