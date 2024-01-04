import React from 'react';
import Drawer from '../../../src/navigator/drawer';
import CustomDrawer from '../../../src/components/CustomDrawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useTheme } from 'react-native-paper';

const DrawerLayout = () => {
  const theme = useTheme();
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
