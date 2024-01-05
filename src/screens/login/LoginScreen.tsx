import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { useTheme } from 'react-native-paper';
import { useGlobalStyles } from '../../themes/styles';
import { signIn, updateUserToken } from '../../redux/global.slice';
const LoginScreen = ({ navigation } : any) => {
    const theme = useTheme();
    const dispatch  = useAppDispatch();
    const darkMode = useSelector((state: RootState) => state.global.darkMode);
    const styles = useGlobalStyles();
    return (
        <View style={styles.center}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" barStyle={darkMode ? 'light-content' : 'dark-content'} />
            <Button uppercase onPress={() => dispatch(signIn("bla"))}>
                Login with email japfa
            </Button>
        </View>
    );
};

export default LoginScreen;

