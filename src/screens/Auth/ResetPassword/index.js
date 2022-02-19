import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import styles from './style'
import C_TextInput from '../../../component/C_TextInput';
import Button from '../../../component/Button';
import { showAlertMessage, showErrorAlertMessage } from '../../../helper/Global'
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userIdd } from '../../../helper/Constants';


class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            cPassword: ''
        }
    }

    validation = async () => {
        const { password, cPassword } = this.state
        const { reset_password } = this.props
        if (!password && password == '') {
            showAlertMessage({
                title: "password can't be empty!",
                description: 'Please enter your password.',
                type: 'warning',
            });
        } else if (!cPassword && cPassword == '') {
            showAlertMessage({
                title: "Confirm can't be empty!",
                description: 'Please enter Confirm password.',
                type: 'warning',
            });
        } else if (cPassword != password) {
            showAlertMessage({
                title: "Password must be same",
                description: 'Confirm password and password must be same',
                type: 'warning',
            });
        } else {
            let userIID = await AsyncStorage.getItem(userIdd)
            let userID = JSON.parse(userIID)
            let data = {
                password: password,
                authtoken: userID.authtoken,
                id: userID.id
            }
            reset_password(data).then((res) => {
                if (res.status === 200) {
                    this.props.navigation.navigate('Login')
                } else {
                    showAlertMessage({
                        title: res.message,
                        type: 'danger',
                    });
                }
            }).catch((error) => {
                showErrorAlertMessage();
            })
        }
    }

    render() {
        return (
            <View style={styles.mainView} >
                <View style={styles.logo}>
                </View>
                <Text style={styles.signInText} >RESET PASSWORD</Text>
                <Text style={styles.TextStyle}>We will send 4 digits code to your email{'\n'}for the verification</Text>
                <View style={styles.boxStyle} >
                    <C_TextInput
                        title={'Password'}
                        placeholder={'Enter Your Password'}
                        iconName={'lock-closed-outline'}
                        onChangeText={(text) => this.setState({ password: text })}

                    />
                    <View style={{ marginTop: 20 }} >
                        <C_TextInput
                            title={'Confirm Password'}
                            placeholder={'Enter Your Password'}
                            iconName={'lock-closed-outline'}
                            onChangeText={(text) => this.setState({ cPassword: text })}
                        />
                    </View>
                    <Button
                        buttonTitle={'Continue'}
                        onPress={() => this.validation()}
                    />
                </View>
            </View>
        );
    }
}
const mapStateToProps = ({ auth: { userData } }) => ({
    userData,
});
export default connect(mapStateToProps, actions)(ResetPassword);