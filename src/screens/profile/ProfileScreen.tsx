import { View, Text, Button } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDrawer, getDrawerList } from '../../redux/drawer.slice';
import { RootState, useAppDispatch } from '../../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { IDrawer } from '../../types';
const ProfileScreen = () => {
  const dispatch = useAppDispatch();

  const drawerList = useSelector((state: RootState) => state.drawer.drawerList);
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title='Upload drawer' onPress={()=> console.log("object")}/>
    </View>
  );
};

export default ProfileScreen;