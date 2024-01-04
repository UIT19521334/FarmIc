import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'react-native-auto-route';
import { useTheme } from 'react-native-paper';
const ModalLayout = () => {
    const router = useRouter();
    const _renderClose = () => (
        <TouchableOpacity onPress={router.back}>
            <Text>Close</Text>
        </TouchableOpacity>
    );
    const theme = useTheme();
    return (
        <Stack
            screenOptions={{
                // Show close button in header for all screens in modal group
                headerRight: _renderClose,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerStyle: {
                    backgroundColor: theme.colors.primaryContainer,
                },
                headerTintColor: theme.colors.onPrimaryContainer,
            }}
        />
    );
};

export default ModalLayout;
