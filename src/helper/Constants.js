import { Dimensions, Platform } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const isIOS = Platform.OS === 'ios';


//Asyncstorage constants
const userLoggedIn = 'userLoggedIn';
const userData = 'userData';
const fcmtoken = 'fcmtoken';
const key = 'C|ReSUad@#!%SdD_fE(d/A?:AsdSEF&O';
const folderSetting = 'folderSetting';
const userIdd = "userIdd"
const Number = "Number"
export {
    deviceWidth,
    deviceHeight,
    isIOS,
    userLoggedIn,
    userData,
    fcmtoken,
    key,
    folderSetting,
    userIdd,
    Number
};
