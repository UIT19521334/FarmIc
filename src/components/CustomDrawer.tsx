import { View, StatusBar, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IDrawer, IFactory, ISubDivision, ISubmenu } from '../types';
import { Avatar, Button, Drawer, Icon, List, Searchbar, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import images from '../assets/images/image';
import { getNameIcon } from '../utils/drawer.utils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { updateFactory, updateSubDivisionList } from '../redux/drawer.slice';
import { find } from 'lodash';
import { Dropdown } from 'react-native-element-dropdown';
const CustomDrawer = (props: DrawerContentComponentProps) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const menuList = useSelector((state: RootState) => state.drawer.menuList);
    const subDivisionList = useSelector((state: RootState) => state.drawer.subDivisionList);
    const darkMode = useSelector((state: RootState) => state.global.darkMode);

    const [activeSubmenu, setActiveSubmenu] = useState('');
    const [expandedMenu, setExpandedMenu] = useState(-1);

    const [subDivision, setSubDivision] = useState(subDivisionList[0]);
    const [factory, setFactory] = useState<IFactory>();
    const [factories, setFactories] = useState<IFactory[]>([]);

    useEffect(() => {
        const result : any = subDivisionList[0]?.Factories;
        setFactories(result);
        setFactory(result[0]);
        dispatch(updateFactory(result[0]));
    }, []);

    const handleSelectSubDivision = (value: any) => {
        setSubDivision(value);
        const result = value?.Factories;
        setFactories(result);
        setFactory(result[0]);
        dispatch(updateFactory(result[0]));
    };

    const [isFocus, setIsFocus] = useState(false);
    const [isFocus2, setIsFocus2] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
                <Text variant="titleSmall" style={{ color: theme.colors.primary }}>
                    dat.nguyenducchi@japfa.com
                </Text>
                <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
                    Nguyen Duc Chi Dat
                </Text>
            </View>
            {/* <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    backgroundColor: theme.colors.surfaceVariant,
                    borderBottomColor: theme.colors.outline,
                    borderBottomWidth: 1
                }}>
                <FontAwesome name="database" style={{ height: 40, width: 40 }} size={24} color={'#000'} />
                
            </View> */}
            <Dropdown
                activeColor={theme.colors.primaryContainer}
                itemTextStyle={{ color: theme.colors.primary }}
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{ fontSize: 16, color: theme.colors.primary }}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={subDivisionList}
                search
                maxHeight={300}
                labelField="SubDivisionShortName"
                valueField="SubDivisionID"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={subDivision}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    handleSelectSubDivision(item);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <FontAwesome5 style={{ color: theme.colors.primary, marginRight: 10 }} color={isFocus ? 'blue' : 'black'} name="home" size={24} />
                )}
            />

            <Dropdown
                activeColor={theme.colors.primaryContainer}
                itemTextStyle={{ color: theme.colors.primary }}
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{ fontSize: 14, color: theme.colors.primary }}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={factories}
                search
                maxHeight={300}
                labelField="BusinessUnitShortName"
                valueField="BusinessUnitID"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={factory}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setFactory(item);
                    dispatch(updateFactory(item));
                    setIsFocus2(false);
                }}
                renderLeftIcon={() => (
                    <FontAwesome5
                        style={{ color: theme.colors.primary, marginLeft: 4, marginRight: 10 }}
                        color={isFocus ? 'blue' : 'black'}
                        name="database"
                        size={24}
                    />
                )}
            />
            <ScrollView>
                <Drawer.Section showDivider={false} style={{ backgroundColor: theme.colors.background }}>
                    {menuList.map((item: IDrawer, index: number) => (
                        <List.Accordion
                            key={index}
                            title={item.MenuGroup}
                            style={{ paddingHorizontal: 8 }}
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
            </ScrollView>
        </View>
    );
};

export default CustomDrawer;
const styles = StyleSheet.create({
    container: {
        padding: 0,
    },
    dropdown: {
        height: 50,
        color: '#000',
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 10,
        color: '#000',
    },
    label: {
        position: 'absolute',
        backgroundColor: '#000',
        color: '#000',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#000',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: '#000',
    },
});
