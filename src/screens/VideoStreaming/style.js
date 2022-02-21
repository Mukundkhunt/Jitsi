import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { Colors } from '../../helper/colors/Colors';
import { Fonts } from '../../helper/fonts/Fonts';

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

export default StyleSheet.create({
    max: {
        flex: 1,
        // alignItems: 'center'
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
        flex: 1,
        width: dimensions.width,
        height: dimensions.height,
    },
    remoteContainer: {
        width: '100%',
    },
    remoteContainerContent: {
        paddingHorizontal: 2.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    remote: {
        width: widthPercentageToDP(41.6),
        height: heightPercentageToDP(23.02),
        backgroundColor: Colors.blackColor,
        margin: 5
    },
    remote1: {
        width: widthPercentageToDP(41.6),
        height: heightPercentageToDP(23.02),
        margin: 5
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
        bottom: 20,
        width: '100%',
        justifyContent: 'space-between'
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
        marginRight: 39,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    middleButton: {
        height: 32,
        width: 32,
        backgroundColor: 'black',
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    centerButton: {
        height: 42,
        width: 42,
        backgroundColor: 'red',
        borderRadius: 21,
        justifyContent: 'center'
    },
    adminBackground: {
        backgroundColor: Colors.AppColor,
        flex: 1,
    },
    textUser: {
        fontFamily: Fonts.bold,
        fontSize: 16,
        alignSelf: 'center'
    }
});