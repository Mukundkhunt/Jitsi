import { combineReducers } from 'redux';
import { RESET_STORE } from '../actions/types';
import { appDefaultReducer } from './defaultReducer';
import authReducer from './authReducer';


const appReducer = combineReducers({
    auth: authReducer,
});

export default function rootReducer(state, action) {
    let finalState = appReducer(state, action);
    if (action.type === RESET_STORE) {
        finalState = appDefaultReducer;
    }
    return finalState;
}
