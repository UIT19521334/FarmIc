import { View, StatusBar, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IDrawer, ISubmenu } from '../types';
import { Avatar, Button, Drawer, List, Searchbar, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import images from '../assets/images/image';
import { getNameIcon } from '../utils/drawer.utils';

const CustomDrawer = (props: DrawerContentComponentProps) => {
    const drawerList = useSelector((state: RootState) => state.drawer.drawerList);

    const [activeSubmenu, setActiveSubmenu] = useState('');
    const [expandedMenu, setExpandedMenu] = useState(-1);

    const theme = useTheme();
    const darkMode = useSelector((state: RootState) => state.global.darkMode);
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query: string) => setSearchQuery(query);
    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" barStyle={darkMode ? 'light-content' : 'dark-content'} />

            <View
                style={{
                    paddingHorizontal: 20,
                    paddingBottom: 10,
                    height: 200,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: theme.colors.primaryContainer,
                }}>
                <Avatar.Image size={80} source={images.logoJapfa} style={{ backgroundColor: theme.colors.background }} />
                <Text variant="titleSmall" style={{ color: theme.colors.onBackground }}>
                    dat.nguyenducchi@japfa.com
                </Text>
                <Text variant="titleMedium" style={{ color: theme.colors.onBackground }}>
                    Nguyen Duc Chi Dat
                </Text>
            </View>
            <View></View>

            <Drawer.Section showDivider={false} style={{ backgroundColor: theme.colors.background }}>
                {drawerList.map((item: IDrawer, index: number) => (
                    <List.Accordion
                        key={index}
                        title={item.MenuGroup}
                        onPress={() => {
                            setExpandedMenu(expandedMenu === index ? -1 : index);
                        }}
                        expanded={index === expandedMenu}
                        left={props => <List.Icon {...props} icon={getNameIcon(item.MenuGroup)} />}>
                        {item.SubMenu.map((submenu: ISubmenu, subIndex: number) => (
                            <Drawer.Item
                                key={subIndex}
                                label={submenu.MenuName}
                                active={submenu.MenuID === activeSubmenu}
                                onPress={() => setActiveSubmenu(submenu.MenuID)}
                                // left={props => <List.Icon {...props} icon={submenu.MenuIcon ? submenu.MenuIcon : ""} />}
                            />
                        ))}
                    </List.Accordion>
                ))}
            </Drawer.Section>
        </View>
    );
};

export default CustomDrawer;
