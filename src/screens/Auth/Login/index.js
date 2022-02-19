import { Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { Component } from 'react';
import styles from './style'
import C_TextInput from '../../../component/C_TextInput';
import Button from '../../../component/Button';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { showAlertMessage, showErrorAlertMessage, validateEmail } from '../../../helper/Global'
import * as actions from '../../../actions';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            secure: false
        }
    }

    validation = () => {
        const { email, password, } = this.state
        const { signInUser } = this.props
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
        else if (!password && password == '') {
            showAlertMessage({
                title: "password can't be empty!",
                description: 'Please enter your password.',
                type: 'warning',
            });
        } else {
            let data = {
                email: email,
                password: password
            }
            signInUser(data).then((res) => {
                if (res.status === 200) {
                    this.props.navigation.navigate('Home')
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
                    <Text style={styles.signInText} >Sign In</Text>
                    <Text style={styles.TextStyle}>Sign in to Continue</Text>
                    <View style={styles.boxStyle} >
                        <C_TextInput
                            title={'Email'}
                            placeholder={'Enter Your Email'}
                            iconName={'mail-outline'}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
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
                        <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 30, marginTop: heightPercentageToDP(2) }} onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                            <Text style={styles.forgotText} >Forgot Password?</Text>
                        </TouchableOpacity>
                        <Button
                            buttonTitle={'SignIn'}
                            onPress={() => this.validation()}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = ({ auth: { userData } }) => ({
    userData,
});
export default connect(mapStateToProps, actions)(Login);
