import React from 'react';
import Drawer from '../../../src/navigator/drawer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../src/redux/store';
import CustomDrawer from '../../../src/components/CustomDrawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const DrawerLayout = () => {
  const drawerList = useSelector((state: RootState) => state.drawer);
  return (
    <Drawer drawerContent={(props : DrawerContentComponentProps) => <CustomDrawer {...props}/>} initialRouteName='home/index'>
      {/** The screen will be included automatically. Just need declare if you need to add custom configuration */}
      <Drawer.Screen
        name="home/index" // name prop is directory name or filename
        options={{
          // https://reactnavigation.org/docs/stack-navigator#options
          title: 'Home',
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
export const screenOptions = {
  headerShown: false,
  title: 'Main'
};
