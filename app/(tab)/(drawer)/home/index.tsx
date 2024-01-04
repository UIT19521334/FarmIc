import React from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'react-native-auto-route';
import { useAppDispatch } from '../../../../src/redux/store';
import { fetchDrawer } from '../../../../src/redux/drawer.slice';
import { Button } from 'react-native-paper';
import { toggleColorScheme } from '../../../../src/redux/global.slice';
import { useTheme } from 'react-native-paper';
import { getBackgroundPrimaryColor, getPrimaryColor } from '../../../../src/utils/global.utils';
export default function Home() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const theme = useTheme();
    return (
        <View>
            <Text>Home</Text>
            <Button buttonColor={theme.colors.onPrimary} onPress={() => router.push('picker')}>Open modal</Button>
            <Button onPress={() => router.setOptions({ title: 'Updated!' })}>Update the title</Button>
            <Button onPress={() => dispatch(fetchDrawer())}>Fetch drawer</Button>
            <Button onPress={() => dispatch(toggleColorScheme())}>Change theme</Button>
    
        </View>
    );
}

export const screenOptions = { 
  title: 'Home',
  headerStyle: {
    backgroundColor: getBackgroundPrimaryColor(),
  },
  headerTintColor: getPrimaryColor(),
  
};
