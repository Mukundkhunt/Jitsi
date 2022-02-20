import { Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { Component } from 'react';
import styles from './style'
import C_TextInput from '../../../component/C_TextInput';
import Button from '../../../component/Button';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from '../../../helper/fonts/Fonts';
import { showAlertMessage, showErrorAlertMessage, validateEmail } from '../../../helper/Global'
import * as actions from '../../../actions';
import { connect } from 'react-redux';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            cPassword: '',
            secure: true,
            secure1: true,
        }
    }

    validation = () => {
        const { email, name, password, cPassword } = this.state
        const { signUpUser } = this.props
        console.log(!email)
        if (!name && name == '') {
            showAlertMessage({
                title: "Name can't be empty!",
                description: 'Please enter your name.',
                type: 'warning',
            });
        } else if (!email && email == '') {
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
        else if (!password && password == '') {
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
            let data = {
                email: email,
                name: name,
                password: password,
                userType: 0
            }
            signUpUser(data).then((res) => {
                if (res.status === 200) {
                    this.props.navigation.navigate('Profile')
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.logo}>
                    </View>
                    <Text style={styles.signInText} >Sign Up</Text>
                    <Text style={styles.TextStyle}>Sign up to Continue</Text>
                    <View style={styles.boxStyle} >
                        <C_TextInput
                            title={'Name'}
                            placeholder={'Enter Your Name'}
                            iconName={'person-outline'}
                            onChangeText={(text) => this.setState({ name: text })}
                        />
                        <View style={{ marginTop: hp(2) }} >
                            <C_TextInput
                                title={'Email'}
                                placeholder={'Enter Your Email'}
                                iconName={'mail-outline'}
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                        </View>
                        <View style={{ marginTop: 20 }} >
                            <C_TextInput
                                title={'Password'}
                                placeholder={'Enter Your Password'}
                                iconName={'lock-closed-outline'}
                                onChangeText={(text) => this.setState({ password: text })}
                                isEye={true}
                                secureTextEntry={this.state.secure}
                                onPress={() => this.setState({ secure: !this.state.secure })}
                            />
                        </View>
                        <View style={{ marginTop: 20 }} >
                            <C_TextInput
                                title={'Confirm Password'}
                                placeholder={'Enter Your Confirm Password'}
                                iconName={'lock-closed-outline'}
                                onChangeText={(text) => this.setState({ cPassword: text })}
                                isEye={true}
                                secureTextEntry={this.state.secure1}
                                onPress={() => this.setState({ secure1: !this.state.secure1 })}
                            />
                        </View>

                        <Button
                            buttonTitle={'SignUp'}
                            onPress={() => this.validation()}
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <Text style={styles.signupText} >Already have an account? <Text style={{ color: '#7836FF', fontFamily: Fonts.bold, textDecorationLine: 'underline', fontSize: 14 }} > Signin</Text></Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = ({ auth: { userData } }) => ({
    userData,
});
export default connect(mapStateToProps, actions)(Signup);
