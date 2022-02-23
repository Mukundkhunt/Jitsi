import { Dimensions, FlatList, Image, Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import styles from './style'
import Header from '../../component/Header'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import io from "socket.io-client";
import { bucketURL, socket } from '../../helper/ApiConstant'

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

export default class ShareScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionIndex: 0
        }

    }
    render() {
        const { questions, onScrollEndDrag, userData, channelId } = this.props
        return (
            <View style={styles.mainView} >
                <Header
                    title={'Meeting Name'}
                    isBack={true}
                />
                <FlatList
                    horizontal
                    data={questions[0]?.question}
                    pagingEnabled
                    onMomentumScrollEnd={(e) => {
                        let pagenumber = Math.min(
                            Math.max(Math.floor(e.nativeEvent.contentOffset.x / width + 0.5) + 1, 0),
                            questions[0]?.question.length
                        );
                        // if (pagenumber - 1 < this.state.questionIndex) {
                        socket.emit('admin_share', { question: [questions[0].question[pagenumber - 1]], channelId: channelId, questionsLength: questions[0]?.question.length })
                        // } else {
                        //     this.socket.emit('next_question', { question: questions[0].question[pagenumber - 1], channelId: channelId })
                        //     // this.socket.emit('next_question', { question: this.state.qustions[0].question[pagenumber - 1], channelId: channelId })
                        // }
                        // this.setState({ questionIndex: pagenumber - 1 })
                    }}
                    disableIntervalMomentum
                    getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
                    keyExtractor={(item, index) => index.toString()}
                    snapToOffsets={questions[0]?.question.map((st, index) => index * width)}
                    ref={ref => (this.flatlist = ref)}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ width: widthPercentageToDP(100) }} >
                                {console.log(item)}
                                <View style={styles.boxStyles} >
                                    <Text style={styles.textStyle} >{`Quse ${index + 1} of ${questions[0]?.question.length}`}</Text>
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
                                                    <View style={styles.radioCircle} ></View>
                                                    <Text style={styles.optionText} >{item}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <TouchableOpacity style={{ height: 50, width: 50, backgroundColor: 'red', position: 'absolute', right: 0, zIndex: 100, }} onPress={() => this.flatlist.scrollToIndex({ index: 1 })} ></TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
}