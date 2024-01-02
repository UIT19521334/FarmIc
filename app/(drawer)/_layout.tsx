import React from 'react';
import Drawer from '../../src/navigator/drawer';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store';

const DrawerLayout = () => {
  const drawerList = useSelector((state: RootState) => state.drawer);
  return (
    <Drawer>
      {/** The screen will be included automatically. Just need declare if you need to add custom configuration */}
      <Drawer.Screen
        name="(tab)" // name prop is directory name or filename
        options={{
          // https://reactnavigation.org/docs/stack-navigator#options
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name='detail/[...screen]'
        options={{
          title: "Bla"
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;