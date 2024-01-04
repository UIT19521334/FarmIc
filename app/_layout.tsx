import React from 'react';
import { Stack } from 'react-native-auto-route';

export default function Layout() {
    return (
        <Stack initialRouteName="(tabs)">
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="login/Login" options={{ headerShown: false }} />
            <Stack.Screen name="(modal)" options={{ headerShown: false, presentation: 'modal' }} />
        </Stack>
    );
}
