import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Colors } from '../../helper/colors/Colors';

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

export default StyleSheet.create({
    max: {
        flex: 1,
    },
    buttonHolder: {
        height: 100,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#0093E9',
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
    },
    fullView: {
        width: dimensions.width,
        height: dimensions.height,
    },
    remoteContainer: {
        // width: '100%',
        // height: heightPercentageToDP(15),
        position: 'absolute',
        bottom: heightPercentageToDP(2),
    },
    remoteContainerContent: {
        paddingHorizontal: 2.5,
    },
    remote: {
        width: 60,
        height: 75,
        marginHorizontal: 2.5,
        backgroundColor: Colors.blackColor
    },
    remote1: {
        width: 60,
        height: 75,
        marginHorizontal: 2.5,
    },
    noUserText: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#0093E9',
    },
    roleText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 18,
    },
    bottomButton: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lastButton: {
        height: 32,
        width: 32,
        backgroundColor: 'black',
        borderRadius: 8,
        marginLeft: 39,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    lastButton1: {
        height: 32,
        width: 32,
        backgroundColor: 'black',
        borderRadius: 8,
        marginRight: 9,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    middleButton: {
        height: 32,
        width: 32,
        backgroundColor: 'black',
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: 9
    },
    centerButton: {
        height: 42,
        width: 42,
        backgroundColor: 'red',
        borderRadius: 21,
        justifyContent: 'center'
    },
    imageStyle: {
        height: heightPercentageToDP(73.03),
        width: '100%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40
    },
    adminBackground: {
        backgroundColor: Colors.AppColor,
        flex: 1,
    },
});