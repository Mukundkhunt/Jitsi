import React, { Component } from 'react';
import {
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    FlatList
} from 'react-native';
import RtcEngine, {
    RtcLocalView,
    RtcRemoteView,
    VideoRenderMode,
    ClientRole,
    ChannelProfile,
    VideoRemoteState,
} from 'react-native-agora';
import Icon from 'react-native-vector-icons/Ionicons'
import IconF from 'react-native-vector-icons/Feather'
import requestCameraAndAudioPermission from '../../component/Permission';
import styles from './style';
import { showAlertMessage, showErrorAlertMessage, validateEmail } from '../../helper/Global'
import * as actions from '../../actions';
import { connect } from 'react-redux';
import io from "socket.io-client";
import ShareScreen from '../ShareScreen';
import { socket } from '../../helper/ApiConstant';
import Header from '../../component/Header';

let data = [
    {
        name: '231',
    },
    {
        name: '231',
    },
    {
        name: '231',
    },
    {
        name: '231',
    },
    {
        name: '231',
    },
    {
        name: '231',
    },
    {
        name: '231',
    }, {
        name: '231',
    },
]
const appId = '9f2a15f3856d48a983e9930fbc5d3c86';
let channelName, token;
/**
 * @property isHost Boolean value to select between broadcaster and audience
 * @property joinSucceed State variable for storing success
 * @property peerIds Array for storing connected peers
 */
// interface State {
//   isHost: boolean;
//   joinSucceed: boolean;
//   peerIds: number[];
// }

class VideoStreaming extends Component {
    _engine;
    constructor(props) {
        channelName = props.route.params?.channelName;
        token = props.route.params?.token
        super(props);
        this.state = {
            isHost: true,
            joinSucceed: false,
            peerIds: [],
            isvideo: true,
            qustionSetId: props.route.params?.qustionSetId,
            qustions: [],
            channelId: props.route.params?.channelId,
            isAudio: true,
            isShare: false
        };
        if (Platform.OS === 'android') {
            // Request required permissions from Android
            requestCameraAndAudioPermission().then(() => {
                console.log('requested!');
            });
        }
    }

    componentDidMount() {
        this.init();
    }

