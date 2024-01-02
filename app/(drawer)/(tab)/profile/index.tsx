import { View, Text, Button } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
// import { addDrawer } from 'root/components/drawer.slice';
import { callAPI } from 'root/services/callAPI';
const Profile = () => {
  const dispatch = useDispatch();
  const newDrawer = {id: 6, name: 'detail/screen1', active: false, priority: 'Medium1'}
  
  return (
    <View>
      <Text>Profile</Text>
      <Button title='Upload drawer' onPress={()=> callAPI()}/>
    </View>
  );
};

export default Profile;