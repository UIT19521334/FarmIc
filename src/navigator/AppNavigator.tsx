import * as React from 'react';
import { View, Text } from 'react-native';
import { Link, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/LoginScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerContentComponentProps, createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { useTheme } from 'react-native-paper';
import HomeScreen from '../screens/home/HomeScreen';
import ModuleScreen from '../screens/module/ModuleScreen';
import CustomDrawer from '../components/CustomDrawer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigator() {
    const userToken = useSelector((state: RootState) => state.global.userToken);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {userToken ? <Stack.Screen name="MainScreen" component={TabNavigator} /> : <Stack.Screen name="Login" component={LoginScreen} />}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function TabNavigator() {
    const theme = useTheme();
    return (
        <Tab.Navigator
            initialRouteName="Drawer"
            screenOptions={({ route }) => ({
                // https://reactnavigation.org/docs/native-stack-navigator#props

                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerStyle: {
                    backgroundColor: theme.colors.primaryContainer,
                },
                headerTintColor: theme.colors.onPrimaryContainer,
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
                    return <Ionicons name={iconName} size={size} color={color} />;
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
