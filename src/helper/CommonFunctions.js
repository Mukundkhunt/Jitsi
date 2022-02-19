import AsyncStorage from '@react-native-async-storage/async-storage';

import { userData, userLoggedIn } from './Constants';

export const isUserLoggedIn = async () => {
    let isLogin = await AsyncStorage.getItem(userLoggedIn);
    return JSON.parse(isLogin);
};

export const getUserInfo = async () => {
    let userInfo = await AsyncStorage.getItem(userData);
    return JSON.parse(userInfo);
};


