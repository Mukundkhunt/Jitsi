import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import styles from './style'
import C_TextInput from '../../component/C_TextInput';
import Button from '../../component/Button';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { showAlertMessage, showErrorAlertMessage, validateEmail } from '../../helper/Global'
import * as actions from '../../actions';
import { connect } from 'react-redux';
import Header from '../../component/Header';
import P_TextInput from '../../component/P_TextInput';
import io from "socket.io-client";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            qustionSet: [],
            qustionSetId: ''
        }
        this.socket = io('https://jitsi.api.pip-idea.tk', {
            transports: ['websocket'],
        }
        )
    }

    componentDidMount = () => {
        const { userData, getQustionSet } = this.props
        let token = userData?.token
        if (userData?.userType == '1') {
            getQustionSet(token).then((res) => {
                if (res.status === 200) {
                    res?.data.map((item) => {
                        item.status = false
                    })
                    this.setState({ qustionSet: res?.data })
                    console.log(res)
                } else {
                    showAlertMessage({
                        title: res.message,
                        type: 'danger',
                    });
                }
            }).catch((error) => {
                console.log('----error', error)
                showErrorAlertMessage();
            })
        }
    }

    validation = () => {
        const { email, password, } = this.state
        const { getToken, userData } = this.props
        let token = userData?.token
        let loginType = userData?.userType
        if (!email && email == '') {
            showAlertMessage({
                title: "Email can't be empty!",
                description: 'Please enter your email.',
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
                name: email,
                password: password,
            }
            getToken(data, token, loginType).then((res) => {
                if (res.status === 200) {
                    // this.socket.emit('join_channel', { channelId: res.data.channelId });
                    if (loginType == 1) {
                        console.log('+++++', loginType)
                        this.props.navigation.navigate('VideoStreaming', { token: res.data.token, channelName: email, qustionSetId: this.state.qustionSetId, channelId: res.data.channelId })
                    } else {
                        this.props.navigation.navigate('VideoStreamingUser', { token: res.data.token, channelName: email, channelId: res.data.channelId })
                    }
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
                <Header
                    title={"Meeting Information"}
                />
                <View style={styles.boxStyle} >
                    <P_TextInput
                        title={'Meeting Name'}
                        placeholder={'Enter Your Meeting Name'}
                        iconName={'mail-outline'}
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                    <View style={{ marginTop: 20 }} >
                        <P_TextInput
                            title={'Password'}
                            placeholder={'Enter Your Password'}
                            iconName={'lock-closed-outline'}
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                    </View>
                    {this.state.qustionSet.map((item, index) => {
                        return (
                            <TouchableOpacity style={styles.listStyle} onPress={() => this.setState({ qustionSetId: item._id })} >
                                <Text>{item?.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <Button
                    buttonTitle={'Start Meeting'}
                    onPress={() => this.validation()}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ auth: { userData } }) => ({
    userData,
});
export default connect(mapStateToProps, actions)(Home);
