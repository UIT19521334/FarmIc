import { View, Text, Button } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDrawer } from '../../../src/redux/drawer.slice';
import { RootState } from '../../../src/redux/store';
const Profile = () => {
  const dispatch = useDispatch();
  const newDrawer = {id: 6, name: 'detail/screen1', active: false, priority: 'Medium1'}
  const drawerList = useSelector((state: RootState) => state.drawer);
  return (
    <View>
      <Text>Profile</Text>
      <Button title='Upload drawer' onPress={()=> dispatch(addDrawer(newDrawer))}/>
      {drawerList.map((item, index)=> 
        <Text style={{color: "#000"}} key={index}>{item.name}</Text>
      )}
    </View>
  );
};

export default Profile;
export const screenOptions = {
  title: 'Profile'
};