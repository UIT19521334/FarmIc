import { View, Text, Button } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDrawer, getDrawerList } from '../../../src/redux/drawer.slice';
import { RootState, useAppDispatch } from '../../../src/redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { IDrawer } from '../../../src/types';
const Profile = () => {
  const dispatch = useAppDispatch();
  const newDrawer : IDrawer = {
    menu: "Primary",
    submenu : [
      {
        name: "menu 1",
        list: [
          {
            id: 1,
            active: true,
            name: "test1",
            priority: "primary/menu1/test1",
          }
        ]
      }
    ]
  }
  const drawerList = useSelector((state: RootState) => state.drawer.drawerList);
  return (
    <View>
      <Text>Profile</Text>
      <Button title='Upload drawer' onPress={()=> dispatch(getDrawerList(newDrawer))}/>
      {drawerList.map((item, index)=> 
        <Text style={{color: "#000"}} key={index}>{item.menu}</Text>
      )}
    </View>
  );
};

export default Profile;
export const screenOptions = {
  title: 'Profile'
};