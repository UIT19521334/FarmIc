import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IDrawer, ISubmenu } from '../types';
import { Button, List } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const CustomDrawer = (props: DrawerContentComponentProps) => {
    const drawerList = useSelector(
        (state: RootState) => state.drawer.drawerList,
    );
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);
    const theme = useTheme()
	const darkMode = useSelector((state: RootState) => state.global.darkMode);
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.onPrimary }}>
			<StatusBar translucent backgroundColor="rgba(0,0,0,0)" barStyle={darkMode ? "light-content" : "dark-content"}/>
            <DrawerContentScrollView {...props}> 
                <List.Section>
                    {drawerList.map((item: IDrawer, index: number) => (
                        <List.Accordion
                            key={index}
                            title={item.MenuGroup}
                            left={props => (
                                <List.Icon {...props} icon="folder" />
                            )}>
                            {item.SubMenu.map(
                                (submenu: ISubmenu, index: number) => (
                                    <List.Item key={index} title={submenu.MenuName} />
                                ),
                            )}
                        </List.Accordion>
                    ))}
                </List.Section>
            </DrawerContentScrollView>
        </View>
    );
};

export default CustomDrawer;
