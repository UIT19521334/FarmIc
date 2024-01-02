import React from 'react';
import {Button, Text, View} from 'react-native';
import {useRouter} from 'react-native-auto-route';

export default function Home() {
  const router = useRouter();
  return (
    <View>
      <Text>Home</Text>
      <Button title='Open modal' onPress={() => router.push('picker')}/>
      <Button
  title="Update the title"
  onPress={() => router.setOptions({ title: 'Updated!' })}
/>
    </View>
  );
} 

export const screenOptions = { title: 'Home' };