import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import styles from './style'
import Button from '../../../component/Button';
import OtpInputs from 'react-native-otp-inputs';
import { Colors } from '../../../helper/colors/Colors';
import { showAlertMessage, showErrorAlertMessage } from '../../../helper/Global'
import * as actions from '../../../actions';
import { connect } from 'react-redux';

class Verification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: '',
        }
    }

    validation = () => {
        const { otp } = this.state
        const { otpVerification } = this.props
        if (!otp && otp == '') {
            showAlertMessage({
                title: "OTP can't be empty!",
                description: 'Please enter your OTP.',
                type: 'warning',
            });
        }
        else {
            let data = {
                otp: otp,
                deviceToken: '123'
            }
            otpVerification(data).then((res) => {
                if (res.status === 200) {
                    this.props.navigation.navigate('ResetPassword')
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
                <Text style={styles.signInText} >VERIFICATION CODE</Text>
                <Text style={styles.TextStyle}>Enter the 4 digits code that you received{'\n'}on your e-mail.</Text>
                <View style={styles.boxStyle} >
                    <Text style={styles.codeStyle} >Enter Code</Text>
                    <OtpInputs style={styles.otpStyle}
                        placeholderTextColor={Colors.AppColor}
                        inputContainerStyles={styles.containerStyle}
                        inputStyles={styles.inputStyle}
                        handleChange={(code) => this.setState({ otp: code })}
                        numberOfInputs={6}
                    />
                    {/* <View style={{ alignSelf: 'center', }} > */}
                    <Button
                        buttonTitle={'Contiune'}
                        onPress={() => this.validation()}
                    />
                    {/* </View> */}
                </View>
            </View>
        );
    }
}
const mapStateToProps = ({ auth: { userData } }) => ({
    userData,
});
export default connect(mapStateToProps, actions)(Verification);