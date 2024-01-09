import { View, Text, Button } from 'react-native';
import React from 'react';
import { useAppDispatch } from '../../redux/store';
import { updateUser } from '../../redux/global.slice';
const ProfileScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title='Sign out' onPress={()=> dispatch(updateUser({}))}/>
    </View>
  );
};

export default ProfileScreen;