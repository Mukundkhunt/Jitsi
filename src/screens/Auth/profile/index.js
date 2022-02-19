import { Text, TextInput, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { Component } from 'react';
import styles from './style'
import P_TextInput from '../../../component/P_TextInput';
import Button from '../../../component/Button';
import { heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import Header from '../../../component/Header'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageData: [],
            gender: false,
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
                    console.log('-----------resposen', response)
                    let uri = response.assets[0].uri
                    this.state.ImageData.push({ title: response.assets[0].fileName, url: uri, type: 'jpeg' })
                    this.setState({})
                }

            })
        } catch (error) {
            console.log('--------error', error)
        }
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
                        />
                        <View style={{ marginTop: hp(2) }} >
                            <P_TextInput
                                title={'Email*'}
                                placeholder={'Enter Your Email'}
                                iconName={'mail-outline'}
                            />
                        </View>
                        <View style={{ marginTop: 20 }} >
                            <P_TextInput
                                title={'Mobile Number'}
                                placeholder={'Enter Your Mobile Number'}
                                iconName={'call-outline'}

                            />
                        </View>

                        <View style={{ marginTop: 20 }} >
                            <P_TextInput
                                title={'Age'}
                                placeholder={'Enter Your age'}
                                iconName={'lock-closed-outline'}

                            />
                        </View>
                        <View style={{ marginTop: 20 }} >
                            <P_TextInput
                                title={'Language'}
                                placeholder={'Enter Your Language'}
                                iconName={'language-outline'}

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

                            />
                        </View>
                        <View style={{ marginTop: 20 }} >
                            <P_TextInput
                                title={'Geolocation'}
                                placeholder={'Enter Your location'}
                                iconName={'location-outline'}

                            />
                        </View>
                        <Button
                            buttonTitle={'Save'}
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
