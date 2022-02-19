import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from "../../helper/colors/Colors";
import { Fonts } from "../../helper/fonts/Fonts";


const styles = StyleSheet.create({
    textInput: {
        fontFamily: Fonts.regular,
        flex: 1
    },
    titleStyle: {
        fontSize: 12,
        color: Colors.textColor1,
        fontFamily: Fonts.regular
    },
    rowText: {
        flexDirection: 'row',
        width: wp(86.67),
        backgroundColor: Colors.AppColor,
        height: hp(6),
        paddingHorizontal: 9,
        borderRadius: 5,
        marginTop: hp(1),

    },
    iconStyle: {
        alignSelf: 'center',
        color: Colors.themeColor
    }

})

export default styles;