    init = async () => {
        const { getQustionSetById, userData } = this.props
        let token1 = userData?.token

        getQustionSetById(token1, this.state.qustionSetId).then((res) => {
            if (res.status === 200) {
                this.setState({ qustions: res?.data })
            } else {
                showAlertMessage({
                    title: res.message,
                    type: 'danger',
                });
            }
        }).catch((error) => {
            showErrorAlertMessage();
        })
        this._engine = await RtcEngine.create(appId);
        await this._engine.enableVideo();
        await this._engine?.setChannelProfile(ChannelProfile.LiveBroadcasting);
        await this._engine?.setClientRole(
            this.state.isHost ? ClientRole.Broadcaster : ClientRole.Audience
        );

        this._engine.addListener('Warning', (warn) => {
            // console.log('Warning', warn);
        });

        this._engine.addListener('Error', (err) => {
            console.log('Error', err);
        });

        this._engine.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed);
            // Get current peer IDs
            const { peerIds } = this.state;
            // If new user
            if (peerIds.indexOf(uid) === -1) {
                this.setState({
                    // Add peer ID to state array
                    peerIds: [...peerIds, { id: uid, video: true }],
                });
            }
        });

        this._engine.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason);
            const { peerIds } = this.state;
            this.setState({
                // Remove peer ID from state array
                peerIds: peerIds.filter((id) => id.id !== uid),
            });
        });

        // If Local user joins RTC channel
        this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed);
            // Set state variable to true
            this.setState({
                joinSucceed: true,
            });
        });

        this._engine.addListener('RemoteVideoStateChanged', (uid, state, reason, elapsed) => {
            if (state == VideoRemoteState.Stopped) {
                this.state.peerIds.map((item, index) => {
                    if (item.id === uid) {
                        this.state.peerIds[index].video = false,
                            this.setState({})
                    }
                })
            }
            if (state == VideoRemoteState.Starting) {
                this.state.peerIds.map((item, index) => {
                    if (item.id === uid) {
                        this.state.peerIds[index].video = true,
                            this.setState({})
                    }
                })
            }
            if (state == VideoRemoteState.Decoding) {
                this.state.peerIds.map((item, index) => {
                    if (item.id === uid) {
                        this.state.peerIds[index].video = true,
                            this.setState({})
                    }
                })
            }
            if (state == VideoRemoteState.Frozen) {
                this.state.peerIds.map((item, index) => {
                    if (item.id === uid) {
                        this.state.peerIds[index].video = true,
                            this.setState({})
                    }
                })
            }
        })


        this.startCall();
    };

    startCall = async () => {
        // Join Channel using null token and channel name
        await this._engine?.joinChannel(token, channelName, null, 0);
    };


    endCall = async () => {
        // await this._engine?.enableLocalVideo(false);
        // this.setState({ isvideo: false })
        const { deleteChannel, userData } = this.props
        let token = userData?.token
        deleteChannel(token, this.state.channelId).then((res) => {
            if (res.status === 200) {
                this.setState({ peerIds: [], joinSucceed: false });
                this.props.navigation.goBack();
            } else {
                showAlertMessage({
                    title: res.message,
                    type: 'danger',
                });
            }
        }).catch((error) => {
            showErrorAlertMessage();
        })
        this.setState({ peerIds: [], joinSucceed: false });
        this.props.navigation.goBack();
    };

    muteMic = async () => {
        await this._engine?.enableLocalAudio(this.state.isAudio);
        this.setState({ isAudio: !this.state.isAudio })
    }
    muteVideo = async () => {
        await this._engine?.enableLocalVideo(!this.state.isvideo);
        this.setState({ isvideo: !this.state.isvideo })
    }

    render() {
        return (
            <View style={styles.max}>
                {!this.state.isvideo && !this.state.isShare && <Header
                    title={'Meeting name'}
                    isBack={true}
                />
                }
                {this.state.isShare ?
                    <>
                        <ShareScreen questions={this.state.qustions} userData={this.props.userData} channelId={this.state.channelId} onScrollEndDrag={() => socket.emit('admin_share', { question: this.state.qustions[0].question[0], channelId: this.state.channelId })} />
                        {/* {this._renderRemoteVideos()} */}
                    </>
                    :
                    <View style={styles.max}>
                        {this.state.isvideo ?
                            <>
                                {this._renderVideos()}
                            </>
                            :
                            <>
                                {this._renderRemoteVideos()}
                            </>
                        }
                    </View>
                }
                {this._renderButton()}
            </View>
        );
    }

    _renderVideos = () => {
        const { joinSucceed } = this.state;
        return joinSucceed ? (
            <View style={styles.fullView}>
                {this.state.isHost ? (
                    this.state.isvideo ?
                        <RtcLocalView.SurfaceView
                            style={styles.max}
                            channelId={channelName}
                            renderMode={VideoRenderMode.Fit}
                        />
                        :
                        <View style={styles.adminBackground} ></View>
                ) : (
                    <></>
                )}
                {/* {this._renderRemoteVideos()} */}
            </View>
        ) : null;
    };

    _renderRemoteVideos = () => {
        const { peerIds } = this.state;
        return (
            <FlatList
                data={peerIds}
                numColumns={2}
                style={styles.remoteContainer}
                contentContainerStyle={styles.remoteContainerContent}
                initialNumToRender={6}
                renderItem={({ item, index }) => {
                    return (
                        <>
                            {index <= 5 ?
                                <>
                                    {item.video ?
                                        <RtcRemoteView.SurfaceView
                                            style={styles.remote1}
                                            uid={item.id}
                                            channelId={channelName}
                                            renderMode={VideoRenderMode.FILL}
                                            zOrderMediaOverlay={true}
                                        />
                                        :
                                        <View style={styles.remote} ></View>
                                    }
                                </>
                                :
                                <></>
                            }
                        </>
                    )
                }}
            />
            // <ScrollView
            //     style={styles.remoteContainer}
            //     contentContainerStyle={styles.remoteContainerContent}
            //     // horizontal={true}
            // >
            //     {peerIds.map((value) => {
            //         return (
            //             <>
            //                 {value.video ?
            //                     <RtcRemoteView.SurfaceView
            //                         style={styles.remote}
            //                         uid={value.id}
            //                         channelId={channelName}
            //                         renderMode={VideoRenderMode.Hidden}
            //                         zOrderMediaOverlay={true}
            //                     />
            //                     :
            //                     <View style={[styles.remote, { backgroundColor: "black" }]} ></View>
            //                 }
            //             </>
            //         );
            //     })}
            // </ScrollView>
        );
    };

    adminShare = async () => {
        if (this.state.isShare) {
            socket.emit('stop_share', { channelId: this.state.channelId });
            this.setState({ isShare: false })
        } else {
            await this._engine?.enableLocalVideo(false);
            socket.emit('admin_share', { question: [this.state.qustions[0].question[0]], channelId: this.state.channelId });
            this.setState({ isShare: true, isvideo: false })
        }
    }

    _renderButton = () => {
        return (
            <View style={styles.bottomButton} >
                <TouchableOpacity style={styles.lastButton} onPress={() => this.adminShare()} >
                    <Icon name='share-outline' size={20} color={'white'} style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.middleButton} onPress={() => this.muteMic()} >
                    <Icon name={this.state.isAudio ? 'mic-outline' : 'mic-off-outline'} size={20} color={'white'} style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.centerButton} onPress={() => this.endCall()} >
                    <Icon name='call-outline' size={25} color={'white'} style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.middleButton} onPress={() => this.muteVideo()} >
                    <IconF name={this.state.isvideo ? 'video' : 'video-off'} size={17} color={'white'} style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.lastButton1} >
                    <Icon name='people-outline' size={20} color={'white'} style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = ({ auth: { userData } }) => ({
    userData,
});
export default connect(mapStateToProps, actions)(VideoStreaming);