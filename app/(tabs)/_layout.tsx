import { Redirect, Tabs, useRouter } from 'react-native-auto-route';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store';
import { Text, View } from 'react-native';
import { useNavigation } from 'react-native-auto-route';
import Link from 'react-native-auto-route';

export default function Layout() {
    const theme = useTheme();
    const navigation = useNavigation();
    const router = useRouter();
    const loading = useSelector((state: RootState) => state.global.loading);
    const userToken = useSelector((state: RootState) => state.global.userToken);
    
    if (loading) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Loading...</Text>
            </View>
        )
    }

    if (!userToken) {
        // return <Redirect to="login/Login"/>
        router.navigate('login/Login');
    }

    return (
        <Tabs
            initialRouteName="(drawer)" // initialRouteName is directory name or filename
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

                    if (route.name === '(drawer)') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else {
                        if (route.name === 'profile/index') {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}>
            {/** The screen will be included automatically. Just need declare if you need to add custom configuration */}
            <Tabs.Screen
                name="(drawer)" // name prop is directory name or filename
                options={{
                    tabBarBadge: 3,
                }}
            />
            <Tabs.Screen
                name="profile/index" // name prop is directory name or filename
                options={{}}
            />
        </Tabs>
    );
}
