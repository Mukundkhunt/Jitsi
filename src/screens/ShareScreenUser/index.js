import { Dimensions, FlatList, Image, Text, View } from 'react-native'
import React, { Component } from 'react'
import styles from './style'
import Header from '../../component/Header'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import io from "socket.io-client";

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
            questionIndex: 0
        }

    }
    render() {
        const { questions, onScrollEndDrag, userData, channelId } = this.props
        console.log(questions)
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
                    // onMomentumScrollEnd={(e) => {
                    //     let pagenumber = Math.min(
                    //         Math.max(Math.floor(e.nativeEvent.contentOffset.x / width + 0.5) + 1, 0),
                    //         questions[0]?.question.length
                    //     );
                    //     console.log(channelId)
                    //     if (pagenumber - 1 < this.state.questionIndex) {
                    //         this.socket.emit('previous_question', { question: questions[0].question[pagenumber - 1], channelId: channelId })
                    //     } else {
                    //         this.socket.emit('next_question', { question: questions[0].question[pagenumber - 1], channelId: channelId })
                    //         // this.socket.emit('next_question', { question: this.state.qustions[0].question[pagenumber - 1], channelId: channelId })
                    //     }
                    //     this.setState({ questionIndex: pagenumber - 1 })
                    // }}
                    // disableIntervalMomentum
                    // getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
                    keyExtractor={(item, index) => index.toString()}
                    // snapToOffsets={questions[0]?.question.map((st, index) => index * width)}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ width: widthPercentageToDP(100) }} >
                                {console.log(item)}
                                <View style={styles.boxStyles} >
                                    <Text style={styles.textStyle} >{`Quse ${index + 1} of ${'10'}`}</Text>
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
                            </View>
                            // <View style={{ width: widthPercentageToDP(100) }} >
                            //     <View style={styles.boxStyles} >
                            //         <Text style={styles.textStyle} >{`Quse ${index + 1} of ${'10'}`}</Text>
                            //         <Text style={styles.qustionStyle} >{item?.name}</Text>
                            //         {
                            //             item.options.map((item, index) => {
                            //                 return (
                            //                     <View style={styles.optionStyles} >
                            //                         <Text style={styles.optionText} >{item}</Text>
                            //                     </View>
                            //                 )
                            //             })
                            //         }
                            //     </View>
                            // </View>
                        )
                    }}
                />
            </View>
        )
    }
}