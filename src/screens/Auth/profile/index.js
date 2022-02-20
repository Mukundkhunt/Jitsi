import { Text, TextInput, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { Component } from 'react';
import styles from './style'
import P_TextInput from '../../../component/P_TextInput';
import Button from '../../../component/Button';
import { heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import Header from '../../../component/Header'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { showAlertMessage, showErrorAlertMessage, validateEmail } from '../../../helper/Global'
import * as actions from '../../../actions';
import { connect } from 'react-redux';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageData: [],
            gender: false,
            userName: '',
            email: '',
            phoneNumber: '',
            age: '',
            language: '',
            ethniCity: '',
            geoLocation: ''
        }
    }

    selectImage = async () => {
        try {
            await launchImageLibrary({ mediaType: 'photo' }, async (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    // const { uploadImage, userData } = this.props
                    // let token = userData?.token;

                    let data = [{
                        url: response.assets[0].uri,
                        name: 'photo.jpg',
                        type: response.assets[0].type
                    }]
                    this.setState({ ImageData: data })
                    // let formData = new FormData();
                    // formData.append('image', data)

                    // uploadImage(token, formData).then((res) => {
                    //     if (res.status === 200) {
                    //     } else {
                    //         showAlertMessage({
                    //             title: res.message,
                    //             type: 'danger',
                    //         });
                    //     }
                    // }).catch((error) => {
                    //     showErrorAlertMessage();
                    // })
                }

            })
        } catch (error) {
            console.log('--------error', error)
        }
    }

    uploadProfile = async () => {
        const { uploadImage, userData, uploadProfile } = this.props
        const { userName, email, phoneNumber, gender, geoLocation, ethniCity, age, language } = this.state
        let token = userData?.token;
        let formData = new FormData();
        formData.append('image', this.state.ImageData[0])
        uploadImage(token, formData).then((res) => {
            if (res.status === 200) {

            } else {
                showAlertMessage({
                    title: res.message,
                    type: 'danger',
                });
            }
        }).catch((error) => {
            showErrorAlertMessage();
        })

        let data = {
            name: userName,
            gender: gender ? 1 : 0,
        }
        if (phoneNumber) data.phoneNumber = phoneNumber
        if (age) data.age = age
        if (language) data.address = language
        if (geoLocation) data.address = geoLocation

        uploadProfile(token, data).then((res) => {
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

    render() {
        return (
            <View style={styles.mainView} >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <Header
                        title={'Profile'}
                        isBack={true}
                    />
                    <View style={styles.boxStyle} >
                        <TouchableOpacity style={styles.imageButton} onPress={() => this.selectImage()} >
                            <Image source={{ uri: this.state.ImageData[0]?.url }} style={{ height: 100, width: 100 }} />
                        </TouchableOpacity>
                        <P_TextInput
                            title={'Username*'}
                            placeholder={'Enter Your Username'}
                            iconName={'person-outline'}
                            onChangeText={(text) => this.setState({ userName: text })}
                        />
                        <View style={{ marginTop: hp(2) }} >
                            <P_TextInput
                                title={'Email*'}
                                placeholder={'Enter Your Email'}
                                iconName={'mail-outline'}
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                        </View>
                        <View style={{ marginTop: 20 }} >
                            <P_TextInput
                                title={'Mobile Number'}
                                placeholder={'Enter Your Mobile Number'}
                                iconName={'call-outline'}
                                onChangeText={(text) => this.setState({ phoneNumber: text })}
                            />
                        </View>

                        <View style={{ marginTop: 20 }} >
                            <P_TextInput
                                title={'Age'}
                                placeholder={'Enter Your age'}
                                iconName={'lock-closed-outline'}
                                onChangeText={(text) => this.setState({ age: text })}
                            />
                        </View>
                        <View style={{ marginTop: 20 }} >
                            <P_TextInput
                                title={'Language'}
                                placeholder={'Enter Your Language'}
                                iconName={'language-outline'}
                                onChangeText={(text) => this.setState({ language: text })}
                            />
                        </View>
                        <View style={{ marginTop: 20, alignSelf: 'flex-start', marginLeft: widthPercentageToDP(7) }} >
                            <Text style={styles.titleStyle} >{"Gender"}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.radioOutside} onPress={() => this.setState({ gender: true })} >
                                    {this.state.gender ? <View style={styles.radioInside}></View> : <></>}
                                </TouchableOpacity>
                                <Text style={styles.radioText} >Male</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.radioOutside} onPress={() => this.setState({ gender: false })} >
                                    {this.state.gender ? <></> : <View style={styles.radioInside}></View>}
                                </TouchableOpacity>
                                <Text style={styles.radioText} >Female</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }} >
                            <P_TextInput
                                title={'Ethnicity'}
                                placeholder={'Enter Your Ethnicity'}
                                iconName={'checkbox-outline'}
                                onChangeText={(text) => this.setState({ ethniCity: text })}
                            />
                        </View>
                        <View style={{ marginTop: 20 }} >
                            <P_TextInput
                                title={'Geolocation'}
                                placeholder={'Enter Your location'}
                                iconName={'location-outline'}
                                onChangeText={(text) => this.setState({ geoLocation: text })}
                            />
                        </View>
                        <Button
                            buttonTitle={'Save'}
                            onPress={() => this.uploadProfile()}
                        />
                    </View>
                    {/* <TouchableOpacity>
                        <Text style={styles.signupText} >Already have an account? <Text style={{ color: '#7836FF', fontFamily: Fonts.bold, textDecorationLine: 'underline', fontSize: 14 }} > Signin</Text></Text>
                    </TouchableOpacity> */}
                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = ({ auth: { userData } }) => ({ userData });

export default connect(mapStateToProps, actions)(Profile);