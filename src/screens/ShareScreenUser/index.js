import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import styles from './style'
import Header from '../../component/Header'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import io from "socket.io-client";
import { bucketURL, socket } from '../../helper/ApiConstant'
import { showAlertMessage, showErrorAlertMessage } from '../../helper/Global'

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

let option = [
    {
        name: 'A'
    },
    {
        name: 'A'
    },
    {
        name: 'A'
    },
    {
        name: 'A'
    },
]

export default class ShareScreenUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionIndex: 0,
            isCorrect: false,
            answerIndex: 0
        }

    }
    answerQustion = (item, qus, i) => {
        const { userData, addAnswer, channelId, questions } = this.props
        let token = userData?.token
        let data = {
            answer: item,
            questionId: qus._id,
            channelId: channelId
        }

        addAnswer(token, data).then((res) => {
            if (res.status === 200) {
                console.log(res.data)
                if (res.data) {
                    questions[0].isCorrect = true
                    this.setState({})
                    this.setState({ answerIndex: i })
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
    buzzerButton = () => {
        const { userData, channelId } = this.props
        socket.emit('buzzer_on', { channelId: channelId, user: userData })
    }
    render() {
        const { questions, onScrollEndDrag, userData, channelId, questionsLength } = this.props
        return (
            <View style={styles.mainView} >
                <Header
                    title={'Meeting Name'}
                    isBack={true}
                />
                <FlatList
                    horizontal
                    data={questions}
                    pagingEnabled
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ width: widthPercentageToDP(100) }} >
                                <View style={styles.boxStyles} >
                                    <Text style={styles.textStyle} >{`Quse ${index + 1} of ${questionsLength}`}</Text>
                                    <Text style={styles.qustionStyle} >{item?.name}</Text>
                                    {
                                        item?.questionType == 0 ?
                                            <Image source={{ uri: bucketURL + item?.image }} style={styles.imageStyle} />
                                            :
                                            <></>
                                    }

                                    {
                                        item?.options.map((item, index) => {
                                            return (
                                                <View style={[styles.optionStyles, { marginTop: index == 0 ? heightPercentageToDP(2.5) : heightPercentageToDP(1.5) }]} >
                                                    {/* <View style={styles.radioCircle} ></View> */}
                                                    <Text style={styles.optionText} >{item}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <View style={styles.mcqBotton} >
                                    {item?.options.map((item1, i) => {
                                        return (
                                            <>
                                                {item?.isCorrect ?
                                                    <>
                                                        {
                                                            item?.correctAnswer == item1 ?
                                                                <TouchableOpacity style={[styles.mcqBotton1, { borderColor: 'green', borderWidth: 1 }]} onPress={() => this.answerQustion(item1, item)} ><Text style={styles.mcqText} >{item1}</Text></TouchableOpacity>
                                                                :
                                                                <>
                                                                    {i == this.state.answerIndex ?
                                                                        <TouchableOpacity style={[styles.mcqBotton1, { borderColor: 'red', borderWidth: 1 }]} onPress={() => this.answerQustion(item1, item)} ><Text style={styles.mcqText} >{item1}</Text></TouchableOpacity>
                                                                        :
                                                                        <TouchableOpacity style={styles.mcqBotton1} onPress={() => this.answerQustion(item1, item)} ><Text style={styles.mcqText} >{item1}</Text></TouchableOpacity>
                                                                    }
                                                                </>
                                                        }
                                                    </>
                                                    :
                                                    <TouchableOpacity style={styles.mcqBotton1} onPress={() => this.answerQustion(item1, item, i)} ><Text style={styles.mcqText} >{item1}</Text></TouchableOpacity>
                                                }
                                            </>
                                            // }
                                        )
                                    })}
                                </View>
                                {
                                    item?.questionType == 2 ?
                                        <TouchableOpacity style={styles.foucsButton} onPress={() => this.buzzerButton()} >
                                            <Text style={styles.foucsText} >Press</Text>
                                        </TouchableOpacity>
                                        :
                                        <></>
                                }
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
}