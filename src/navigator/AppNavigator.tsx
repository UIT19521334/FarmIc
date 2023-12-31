import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/LoginScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerContentComponentProps, createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { Text, useTheme } from 'react-native-paper';
import HomeScreen from '../screens/home/HomeScreen';
import ModuleScreen from '../screens/module/ModuleScreen';
import CustomDrawer from '../components/CustomDrawer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { View } from 'react-native';
import { isEmpty } from 'lodash';
import LoginAzure from '../screens/login/microsoftLogin/LoginAzure';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigator() {
    const user = useSelector((state: RootState) => state.global.user);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isEmpty(user) ? <Stack.Screen name="Authorized" component={TabNavigator} /> : <Stack.Screen name="Unauthorized" component={Unauthorized} />}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function Unauthorized () {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="LoginAzure" component={LoginAzure} />
        </Stack.Navigator>
    )
}

function TabNavigator() {
    const theme = useTheme();
    return (
        <Tab.Navigator
            initialRouteName="Drawer"
            screenOptions={({ route }) => ({
                // https://reactnavigation.org/docs/native-stack-navigator#props
                headerStyle: {
                    backgroundColor: theme.colors.primaryContainer,
                },
                headerTintColor: theme.colors.onBackground,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'home';

                    if (route.name === 'Drawer') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else {
                        if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                    }

                    // You can return any component that you like here!
                    return (
                        <View
                            style={{
                                backgroundColor: focused ? theme.colors.primary : 'transparent',
                                borderRadius: 14,
                                paddingTop: 4,
                                marginTop: 1,
                                paddingBottom: 4,
                                paddingHorizontal: 18,
                            }}
                        >
                            <Ionicons name={iconName} size={size*0.75} color={ focused ? theme.colors.background : theme.colors.onBackground} />
                        </View>
                    );
                },
                tabBarStyle: {
                    backgroundColor: theme.colors.primaryContainer,
                },
                tabBarLabel(props) {
                    let label = route.name;
                    if (route.name === 'Drawer') {
                        label = 'Home';
                    }
                    return <Text variant="labelSmall">{label}</Text>;
                },
            })}>
            {/** The screen will be included automatically. Just need declare if you need to add custom configuration */}
            <Tab.Screen
                name="Drawer" // name prop is directory name or filename
                options={{
                    tabBarBadge: 3,
                    headerShown: false,
                    headerTitle: 'Home',
                }}
                component={DrawerNavigator}
            />
            <Tab.Screen
                name="Profile" // name prop is directory name or filename
                options={{ title: 'Profile' }}
                component={ProfileScreen}
            />
        </Tab.Navigator>
    );
}

function DrawerNavigator() {
    const theme = useTheme();
    return (
        <Drawer.Navigator
            drawerContent={(props: DrawerContentComponentProps) => <CustomDrawer {...props} />}
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.primaryContainer,
                },
                headerTintColor: theme.colors.onPrimaryContainer,
            }}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Notifications" component={ModuleScreen} />
        </Drawer.Navigator>
    );
}
