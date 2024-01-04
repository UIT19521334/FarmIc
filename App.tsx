/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Setup from './src/Setup';
const App = () => {
    return (
        <Provider store={store}>
            <Setup />
        </Provider>
    );
};

export default App;
