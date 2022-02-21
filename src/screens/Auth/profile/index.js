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
import { Icons } from '../../../helper/IconConstant';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageData: [],
            gender: false,
            userName: '',
            email: props?.userData?.email ? props?.userData?.email : '',
            phoneNumber: '',
            age: '',
            language: '',
            ethniCity: '',
            geoLocation: '',
            image: ''
        }
    }

    selectImage = async () => {
        try {
            await launchImageLibrary({ mediaType: 'photo', includeExtra: true }, async (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    let data = [{
                        url: response.assets[0].uri,
                        name: response.assets[0].fileName,
                        type: response.assets[0].type
                    }]
                    this.setState({ ImageData: data })
                }

            })
        } catch (error) {
            console.log('--------error', error)
        }
    }

    uploadProfile = async () => {
        const { uploadImage, userData, uploadProfile } = this.props
        const { userName, email, phoneNumber, gender, geoLocation, ethniCity, age, language, image } = this.state
        let token = userData?.token;
        if (!userName && userName == '') {
            showAlertMessage({
                title: "Username can't be empty!",
                description: 'Please enter your username.',
                type: 'warning',
            });
            return;
        }
        if (this.state.ImageData.length > 0) {
            const fromData = new FormData();
            fromData.append("image", {
                name: this.state.ImageData[0].name,
                type: this.state.ImageData[0].type,
                uri: this.state.ImageData[0].url
            });
            uploadImage(token, fromData).then((res) => {
                if (res.status === 200) {
                    this.setState({ image: res?.data?.image })
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

        let data = {
            name: userName,
            gender: gender ? 1 : 0,
        }
        if (phoneNumber) data.phoneNumber = phoneNumber
        if (age) data.age = age
        if (language) data.address = language
        if (geoLocation) data.address = geoLocation
        if (image) data.image = image
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
                            {this.state.ImageData.length > 0 ?
                                <Image source={{ uri: this.state.ImageData[0]?.url }} style={{ height: 100, width: 100 }} />
                                : <Image source={Icons.p} style={styles.imageButton} resizeMode={'contain'} ></Image>
                            }
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
                                value={this.state.email}
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