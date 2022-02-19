import React, { Component, useEffect } from 'react'
import { Text, View, StyleSheet, ImageBackground, StatusBar, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showAlertMessage, showErrorAlertMessage, validateEmail } from '../../helper/Global'
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { isUserLoggedIn } from '../../helper/CommonFunctions'


class Splash extends Component {
    async componentDidMount() {

        const { userData, token_validator } = this.props
        let token = userData.token ? userData.token : '';
        let isLogin = await isUserLoggedIn();
        if (isLogin) {
            this.props.setUserInfo().then((res) => {
                console.log(res)
                this.props.navigation.navigate('Home')
            })
        } else {
            this.props.navigation.navigate('Signup')
        }
    }
    render() {


        return (
            <View style={styles.main} >

                {/* <ImageBackground  source={image.Splash} style={styles.background}> */}
                {/* <StatusBar backgroundColor='transparent' translucent={true} barStyle={'light-content'} /> */}
                <Text style={{ alignSelf: 'center' }} >
                    Jitsi
                </Text>
                {/* <Image source={icon.Logo} style={styles.LogoStyle} resizeMode={'contain'} /> */}
                {/* </ImageBackground> */}


            </View>
        )
    }
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    background: {
        flex: 1,
        justifyContent: 'center'
    },
    LogoStyle: {
        height: hp(10),
        width: wp(35.01),
        alignSelf: 'center',
    }
})
const mapStateToProps = ({ auth: { userData } }) => ({ userData });

export default connect(mapStateToProps, actions)(Splash);
