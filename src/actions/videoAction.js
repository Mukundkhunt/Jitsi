import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAPIRequest } from '../helper/Global';
import { api } from '../helper/ApiConstant';
import { userData, userIdd, userLoggedIn } from '../helper/Constants';
import { Platform } from 'react-native';
import { getUserInfo } from '../helper/CommonFunctions';

let user = getUserInfo();

export const getToken = (body, token, loginType) => async (dispatch) => {
    console.log('----token', token, loginType)
    let header = {
        Accept: 'application/json',
        authorization: token
    }
    return makeAPIRequest({
        method: 'post',
        url: loginType == '1' ? api.admin : api.generate_token,
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
            console.log('signInUser API error :: ', err);
            return Promise.resolve(err.response.data);
        });
};

export const getQustionSet = (token) => async (dispatch) => {
    let header = {
        Accept: 'application/json',
        authorization: token
    }
    return makeAPIRequest({
        method: 'get',
        url: api.question_set,
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
            console.log('signInUser API error :: ', err);
            return Promise.resolve(err.response.data);
        });
};

export const getQustionSetById = (token, id) => async (dispatch) => {
    let header = {
        Accept: 'application/json',
        authorization: token
    }
    console.log(token, id)
    return makeAPIRequest({
        method: 'get',
        url: `${api.question_set}/${id}`,
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
            console.log('signInUser API error :: ', err);
            return Promise.resolve(err.response.data);
        });
};