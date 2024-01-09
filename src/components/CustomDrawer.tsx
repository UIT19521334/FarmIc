import React, { useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, ScrollView } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IDrawer, IFactory, ISubmenu } from '../types';
import { Avatar, Drawer, List,Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import images from '../assets/images/image';
import { getNameIcon } from '../utils/drawer.utils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { updateFactory } from '../redux/drawer.slice';
import { Dropdown } from 'react-native-element-dropdown';

const CustomDrawer = (props: DrawerContentComponentProps) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    // Redux state
    const menuList = useSelector((state: RootState) => state.drawer.menuList);
    const subDivisionList = useSelector((state: RootState) => state.drawer.subDivisionList);
    const darkMode = useSelector((state: RootState) => state.global.darkMode);

    // State for controlling menu item dropdowns
    const [activeSubmenu, setActiveSubmenu] = useState('');
    const [expandedMenu, setExpandedMenu] = useState(-1);
    const [subDivision, setSubDivision] = useState(subDivisionList[0]);
    const [factory, setFactory] = useState<IFactory>();
    const [factories, setFactories] = useState<IFactory[]>([]);

    useEffect(() => {
        // Initialize factories based on the first sub-division
        const result: any = subDivisionList[0]?.Factories;
        setFactories(result);
        setFactory(result[0]);
        dispatch(updateFactory(result[0]));
    }, []);

    // Handle selecting a sub-division from the dropdown
    const handleSelectSubDivision = (value: any) => {
        setSubDivision(value);
        const result = value?.Factories;
        setFactories(result);
        setFactory(result[0]);
        dispatch(updateFactory(result[0]));
    };

    // State for controlling focus on dropdowns
    const [isFocus, setIsFocus] = useState(false);
    const [isFocus2, setIsFocus2] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" barStyle={darkMode ? 'light-content' : 'dark-content'} />

            {/* Header section */}
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

            {/* Sub-division dropdown */}
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

            {/* Factory dropdown */}
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

            {/* Menu list section */}
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

// Styles
const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        color: '#000',
        paddingHorizontal: 8,
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
