import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { useRouter } from 'react-native-auto-route';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store';
import { useTheme } from 'react-native-paper';
import { useGlobalStyles } from '../../src/themes/styles';

const Login = () => {
    const theme = useTheme();
    const router = useRouter();
    const darkMode = useSelector((state: RootState) => state.global.darkMode);
    const styles = useGlobalStyles();
    return (
        <View style={styles.center}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" barStyle={darkMode ? 'light-content' : 'dark-content'} />
            <Button uppercase onPress={() => router.replace('(app)')}>
                Login with email japfa
            </Button>
        </View>
    );
};

export default Login;

