/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Text, View } from 'react-native';
import RouterRoot from 'react-native-auto-route';
import { Provider } from 'react-redux';
import store from './src/redux/store';
const App = () => {
    return (
        <Provider store={store}>
            <RouterRoot />
        </Provider>
    );
};

export default App;
