import { View, Dimensions } from 'react-native';
import React from 'react';
import { useGlobalStyles } from '../themes/styles';
import { ActivityIndicator, useTheme, MD3Colors, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Loading = () => {
    const styles = useGlobalStyles();
    const theme = useTheme();
    const loading = useSelector((state: RootState) => state.global.loading);

    return loading ? (
        <View style={styles.overlay}>
            <View
                style={{
                    backgroundColor: theme.colors.onBackground,
                    opacity: 0.9,
                    borderRadius: 20,
                    height: 120,
                    width: 120,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <ActivityIndicator size={'large'} animating={true} color={theme.colors.background} style={{ padding: 4, height: 80, width: 80 }} />
                <Text variant='titleMedium' style={{ color: theme.colors.background }}>Loading...</Text>
            </View>
        </View>
    ) : null;
};

export default Loading;
