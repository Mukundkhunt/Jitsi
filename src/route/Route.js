import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/signup';
import ForgotPassword from '../screens/Auth/ForgotPassword'
import ResetPassword from '../screens/Auth/ResetPassword';
import Verification from '../screens/Auth/Verification';
import Profile from '../screens/Auth/profile'
import VideoStreaming from '../screens/VideoStreaming';
import Home from '../screens/Home';
import ShareScreen from '../screens/ShareScreen';
import Splash from '../screens/Splash';

const Stack = createNativeStackNavigator();


export default class Route extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '123456'
        }


    }

    componentDidMount = () => {

    }

    render() {
        return (
            <NavigationContainer >
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={'Splash'} component={Splash} />
                    <Stack.Screen name={'Signup'} component={Signup} />
                    <Stack.Screen name={'Login'} component={Login} />
                    <Stack.Screen name={'Profile'} component={Profile} />
                    <Stack.Screen name={'Verification'} component={Verification} />
                    <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
                    <Stack.Screen name={'ResetPassword'} component={ResetPassword} />
                    <Stack.Screen name={'Home'} component={Home} />
                    <Stack.Screen name={'VideoStreaming'} component={VideoStreaming} />
                    <Stack.Screen name={'ShareScreen'} component={ShareScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
