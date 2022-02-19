import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

import { baseURL } from './ApiConstant';

const showAlertMessage = ({ title, description, type }) => {
    showMessage({
        message: title,
        description: description,
        type: type || 'info',
    });
};

const showErrorAlertMessage = () => {
    showMessage({
        message: 'Something went wrong!',
        description: 'Please try again.',
        type: 'danger',
    });
};

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const validatePhoneNumber = (phone_num) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone_num);
};

const makeAPIRequest = ({ method, url, data, headers, params }) =>
    new Promise(async (resolve, reject) => {
        const options = {
            method: method,
            baseURL: baseURL,
            url: url,
            data: data,
            headers: headers,
            params: params,
        };
        await axios(options)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })
            .catch(async (error) => {
                reject(error);
            });
    });

export {
    makeAPIRequest,
    validateEmail,
    validatePhoneNumber,
    showAlertMessage,
    showErrorAlertMessage,
};
