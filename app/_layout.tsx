import React from 'react';
import { Stack } from 'react-native-auto-route';

export default function Layout() {
  return <Stack initialRouteName="(drawer)" screenOptions={{headerShown: false}} />;
}