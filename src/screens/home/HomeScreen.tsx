import React from 'react';
import { StatusBar, Text, View } from 'react-native';

import { useAppDispatch } from '../../redux/store';
import { fetchDrawer } from '../../redux/drawer.slice';
import { Button } from 'react-native-paper';
import { toggleColorScheme } from '../../redux/global.slice';
import { useTheme } from 'react-native-paper';

export default function HomeScreen() {

    const dispatch = useAppDispatch();
    const theme = useTheme();
    return (
        <View style={{ flex: 1 }}>
            <Text>HomeScreen</Text>


            <Button onPress={() => dispatch(fetchDrawer())}>Fetch drawer</Button>
            <Button onPress={() => dispatch(toggleColorScheme())}>Change theme</Button>
        </View>
    );
}
