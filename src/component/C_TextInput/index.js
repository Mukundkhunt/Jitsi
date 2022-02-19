import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import styles from './style';
import { Colors } from '../../helper/colors/Colors';
import Icon from 'react-native-vector-icons/Ionicons'

export default class C_TextInput extends Component {
    render() {
        const { title, onChangeText, placeholder, value, iconName, isEye, secureTextEntry, onPress } = this.props
        return (
            <View>
                <Text style={styles.titleStyle} >{title}</Text>
                <View style={styles.rowText} >
                    <Icon name={iconName} size={20} style={styles.iconStyle} />
                    <TextInput
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        value={value}
                        style={styles.textInput}
                        placeholderTextColor={Colors.textColor2}
                        secureTextEntry={secureTextEntry}
                    />
                    {isEye ?
                        <TouchableOpacity onPress={onPress} style={{ alignSelf: 'center' }} >
                            <Icon name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'} size={20} style={styles.iconStyle} />
                        </TouchableOpacity>
                        : <></>}
                </View>
            </View>
        );
    }
}
