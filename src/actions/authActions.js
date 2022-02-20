import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAPIRequest } from '../helper/Global';
import { api } from '../helper/ApiConstant';
import { userData, userIdd, userLoggedIn } from '../helper/Constants';
import { Platform } from 'react-native';
import { getUserInfo } from '../helper/CommonFunctions';
import { SET_USER_INFO } from './types';

export const signUpUser = (body) => async (dispatch) => {

    return makeAPIRequest({
        method: 'post',
        url: api.signup,
        data: body,
    }).then(async (response) => {
        console.log('signInUser API response :: ', response.data);
        if (response.data.status === 200) {
            await AsyncStorage.setItem(userLoggedIn, 'true');
            await AsyncStorage.setItem(
                userData,
                JSON.stringify(response?.data?.data),
            );
            dispatch({ type: SET_USER_INFO, payload: response.data.data });
            return Promise.resolve(response.data);
        }
        return Promise.reject();
    })
        .catch((err) => {
            console.log('signInUser API error :: ', err);
            return Promise.resolve(err.response.data);
        });
};

export const signInUser = (body) => async (dispatch) => {
    return makeAPIRequest({
        method: 'post',
        url: api.signin,
        data: body,
    })
        .then(async (response) => {
            console.log('signInUser API response :: ', response.data);
            if (response.data.status === 200) {
                await AsyncStorage.setItem(userLoggedIn, 'true');
                await AsyncStorage.setItem(
                    userData,
                    JSON.stringify(response?.data?.data),
                );
                dispatch({ type: SET_USER_INFO, payload: response.data.data });
                return Promise.resolve(response.data);
            }
            return Promise.reject();
        })
        .catch((err) => {
            return Promise.resolve(err.response.data);
        });
};

export const ForgotPassword = (body) => async (dispatch) => {
    return makeAPIRequest({
        method: 'post',
        url: api.forgotpassword,
        data: body,
    })
        .then(async (response) => {
            console.log('signInUser API response :: ', response.data);
            if (response.data.status === 200) {
                return Promise.resolve(response.data);
            }
            return Promise.reject();
        })
        .catch((err) => {
            return Promise.resolve(err.response.data);
        });
};

export const otpVerification = (body) => async (dispatch) => {
    return makeAPIRequest({
        method: 'post',
        url: api.otp_verification,
        data: body,
    })
        .then(async (response) => {
            console.log('signInUser API response :: ', response.data);
            if (response.data.status === 200) {
                await AsyncStorage.setItem(
                    userIdd,
                    JSON.stringify(response?.data?.data),
                );
                return Promise.resolve(response.data);
            }
            return Promise.reject();
        })
        .catch((err) => {
            return Promise.resolve(err.response.data);
        });
};

export const reset_password = (body) => async (dispatch) => {
    return makeAPIRequest({
        method: 'post',
        url: api.reset_password,
        data: body,
    })
        .then(async (response) => {
            console.log('signInUser API response :: ', response.data);
            if (response.data.status === 200) {
                return Promise.resolve(response.data);
            }
            return Promise.reject();
        })
        .catch((err) => {
            return Promise.resolve(err.response.data);
        });
};

export const setUserInfo = () => async (dispatch) => {
    let userInfo = await getUserInfo();
    dispatch({ type: SET_USER_INFO, payload: userInfo });
    return Promise.resolve(userInfo);
};


export const setProfile = (token, body) => async (dispatch) => {
    let header = {
        Accept: 'application/json',
        authorization: token
    }
    return makeAPIRequest({
        method: 'post',
        url: api.profile,
        data: body,
        headers: header
    })
        .then(async (response) => {
            console.log('signInUser API response :: ', response.data);
            if (response.data.status === 200) {
                return Promise.resolve(response.data);
            }
            return Promise.reject();
        })
        .catch((err) => {
            return Promise.resolve(err.response.data);
        });
};

export const uploadImage = (token, body) => async (dispatch) => {
    let header = {
        Accept: 'application/json',
        authorization: token,
        // 'Content-Type': 'multipart/form-data',
    }
    return makeAPIRequest({
        method: 'post',
        url: api.uploadImage,
        data: body,
        headers: header
    })
        .then(async (response) => {
            console.log('signInUser API response :: ', response.data);
            if (response.data.status === 200) {
                return Promise.resolve(response.data);
            }
            return Promise.reject();
        })
        .catch((err) => {
            return Promise.resolve(err.response.data);
        });
};


export const uploadProfile = (token, body) => async (dispatch) => {
    let header = {
        Accept: 'application/json',
        authorization: token,
        // 'Content-Type': 'multipart/form-data',
    }
    return makeAPIRequest({
        method: 'put',
        url: api.profile,
        data: body,
        headers: header
    })
        .then(async (response) => {
            console.log('signInUser API response :: ', response.data);
            if (response.data.status === 200) {
                return Promise.resolve(response.data);
            }
            return Promise.reject();
        })
        .catch((err) => {
            return Promise.resolve(err.response.data);
        });
};


