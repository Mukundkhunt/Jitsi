import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from "../../helper/colors/Colors";
import { Fonts } from "../../helper/fonts/Fonts";


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: Colors.AppColor,
        // paddingHorizontal: 20
    },
    boxStyles: {
        width: wp(90),
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: hp(3),
        alignSelf: 'center',
        borderColor: Colors.boxColor
    },
    textStyle: {
        fontFamily: Fonts.regular,
        fontSize: 12,
        color: Colors.textColor1,
    },
    qustionStyle: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: Colors.blackColor,
        marginTop: hp(1)
    },
    optionStyles: {
        width: wp(84),
        height: hp(5),
        backgroundColor: Colors.boxColor,
        borderRadius: 5,
        paddingHorizontal: 9,
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: Colors.blackColor,
        alignSelf: 'center'
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        borderColor: Colors.boxColor,
        alignSelf: 'center',
        backgroundColor: Colors.AppColor,
        marginRight: hp(1)
    },
    imageStyle: {
        width: wp(77.1),
        height: hp(18.72),
        alignSelf: 'center',
        marginTop: hp(2),
        borderRadius: 5
    },
    mcqBotton: { flexDirection: 'row', alignSelf: 'center', position: 'absolute', bottom: 95 },
    mcqBotton1: { height: 48, width: 70, backgroundColor: Colors.boxColor, margin: 5, alignItems: 'center', justifyContent: 'center' },
    mcqText: {
        fontFamily: Fonts.regular,
        fontSize: 12,
        color: Colors.textColor2,
        alignSelf: 'center'
    },
    foucsButton: {
        height: hp(6),
        width: wp(86.67),
        backgroundColor: Colors.boxColor,
        position: 'absolute',
        bottom: 95,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    foucsText: {
        fontFamily: Fonts.regular,
        fontSize: 12,
        color: Colors.textColor2,
        alignSelf: 'center'
    }


})

export default styles;