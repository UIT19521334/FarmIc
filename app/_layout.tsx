import React from 'react';
import { Stack } from 'react-native-auto-route';

export default function Layout() {
  return <Stack initialRouteName="(tab)">
    <Stack.Screen name="(tab)"
      options={{headerShown: false}}
    />

    <Stack.Screen name='(modal)'
      options={{headerShown: false, presentation: 'modal'}}
    />


  </Stack>;
}