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
        alignSelf: 'center'
    },
    textStyle: {
        fontFamily: Fonts.bold,
        fontSize: 12
    },
    qustionStyle: {
        fontFamily: Fonts.bold,
        fontSize: 14
    },
    optionStyles: {
        width: wp(84),
        height: hp(5),
        borderWidth: 1,
        marginTop: hp(2),
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 9
    },
    optionText: {
        fontFamily: Fonts.bold,
        fontSize: 14
    }

})

export default styles;