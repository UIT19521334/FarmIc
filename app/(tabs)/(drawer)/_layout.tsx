import { createDrawerNavigator, type DrawerNavigationEventMap, type DrawerNavigationOptions } from '@react-navigation/drawer';
import type { DrawerNavigationState, ParamListBase } from '@react-navigation/native';
import { createNavigator } from 'react-native-auto-route';

import React from 'react';
import CustomDrawer from '../../../src/components/CustomDrawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useTheme } from 'react-native-paper';

const DrawerNavigator = createDrawerNavigator().Navigator;

export const Drawer = createNavigator<
    DrawerNavigationState<ParamListBase>,
    DrawerNavigationOptions,
    DrawerNavigationEventMap,
    Omit<React.ComponentProps<typeof DrawerNavigator>, 'id' | 'children'> & {
        children?: React.ReactNode;
    }
>(DrawerNavigator);

const DrawerLayout = () => {
    const theme = useTheme();
    return (
        <Drawer
            drawerContent={(props: DrawerContentComponentProps) => <CustomDrawer {...props} />}
            initialRouteName="home/index"
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.primaryContainer,
                },
                headerTintColor: theme.colors.onPrimaryContainer,
            }}>
            {/** The screen will be included automatically. Just need declare if you need to add custom configuration */}
            <Drawer.Screen
                name="home/index" // name prop is directory name or filename
                options={{}}
            />
        </Drawer>
    );
};

export default DrawerLayout;
export const screenOptions = {
    headerShown: false,
    title: 'Main',
};
