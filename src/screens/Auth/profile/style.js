import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from "../../../helper/colors/Colors";
import { Fonts } from "../../../helper/fonts/Fonts";


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: Colors.AppColor,
        // paddingHorizontal: 20
    },
    logo: {
        height: hp(9.36),
        width: hp(9.36),
        borderRadius: 5,
        backgroundColor: Colors.themeColor,
        alignSelf: 'center',
        marginTop: hp(10.5)
    },
    boxStyle: {
        // height: hp(100),
        // flex: 1,
        width: wp(100),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignSelf: 'center',
        backgroundColor: Colors.boxColor,
        alignItems: 'center',
        paddingTop: hp(5),
        marginTop: hp(2),
        paddingBottom: hp(12)
    },
    signInText: {
        fontSize: 24,
        alignSelf: 'center',
        color: Colors.blackColor,
        marginTop: hp(5.5),
        fontFamily: Fonts.medium
    },
    TextStyle: {
        fontSize: 14,
        alignSelf: 'center',
        color: Colors.textColor1,
        marginTop: hp(1.50),
        fontFamily: Fonts.regular,
    },
    signupText: {
        color: Colors.textColor1,
        fontSize: 12,
        fontFamily: Fonts.regular,
        alignSelf: 'center',
        marginVertical: hp(2)
    },
    imageButton: {
        height: hp(12.56),
        width: hp(12.56),
        borderRadius: 5,
        borderColor: Colors.AppColor,
        borderWidth: 1,
    },
    titleStyle: {
        fontSize: 12,
        color: Colors.textColor1,
        fontFamily: Fonts.regular
    },
    radioText: {
        fontSize: 12,
        color: Colors.textColor2,
        fontFamily: Fonts.regular,
        paddingLeft: 9,
        alignSelf: 'center',
        marginTop: hp(1.5)

    },
    radioOutside: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        borderColor: Colors.themeColor,
        marginTop: hp(1.5)
    },

    radioInside: { height: 15, width: 15, borderRadius: 7.5, backgroundColor: Colors.themeColor, alignSelf: 'center' }

})

export default styles;