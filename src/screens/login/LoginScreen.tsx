import { View, Text, StatusBar, Image, FlatList, StyleSheet, Animated } from 'react-native';
import React, { useRef, useState } from 'react';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { useTheme } from 'react-native-paper';
import { useGlobalStyles } from '../../themes/styles';
import { signIn } from '../../redux/global.slice';
import slides from './slides';
import { Dimensions } from 'react-native';
import images from '../../assets/images/image';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('screen');
const LoginScreen = ({ navigation }: any) => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const darkMode = useSelector((state: RootState) => state.global.darkMode);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" barStyle={darkMode ? 'light-content' : 'dark-content'} />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 4 }}>
                    <Swiper
                        style={styles.wrapper}
                        dot={<CustomDot />}
                        activeDot={<CustomDot isActive />}
                        autoplay
                        autoplayDirection
                        autoplayTimeout={2.5}>
                        {slides.map((item, index) => (
                            <View style={styles.slide} key={index}>
                                <Image
                                    source={item.image ? item.image : require('../../assets/images/onboarding1.png')}
                                    style={[styles.image, { width: width, resizeMode: 'contain' }]}
                                />
                                <View style={{ flex: 0.3 }}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.description}>{item.description}</Text>
                                </View>
                            </View>
                        ))}
                    </Swiper>
                </View>
                <View style={styles.footer}>
                    <Button labelStyle={styles.btn_label} buttonColor={theme.colors.primaryContainer} uppercase onPress={() => navigation.navigate("LoginAzure")}>
                        Login with email japfa
                    </Button>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;

const CustomDot = ({ isActive }: any) => {
    return <View style={[styles.dot, { backgroundColor: isActive ? '#007aff' : 'rgba(0,0,0,.2)', width: isActive ? 16 : 8 }]} />;
};

const styles = StyleSheet.create({
    wrapper: {},
    dot: {
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        flex: 0.7,
        justifyContent: 'center',
    },
    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: '#493d8a',
        textAlign: 'center',
    },
    description: {
        fontWeight: '300',
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 64,
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
    },
    btn: {
        backgroundColor: '#F4F6F7',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    btn_label: {
        fontSize: 16,
    },
});
