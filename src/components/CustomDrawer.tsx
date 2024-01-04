import { View, Text } from 'react-native';
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

const CustomDrawer = (props: DrawerContentComponentProps) => {
    const drawerList = useSelector(
        (state: RootState) => state.drawer.drawerList,
    );
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
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
                                    <List.Item title={submenu.MenuName} />
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
