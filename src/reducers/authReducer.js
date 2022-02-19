import { SET_USER_INFO } from '../actions/types';

const INITIAL_STATE = {
    userData: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return { ...state, userData: action.payload };
        default:
            return state;
    }
};
