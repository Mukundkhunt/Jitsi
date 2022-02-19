import { Text, View } from 'react-native';
import React, { Component } from 'react';
import FlashMessage from 'react-native-flash-message';
import rootReducer from './src/reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Route from './src/route/Route';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Route />
        <FlashMessage position={'top'} />
      </Provider>
    );
  }
}
