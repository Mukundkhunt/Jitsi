import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import styles from './style'
import C_TextInput from '../../../component/C_TextInput';
import Button from '../../../component/Button';
import { showAlertMessage, showErrorAlertMessage, validateEmail } from '../../../helper/Global'
import * as actions from '../../../actions';
import { connect } from 'react-redux';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        }
    }

    validation = () => {
        const { email } = this.state
        const { ForgotPassword } = this.props
        if (!email && email == '') {
            showAlertMessage({
                title: "Email can't be empty!",
                description: 'Please enter your email.',
                type: 'warning',
            });
        } else if (!validateEmail(email)) {
            showAlertMessage({
                title: "Invaild Email",
                description: 'Please enter correct email.',
                type: 'warning',
            });
        }
        else {
            let data = {
                email: email,
            }
            ForgotPassword(data).then((res) => {
                if (res.status === 200) {
                    this.props.navigation.navigate('Verification')
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
                <Text style={styles.signInText} >FORGOT PASSWORD</Text>
                <Text style={styles.TextStyle}>Enter your email id we will send you a{'\n'} verification code to reset password.</Text>
                <View style={styles.boxStyle} >
                    <C_TextInput
                        title={'Email'}
                        placeholder={'Enter Your Email'}
                        iconName={'mail-outline'}
                        onChangeText={(text) => this.setState({ email: text })}
                    />

                    <Button
                        buttonTitle={'Contiune'}
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
export default connect(mapStateToProps, actions)(ForgotPassword);