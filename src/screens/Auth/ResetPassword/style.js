import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from "../../../helper/colors/Colors";
import { Fonts } from "../../../helper/fonts/Fonts";


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: Colors.AppColor,
        paddingHorizontal: 20
    },
    logo: {
        height: hp(9.36),
        width: hp(9.36),
        borderRadius: 5,
        backgroundColor: Colors.themeColor,
        alignSelf: 'center',
        marginTop: hp(10)
    },
    boxStyle: {
        height: hp(50),
        width: wp(87),
        borderRadius: 30,
        alignSelf: 'center',
        backgroundColor: Colors.boxColor,
        alignItems: 'center',
        paddingTop: hp(2),
        marginTop: hp(3)
    },
    signInText: {
        fontSize: 24,
        alignSelf: 'center',
        color: Colors.blackColor,
        marginTop: hp(5),
        fontFamily: Fonts.medium
    },
    TextStyle: {
        fontSize: 14,
        alignSelf: 'center',
        color: Colors.textColor1,
        marginTop: hp(1.50),
        fontFamily: Fonts.regular,
        textAlign: 'center'
    },
})

export default styles;