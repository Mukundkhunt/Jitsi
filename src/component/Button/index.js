import { Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import styles from './style';


export default class Button extends Component {
    render() {
        const { buttonTitle, onPress } = this.props
        return (
            <TouchableOpacity style={styles.ButtonStyle} onPress={onPress} >
                <Text style={styles.ButtonTextStyle} >{buttonTitle}</Text>
            </TouchableOpacity>
        );
    }
}
